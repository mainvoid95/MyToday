const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); //암호화 모듈
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbdata = fs.readFileSync('./database.json');
const dbconf = JSON.parse(dbdata);

const multer = require('multer');
const upload = multer({dest: './upload'})



//데이터 베이스와 연결
//서버, 계정정보는 별도 파일에 보관 git에 업로드 되지 않음
const db = mysql.createConnection({
    host: dbconf.host,
    user: dbconf.user,
    password: dbconf.password,
    database: dbconf.database,
})
db.connect();

//url을 get으로 호출시 유저 테이블을 불러오는 쿼리 동작
app.get('/api/users', (req, res) => {
    db.query(
        'SELECT * FROM user',
        (err,rows,fields) =>{
            res.send(rows);
        }
    )
});

///api/users post동작 
app.post('/api/usersRegister', (req, res) =>{
    let sql = 'INSERT INTO USER(user_id, user_pass, user_email, user_name) VALUES(?,?,?,?)';
    let id = req.body.id;
    let email = req.body.email;
    let name = req.body.name;
    bcrypt.hash(req.body.password, 10, function(err, hash){
        var pass = hash;
        let params = [id, pass, email, name];
        db.query(sql, params, (err,rows,fields)=>{
            if(err) throw err;
            res.send(rows);
        })
    });

    

})

app.post('/api/login', (req, res) =>{
    let sql = `SELECT user_pass FROM user WHERE user_id = ? `;
    let id = req.body.id;
    let pass = req.body.id;
    let params = [id];
    db.query(sql,params,(err, result, fields)=>{
        if(err) throw err;
        let dbpass = result[0].user_pass;
        
        bcrypt.compare(pass, dbpass, function(err, result){
            if(result){
                console.log('비밀번호 일치');
            }else{
                console.log('비밀번호 비일치');
            }
        });    

    });
    
    
})

app.post('/api/diray')


app.listen(port, () => console.log(`Listening on port ${port}`));

