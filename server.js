const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbdata = fs.readFileSync('./database.json');
const dbconf = JSON.parse(dbdata);

const multer = require('multer');
const upload = multer({dest: './upload'})




const db = mysql.createConnection({
    host: dbconf.host,
    user: dbconf.user,
    password: dbconf.password,
    database: dbconf.database,
})
db.connect();

app.get('/api/users', (req, res) => {
    db.query(
        'SELECT * FROM user',
        (err,rows,fields) =>{
            res.send(rows);
        }
    )
});

app.post('/api/users', (req, res) =>{
    console.log(req.body);
    let sql = 'INSERT INTO USER(user_id, user_pass, user_email, user_name) VALUES(?,?,?,?)';
    let id = req.body.id;
    let pass = req.body.password;
    let email = req.body.email;
    let name = req.body.name;
    let params = [id, pass, email, name];
    db.query(sql, params, (err,rows,fields)=>{
        res.send(rows);
    })
})

app.get('/api/hello', (req, res) => {
    res.send({message: "hello express"});
});

app.get('/api/users', (req, res) =>{
    res.send(
        [
            {
            'id':'test',
            'password':'testtest',
            'email':'test@test.email',
            'name':'이름'
            },
            {
              'id':'test',
              'password':'testtest',
              'email':'test@test.email',
              'name':'이름'
              },
              {
                'id':'test',
                'password':'testtest',
                'email':'test@test.email',
                'name':'이름'
                },
          ]
    );
});


app.listen(port, () => console.log(`Listening on port ${port}`));

