const express = require("express");
const app = express()
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path = require("path");
const port = 8080;

app.set("ejs","view engine");
app.set("views",path.join(__dirname,"views"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'data',
    password: "Rishitha@25"
  });
//   let getRandomUser = () => {
//     return [
//       faker.string.uuid(),
//       faker.internet.username(), 
//       faker.internet.email(),
//       faker.internet.password(),
      
//     ];
//   }
//   console.log(getRandomUser());
  let data =[];
//   for(let i = 1;i<=100;i++){
//     data.push(getRandomUser());
//   }
//   let q = "INSERT INTO temp (id,username,email,password) VALUES ?"
//   try{
//     connection.query(q,[data],(err,result)=>{
//         if (err) throw err;
//         console.log(result)
//     })
//   }catch(err){
//     console.log(err)
//   }
//   connection.end();


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
app.get("/",(req,res)=>{
    let q = `SELECT count(*) FROM temp`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("count.ejs",{count});
        })
    }catch(err){
        console.log(err);
    }
    
})
app.get("/users",(req,res)=>{
    let q = "SELECT * FROM temp";
    try{
        connection.query(q,(err,result)=>{
            let data = result;
            if(err) throw err;
            res.render("home.ejs",{data});
        })
    }catch(err){
        console.log(err);
    }
})