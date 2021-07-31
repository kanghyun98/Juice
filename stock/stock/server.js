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
    port : conf.port,
    multipleStatements: true
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
    console.log(sql);
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

app.get('/start',(req,res)=>{
    var sql = `select name from stock;`
    console.log(sql); 
    connection.query(sql,
    function (err,rows,fields){
       if(err){
           console.log("자동검색 실패");
           return res.send(err);
       }
       else{  
        console.log("자동검색 성공");
        console.log(rows);
         return res.send(rows);
        }
    })
});
//한달치 주식차트
app.post('/stock_month',(req,res)=>{
    console.log(req.body);
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var temp1 =`SELECT date, abspct , news FROM (select* from `;
    var temp2 =`order by date desc limit 20) as a order by date asc`;
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
});


//일년치 주식차트
app.post('/stock_year',(req,res)=>{
    console.log(req.body);
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var temp1 =`SELECT date,abspct ,news FROM (select* from `;
    var temp2 =`order by date desc limit 300) as a order by date asc`;
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
});
//관심종목
app.post('/interest',function(req,res){
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var sql =`SELECT DISTINCT stock FROM Interest where email =`+`'`+ body+`';`;
    console.log(sql); 
    connection.query(sql,
    function (err,rows,fields){
       if(err){
           console.log("관심종목 실패");
           return res.send(err);
       }
       else{  
        console.log("관심종목 성공");
            return res.send(rows);
        }
    })
});
//관심종목 삭제
app.post('/interest_delete',function(req,res){
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var sql =`Delete from Interest where stock = ` + `'` + body+`';`;
    console.log(sql); 

    connection.query(sql,
    function (err,rows,fields){
       if(err){
           console.log("관심종목 삭제 실패");
           return res.send(err);
       }
       else{  
        console.log("관심종목 삭제 성공");
            console.log(rows);
            return res.send(rows);
        }
    });
    
});

