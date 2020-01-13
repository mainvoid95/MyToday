const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql'); // mysql 모듈
const bcrypt = require('bcrypt'); //암호화 모듈
const saltRounds = 10; //암호화 solt값 설정
const session = require('express-session'); //세션 미들웨어
const sessionFileStore = require('session-file-store')(session);
const https = require('https');
const http = require('http');

const dbdata = fs.readFileSync('./database.json'); //데이터 베이스 관련 저장된 파일
const dbconf = JSON.parse(dbdata); //파일에서 정보 불러옴
const sessionDataJson = fs.readFileSync('./session.json'); //세션 데이터
const sessionSecret = JSON.parse(sessionDataJson); //세션 데이터에는 시크릿키가 들어있음

//const port = process.env.PORT || 443; // http의 포트가 80포트라 80포트로 설정 그래야 접속시에 뒤에 포트번호가 안붙음

const lex = require('greenlock-express').create({
    version: 'draft-11', // 버전2
    configDir: '/etc/letsencrypt', //letsencrypt가 설치된 경로
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    // server: 'https://acme-staging-v02.api.letsencrypt.org/directory', 테스트시에는 이코드를 사용할것 (배포할땐 X) 
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ['mytoday.ml', 'www.mytoday.ml'];
      } else {
        opts.email = 'mainvoid95@gmail.com';
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000,
  });

//웹팩으로 번들화시킨 정적 리엑트파일을 웹페이지 로드시 출력시킴
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//세션 사용
app.use(session({
    secret: sessionSecret.secret,
    resave: false,
    saveUninitialized: true,
    store:new sessionFileStore()
}));

//데이터 베이스와 연결
//서버, 계정정보는 별도 파일에 보관 git에 업로드 되지 않음
const db = mysql.createConnection({
    host: dbconf.host,
    user: dbconf.user,
    password: dbconf.password,
    database: dbconf.database,
});
db.connect();

//세션데이터를 react로 보내기위한 get동작
app.get('/api/getSession', (req, res) => {
    if(req.session.is_logined){
        var jsonstring = JSON.stringify(
            {
                "is_logined":req.session.is_logined,
                "user_number":req.session.user_number,
                "user_id" : req.session.user_id,
                "user_name": req.session.user_name,
                "user_email": req.session.user_email,
            }
        )
    }
    res.send(jsonstring);
});

//회원가입 post동작 
app.post('/api/userRegister', (req, res) =>{
    let input = req.body;
    let sql = 'INSERT INTO user(user_id, user_pass, user_email, user_name) VALUES(?,?,?,?)';
    let id = input.id;
    let email = input.email;
    let name = input.name;
    let pass = input.password;
    //비밀번호는 bcrypt를 이용해서 단방향 암호화해서 db에 저장함
    bcrypt.hash(pass, saltRounds, function(err, hash){
        let pass = hash;
        let params = [id, pass, email, name];
        db.query(sql, params, (err,rows,fields)=>{
            //동일한 아이디로 중복 생성시 에러처리
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    res.send('id_exist');
                }
            }else{
                res.send('register_success');
            }
        })
    });
});

//로그인 api
app.post('/api/login', (req, res) =>{
    let input = req.body;
    let sql = `SELECT * FROM user WHERE user_id = ? `;
    let id = input.id;
    let pass = input.password;
    let params = [id];
    db.query(sql,params,(err, dbresult, fields)=>{
        if(Object.keys(dbresult).length  > 0){
            let dbpass = dbresult[0].user_pass;
            bcrypt.compare(pass, dbpass, function(err, result){
                if(result){
                    //일치시 세션에 정보 저장
                    req.session.is_logined = true;
                    req.session.user_number = dbresult[0].user_number;
                    req.session.user_id = dbresult[0].user_id;
                    req.session.user_name = dbresult[0].user_name;
                    req.session.user_email = dbresult[0].user_email;
                    res.send('login_success');
                }else{
                    res.send('pass_is_not_same');
                }
            }); 
        }else{
            res.send('login_fail');
        }
    });
});

app.get('/api/logout', (req, res)=>{
    req.session.destroy(function(err){
        if (err) {
          console.error(err);
        } else {
          res.redirect('/');
        }
    })
});

//일기 저장하기
app.post('/api/journalSaveProcess', (req, res)=>{
    let text = req.body.text;
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    let user_number = req.body.user_number;
    let sql = `INSERT INTO journal (user_number, journal_content) VALUE(?,?)`;
    let params = [user_number, text];
    if(req.session.user_number === user_number){
        db.query(sql, params, (err, dbresult, fields) => {
            res.send('');
        })
    }
});

//저장된 일기 불러오기
app.get('/api/journalview', (req, res) =>{
    let sql = `SELECT journal_num, journal_create_date, journal_fix_date, journal_content FROM journal WHERE user_number = ? ORDER BY journal_num DESC `;
    let user_number = req.session.user_number;
    let params = [user_number];
    db.query(sql, params, (err, dbresult, fields) => {
        res.send(dbresult);
    });
});

//일기 삭제
app.post('/api/journaldel', (req, res)=>{
    let sql = 'DELETE FROM journal WHERE journal_num = ?';
    let journal_num = req.body.journal_num;
    let params = [journal_num];
    db.query(sql, params, (err, dbresult, fields)=>{
        res.send('');
    })
});

//일기 수정을 위한 기존 일기 데이터 가져오기
app.post('/api/journalcontentget', (req, res) =>{
    let sql = `SELECT journal_content FROM journal WHERE journal_num = ?`;
    let journal_num = req.body.journal_num;
    let params = [journal_num];
    db.query(sql, params, (err, dbresult, fields)=>{
        res.send(dbresult);
    })
});

//일기 수정하기
app.post('/api/journalupdate', (req, res)=>{
    let text = req.body.text;
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    let journal_num = req.body.journal_num;
    let sql = `UPDATE journal SET journal_content = ? WHERE journal_num = ?`;
    let params = [text, journal_num];
    db.query(sql, params, (err, dbresult, fields) => {
        res.send('');
    });
});

//회원 탈퇴
app.post('/api/closeaccount', (req, res)=>{
    let sql = 'DELETE FROM user WHERE user_number = ?';
    let user_number = req.body.user_number;
    let params = [user_number];
    console.log(user_number);
    db.query(sql, params, (err, dbresult, fields)=>{
        res.send('success');
    });
});

// require('greenlock-express').create({
//     version: 'draft-11',
//     configDir: '/etc/letsencrypt/',
//     server: 'https://acme-v02.api.letsencrypt.org/directory',
//     email: 'mainvoid95@gmail.com',
//     agreeTos: true,
//     approvedDomains: ['mytoday.ml', 'www.mytoday.ml'],
//     app,
//     renewWithin: 81 * 24 * 60 * 60 * 1000,
//     renewBy: 80 * 24 * 60 * 60 * 1000,
//   }).listen(80, 443);

//app.listen(port, () => console.log(`Listening on port ${port}`));

https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
http.createServer(lex.middleware(require('redirect-https')())).listen(80);
