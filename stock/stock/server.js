const express = require('express');
const app = express();
const path = require('path');

const http = require('http').createServer(app);

http.listen(8080,function(){
        console.log('8080하고있습니당');
});

app.use('/',express.static(path.join(__dirname,'/build')));

app.get('/',function(res,req){
    req.sendFile(path.join(__dirname,'/build/index.html'));
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