//관심종목 추가
app.post('/interest_add',function(req,res){
    var email = req.body.email;
    var stock = decodeURIComponent(req.body.stock);
    var sql =`Insert into Interest VALUES(` +`'`+email+`',`+`'`+stock+`');`;
    console.log(sql); 
    connection.query(sql,
    function (err,rows,fields){
       if(err){
           console.log("관심종목 추가 실패");
           return res.send(err);
       }
       else{  
        console.log("관심종목 추가 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});

app.post('/portfolio',function(req,res){
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 

    var sql =`SELECT idx,email,name,date,price,count,all_price,choice,memo FROM portfolio where email =`+`'`+ body+`';`;

    console.log(sql); 
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("포트폴리오 실패");
           return res.send(err);
       }
       else{  
            console.log("포트폴리오 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});

//포트폴리오 매도
app.post('/portfolio_sell',function(req,res){
    const name = req.body.name.name;
    const email = req.body.email.email;
    const date = req.body.date.date;
    const price = req.body.price.price;
    const count = req.body.count.count;
    const memo = req.body.memo.memo;

    const sql = `INSERT INTO portfolio (email, name, date, price, count, all_price, choice, memo)
     VALUES(`+`'`+email+`'`+`,`+`'`+name+`'`+`,`+`'`+date+`',`+price+`,`+count*(-1)+`,`+price*count*(-1)+`,'`+"매도"+`'`+`,'`+memo+`');`;
    console.log(sql);
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("포트폴리오 매도 실패");
           return res.send(err);
       }
       else{  
            console.log("포트폴리오 매도 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});

//포트폴리오 매수
app.post('/portfolio_buy',function(req,res){
    const name = req.body.name.name;
    const email = req.body.email.email;
    const date = req.body.date.date;
    const price = req.body.price.price;
    const count = req.body.count.count;
    const memo = req.body.memo.memo;

    const sql = `INSERT INTO portfolio (email, name, date, price, count, all_price, choice, memo)
     VALUES(`+`'`+email+`'`+`,`+`'`+name+`'`+`,`+`'`+date+`',`+price+`,`+count+`,`+price*count+`,'`+"매수"+`'`+`,'`+memo+`');`;
    const sql2 = `insert into portfolio_target(email, name) values ('`+email+`', '`+ name +`');`;
    const sql3 = `delete n1
    from portfolio_target n1, portfolio_target n2 
    where n1.email='`+email+`' and n1.seq > n2.seq and n1.name=n2.name;`;

     connection.query(sql +sql2 +sql3,function (err,rows,fields){
       if(err){
           console.log("포트폴리오 매수 실패");
           return res.send(err);
       }
       else{  
            console.log("포트폴리오 매수 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});

//포트폴리오 삭제
app.post('/portfolio_delete',function(req,res){
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 
    var sql =`Delete from portfolio where idx = ` + `'` + body+`';`;

    console.log(sql);

    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("포트폴리오 삭제 실패");
           return res.send(err);
       }
       else{  
        console.log("포트폴리오 삭제 성공");
            console.log(rows);
            return res.send(rows);
        }
    })

});
//목표가 삭제

app.post('/portfolio_target_delete',function(req,res){
   
    var sql =`Delete from portfolio_target where seq =`+ req.body.seq+`;`;
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("목표가 삭제 실패");
           return res.send(err);
       }
       else{  
        console.log("목표가 삭제 성공");
            console.log(rows);
            return res.send(rows);
        }
    })

});
// 포트폴리오 수정
app.post('/portfolio_modify',function(req,res){
    const name = req.body.name.name;
    const email = req.body.email.email;
    const date = req.body.date.date;
    const price = req.body.price.price;
    const memo = req.body.memo.memo;
    const idx = req.body.idx.idx;
    const choice = req.body.choice.choice;
    const count = req.body.count.count;
    var sql;

    if(choice==="매수"){
        sql = `Update portfolio set date=`+`'`+date+`',price=`+price+`,count=`+count+`,memo=`+`'`+memo+`',all_price = `+`'`+ price*count+`'`+
        `where email=`+`'`+email+`'` +`and name = `+`'`+name+`'`+`and idx=`+idx+`;`;
    }
    else{
        sql = `Update portfolio set date=`+`'`+date+`',price=`+price+`,count=`+count*(-1)+`,memo=`+`'`+memo+`',all_price = `+`'`+ price*count*(-1)+`'`+
        `where email=`+`'`+email+`'` +`and name = `+`'`+name+`'`+`and idx=`+idx+`;`
    }
  
    console.log(sql);
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("포트폴리오 수정 실패");
           return res.send(err);
       }
       else{  
            console.log("포트폴리오 수정 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});

// 포트폴리오 현금 입금
app.post('/portfolio_put',function(req,res){
    const email = req.body.email.email;
    const date = req.body.date.date;
    const price = req.body.price.price;
    const memo = req.body.memo.memo;
    var sql = `insert into portfolio (email,name,date,price,count,choice,memo, all_price) VALUES ('`
    +email+ `','현금','`+date+`',`+price+`,1,'출금','`+memo+`',`+ price+`);`
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("포트폴리오  입금 실패");
           return res.send(err);
       }
       else{  
            console.log("포트폴리오 입금 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});

//포트폴리오 현금 출금
app.post('/portfolio_pull',function(req,res){
    const email = req.body.email.email;
    const date = req.body.date.date;
    const price = req.body.price.price;
    const memo = req.body.memo.memo;
    var sql = `insert into portfolio (email,name,date,price,count,choice,memo, all_price) VALUES ('`
    +email+ `','현금','`+date+`',`+price+`,-1,'출금','`+memo+`',`+ price*-1+`);`
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("포트폴리오  입금 실패");
           return res.send(err);
       }
       else{  
            console.log("포트폴리오 입금 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});


// 포트폴리오 타겟
app.post('/portfolio_target',function(req,res){
    var body = qs.stringify(req.body);
    body = decodeURIComponent(body.slice(0,-1)); 

    var sql =`SELECT * FROM portfolio_target where email =`+`'`+ body+`';`;

    console.log(sql); 
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("타겟가져오기 실패");
           return res.send(err);
       }
       else{  
            console.log("타겟가져오기 성공");
            console.log(rows);
            return res.send(rows);
        }
    })
});


app.post('/portfolio_target_modify',function(req,res){
    const name = req.body.name.name;
    const email = req.body.email.email;
    const target = req.body.target.target;
    const memo = req.body.memo.memo;

    var sql= `update portfolio_target set target = `+target+`, memo_short = '`+memo+`' where email='`+email+`' and name='`+name+`' ;`;

    console.log(sql);
    
    connection.query(sql,function (err,rows,fields){
       if(err){
           console.log("타겟메모 실패");
           return res.send(err);
       }
       else{  
            console.log(" 타겟메모 성공");
            console.log(rows);
            return res.send(rows);
        }
    })


});


app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

// mysql -u kljstock --host stockserver.cc2pdrlk4lu2.us-east-2.rds.amazonaws.com -P3306 -p
