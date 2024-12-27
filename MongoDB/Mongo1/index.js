const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const Msg = require("./models/msg.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true }))

app.use(methodOverride("_method"))

main()
.then(()=>{
    console.log("connection suscceful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}


app.get("/",(req,res)=>{
    res.send("WORKING");
})

app.get("/chats",async(req,res)=>{
    let msg = await Msg.find();
    res.render("index.ejs",{msg});
})

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat = new Msg({
        from : from,
        to : to,
        msgA: msg,
        create_at : new Date(),
    })
   newChat.save()
   .then(()=>{
    console.log("chat saved");
   }).catch()
    res.redirect("/chats")
})

app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Msg.findById(id);
    res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async(req,res)=>{
    let {id } = req.params;
    let {newMsg} = req.body;
    let updatedChat = await Msg.findByIdAndUpdate(id,{msgA: newMsg},{runValidators: true,new: true})
    console.log(updatedChat);
    res.redirect("/chats")
})

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let chat = await Msg.findByIdAndDelete(id);
    console.log(chat);
    res.redirect("/chats")
})

app.listen(port,()=>{
    console.log(`Listing on port ${port}`);
})
