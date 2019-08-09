const http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var cal = require('./cal');

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
          var y = cal.y;
          var m = cal.m;
          var d = cal.d;

          console.log(y,m,d);
          var editmain = post.editmain;
          fs.writeFile('diray/${y}/${m}/${d}.txt', editmain, 'utf8',function(err){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
      response.writeHead(200);
      response.end('success');
      return;
    } 
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + pathname));
});
app.listen(3000);

// var app = http.createServer(function(request, response) {
//    var _url = request.url;
//    var pathname = url.parse(_url, true).pathname;
//     if(pathname ==='/'){
//         _url = '/home.html';
//         console.log(url);
//         response.writeHead(200);
//         response.end(fs.readFileSync(__dirname + pathname));
//     }
//     else if (pathname === '/edit'){
//         _url = '/writediray.html';
//         console.log(_url);
//         response.writeHead(200);
//         response.end(fs.readFileSync(__dirname + _url));
//     }
//     else if (pathname === '/favicon.ico'){
//       return response.writeHead(404);
//     }
//     else if(pathname === '/save_diray'){
//       console.log(_url);
//       var body = '';
//       request.on('data', function(data){
//         body = body + data;
//         console.log(body);
//       });
//       request.on('end', function(){
//         var post = qs.parse(body);
//       });
//       response.writeHead(200);
//       response.end();
//     }
//    response.writeHead(200);
//    response.end(fs.readFileSync(__dirname + _url));
// });
// app.listen(3000);

// function savediary(y,m,d){
//   fs.writeFileSync('/diray', document.getElementById('edit').innerHTML);
// }
