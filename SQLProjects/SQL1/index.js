const express = require("express");
const app = express()
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path = require("path");
const bodyParser = require("body-parser");
const port = 8080;
const methodOverride = require("method-override");
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("ejs","view engine");
app.set("views",path.join(__dirname,"views"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/users/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM temp WHERE id = '${id}'`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err
            let data = result[0];
            res.render("edit.ejs",{data});
        })
    }catch(err){
        console.log(err);
    }
})

app.patch("/users/:id", (req, res) => {
    let {id} = req.params;
    let {password:formpassword,username: newusername} = req.body;
    let q = `SELECT * FROM temp WHERE id = '${id}'`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let data = result[0];
            if(formpassword != data.password){
                res.send("WORNG PASSWORD");
            }else{
                let q2 = `UPDATE temp SET username ='${newusername}' WHERE id = '${id}'`
                connection.query(q2,(err,result)=>{
                    if (err) throw err;
                    res.redirect("/users")


                })
            }
        })
    }catch(err){
        console.log(err);
    }
    });

app.get("/users/:id/delete",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM temp WHERE id = '${id}'`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err
            let data = result[0];
            res.render("deleteform.ejs",{data});
        })
    }catch(err){
        console.log(err);
    }
})

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const { password: formPassword, username: newUsername } = req.body;
  
    // Query the database for user details
    const query = "SELECT * FROM temp WHERE id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error.");
      }
  
      // Check if user exists
      if (results.length === 0) {
        return res.status(404).send("User not found.");
      }
  
      let data = results[0];
  
      // Validate password
      if (formPassword !== data.password) {
        return res.status(401).send("Wrong password.");
      }
  
      // Delete the user
      const deleteQuery = "DELETE FROM temp WHERE username = ? AND id = ?";
      connection.query(deleteQuery, [newUsername, id], (err, deleteResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error deleting user.");
        }
  
        if (deleteResult.affectedRows === 0) {
          return res.status(404).send("User not found for deletion.");
        }
  
        res.status(200).send("User deleted successfully.");
      });
    });
  });