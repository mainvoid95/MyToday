const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mysql = require('mysql'); // mysql 모듈
const bcrypt = require('bcrypt'); //암호화 모듈
const saltRounds = 10; //암호화 solt값 설정
const session = require('express-session'); //세션 미들웨어
const sessionFileStore = require('session-file-store')(session);
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbdata = fs.readFileSync('./database.json'); //데이터 베이스 관련 저장된 파일
const dbconf = JSON.parse(dbdata); //파일에서 정보 불러옴
const sessionDataJson = fs.readFileSync('./session.json'); //세션 데이터
const sessionSecret = JSON.parse(sessionDataJson); //세션 데이터에는 시크릿키가 들어있음


//세션 사용
app.use(session({
    secret: sessionSecret.secret,
    resave: false,
    saveUninitialized: true,
    store:new sessionFileStore()
}))


//데이터 베이스와 연결
//서버, 계정정보는 별도 파일에 보관 git에 업로드 되지 않음
const db = mysql.createConnection({
    host: dbconf.host,
    user: dbconf.user,
    password: dbconf.password,
    database: dbconf.database,
})
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
            }
        )
    }
    res.send(jsonstring);
});

//회원가입 post동작 
app.post('/api/usersRegister', (req, res) =>{
    let input = req.body;
    let sql = 'INSERT INTO user(user_id, user_pass, user_email, user_name) VALUES(?,?,?,?)';
    let id = input.id;
    let email = input.email;
    let name = input.name;
    let pass = input.password;
    //비밀번호는 암호화해서 db에 저장함
    bcrypt.hash(pass, saltRounds, function(err, hash){
        console.log(hash);
        let pass = hash;
        let params = [id, pass, email, name];
        db.query(sql, params, (err,rows,fields)=>{
            //동일한 아이디로 중복 생성시 에러처리
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    console.log('아이디 중복 생성');
                }
            }else{
                res.send(rows);
            }
        })
    });
})

//로그인 api
app.post('/api/login', (req, res) =>{
    let input = req.body;
    let sql = `SELECT * FROM user WHERE user_id = ? `;
    let id = input.id;
    let pass = input.password;
    console.log(id, pass)
    let params = [id];
    db.query(sql,params,(err, dbresult, fields)=>{
        let dbpass = dbresult[0].user_pass;
        bcrypt.compare(pass, dbpass, function(err, result){
            if(result){
                console.log('비밀번호 일치');
                //일치시 세션에 정보 저장
                req.session.is_logined = true;
                req.session.user_number = dbresult[0].user_number;
                req.session.user_id = dbresult[0].user_id;
                req.session.user_name = dbresult[0].user_name;
                res.send('/');
            }else{
                console.log('비밀번호 비일치');
            }
        }); 
        
    });
})

app.get('/api/logout', (req, res)=>{
    req.session.destroy(function(err){
        if (err) {
          console.error(err);
        } else {
          res.redirect('/');
        }
    })
});

app.post('/api/journalSaveProcess', (req, res)=>{
    let text = req.body.text;
    let user_number = req.body.user_number;
    console.log(user_number, text);
    let sql = `INSERT INTO journal (user_number, journal_content) VALUE(?,?)`;
    let params = [user_number, text];
    if(req.session.user_number === user_number){
        db.query(sql, params, (err, dbresult, fields) => {
            console.log(dbresult);
            res.send('');
        })
    }
});

app.get('/api/journallist', (req, res) =>{
    let sql = `SELECT journal_create_date, journal_fix_date, journal_content FROM journal WHERE user_number = ?`;
    
    // if(req.session.user_number === user_number){
        db.query(sql, params, (err, dbresult, fields) => {
            console.log(dbresult);
            res.send(dbresult);
        })
    // }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

