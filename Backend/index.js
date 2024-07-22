const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');
const bodyparser=require('body-parser');


const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Setting up cors for cross port communication

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  }));

//Setting up database connection
const connection=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'Trishala@99',
    database:'testdb'

})

connection.connect((err)=>{
    if(err){
        console.log(`${err} error occured!`);
    }
    console.log('Database connected');
})


//inserting data into signup table in test db database

app.post('/signup', (req,res)=>{

  const {username, password}=req.body;

  const sql='insert into signup (username, password) values (?,?)';

  connection.query(sql, [username, password], (err, results)=>{
   if(err){
    console.log(`Cannot insert into table due to ${err} error`);
    res.status(500).send('Signup unsuccessful');
    return;
      }

      res.status(200).send('Signup successful');
  })

})

//Retrieving datas from login

app.post('/login', (req,res)=>{

const {username, password}=req.body;

const sql='select * from signup where username=? and password=?;';

connection.query(sql, [username, password], (err,results)=>{
    if(err){
  console.log(`error ${err} occurred`);
    }
    if (results.length > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
} );

});

//port
const Port=5000;

app.listen(Port, ()=>{
    console.log(`Server running on ${Port}`);
})
