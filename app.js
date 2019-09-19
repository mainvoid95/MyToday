const express = require('express');
const hostname = "http://herne95.synology.me";
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/', (req, res) =>{
    fs.readFile('./html/home.html', (error, data) =>{
        if(error){
            console.log(error);
        }else{
            res.writeHead(200);
            res.end(data);
        }
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));