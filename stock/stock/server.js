const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const mysql = require('mysql');

const app = express();
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
    host : conf.host  ,
    user : conf.user, //mysql의 id
    password : conf.password, //mysql의 password
    database : conf.database, //사용할 데이터베이스 
    port : conf.port
});
connection.connect();
 const qs = require('qs');
const http = require('http').createServer(app);
http.listen(8080,function(){
    console.log('8080하고있습니당');
});


// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',express.static(path.join(__dirname,'/build')));
// app.use('/stock',express.static(path.join(__dirname,'/build')));
app.use('*',express.static(path.join(__dirname,'/build')));

app.get('/',function(req,res){
    req.sendFile(path.join(__dirname,'/build/index.html'));
});

// app.get('*',function(req,res){
//     req.sendFile(path.join(__dirname,'/build/index.html'));
// });

app.post('/register',(req,res)=>{
    const name = req.body.name.name;
    const email = req.body.email.email;
    const birth = req.body.birth.birth;
    const tel = req.body.tel.tel;
    const password = req.body.password.password;
    const sql = `INSERT INTO Client (name,email,birth,tel,password) VALUES(`+`'`+name+`'`+`,`+`'`+email+`'`+`,`+`'`
    +birth+`'`+`,`+`'`+tel+`'`+`,`+`'`+password+`'`+`);`;

    connection.query(sql,
        function (err,rows,fields){
           if(err){
               console.log("회원가입 실패");
               return res.send("회원가입 실패, 이미 가입된 이메일이거나 제출 형식에 문제가 있습니다.");
           }
           else{  
            console.log("회원가입 성공");
             return res.json(rows);
            }
        })
})

app.post('/login',(req,res)=>{
    
    const email = req.body.email.email;
    const password = req.body.password.password;
    const sql = `select * from Client where email = `+`'`+email+`'`;

    connection.query(sql,
        function (err,rows,fields){
           if(err){
               console.log("로그인 실패!");
               return res.send(false);
           }
           else if (rows[0].password==password){
               console.log("로그인 성공!")
               return res.send(rows[0].email);
           }
           else{  
                console.log("비밀번호가 틀렸습니다.")
                 return res.send(false);
            }
        })
})


app.post('/stock',(req,res)=>{
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var temp1 =`SELECT * FROM `;
    var temp2 =`LIMIT 20`;
    var sql = temp1.concat('`',body,'`',temp2); 
    console.log(sql); 
    connection.query(sql,
    function (err,rows,fields){
       if(err){
           console.log("종목 검색 실패");
           return res.send( err);
       }
       else{  
        console.log("종목 검색 성공");
        console.log(rows);
         return res.send(rows);
        }
    })
})

app.post('/interest',function(req,res){
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var sql =`SELECT stock FROM Interest where email =`+`'`+ body+`';`;
    console.log(sql); 
    connection.query(sql,
    function (err,rows,fields){
       if(err){
           console.log("관심종목 실패");
           return res.send(err);
       }
       else{  
        console.log("관심종목 성공");
            console.log(rows);
            return res.json(rows);
        }
    })
});


app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '/build/index.html'));
});



// // mariadb 접속하기

// mysql -u kljstock --host stockserver.cc2pdrlk4lu2.us-east-2.rds.amazonaws.com -P3306 -p