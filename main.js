const http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');

//mysql 실행 구문
//터미널에서 cd /usr/local/mysql/bin
//그후 ./mysql -uroot -p 
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'qwer1234',
  database : 'mytoday'
});
db.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;

    if(pathname == '/'){
      pathname = '/home.html';
      
    }
    if(pathname == '/favicon.ico'){
      response.writeHead(404);
      response.end('404 not found');
    }
    else if(pathname == '/save_diray'){
      var body = '';

      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          // post 받아온 날자들을 변수에 저장함 정규표현식을 이용해서 한글문자를 제거함
          var y = post.diarydatey.replace(/[^0-9]/g,"");
          var m = post.diarydatem.replace(/[^0-9]/g,"");
          var d = post.diarydated.replace(/[^0-9]/g,"");
          var date = y +'-'+ m+'-'+d;
          var editmain = post.editmain;

          //db에 저장하는 방식
          //인덱스 키가 따로 있으나 날자에 저장하도록 만듬.
          //인서트 구문으로 값이 없을경우 추가, DUPLICATE KEY UPDATE를 이용해서 값이 있을경우 날자를 기준으로 찾아 내용을 업데이트함.
          db.query(`insert into diary (write_date, diary_text) VALUES (?, ?) on DUPLICATE KEY UPDATE write_date=? , diary_text=?`
          ,[date,editmain,date,editmain] ,function(qerr, result){
            if(qerr){
              throw qerr;
            }
            response.writeHead(302);
            response.end();
          });
          /*
          // 로컬에 사용하는 방식
          // 경로에 해당하는 폴더가 없을경우 폴더를 생성하는 코드
          fs.mkdir('diray/'+y+'/' +m,err =>{
              if(err && err.code != 'EEXIST') throw 'up'
          })
          // 해당하는 경로에 일기를 생성하는 코드
          fs.writeFile('diray/'+y+'/' +m+ '/' + d, editmain, 'utf8',function(err){
            response.statusCode = 302;
            // response.setHeader('Location', '/');
            pathname = '/home.html';
            response.end(fs.readFileSync(__dirname + pathname));
          })
          */
      });
      response.statusCode =200;
      pathname = '/home.html';
      response.end(fs.readFileSync(__dirname + pathname));
      return 
    } 
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + pathname));
});
app.listen(3000);


function loadtodo(){
  //todo data 불러오는 쿼리
  db.query('select * from todo', function(tqerr, values){
    if(tqerr){
      throw tqerr;
    }
    console.log(values[0]);
    for(var i = 0; i < values.length; i++){
      console.log(values[i].todo_text);
    }
  });
}