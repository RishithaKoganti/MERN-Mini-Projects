const mongoose = require('mongoose');
const Msg = require("./models/msg.js")

main()
.then(()=>{
    console.log("connection suscceful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}

let Allchat = [
    {
        from: "Priya",
        to: "Moksh",
        msgA: "Send me notes",
        create_at: new Date(),
    },
    {
        from: "Maggie",
        to: "Remo",
        msgA: "Teach me DBS",
        create_at: new Date(),
    },
    {
        from: "Saint",
        to: "Moke",
        msgA: "Let's go got!",
        create_at: new Date(),
    },
    {
        from: "Nik",
        to: "Jiya",
        msgA: "Jiya please send me project details",
        create_at: new Date(),
    },
]
Msg.insertMany(Allchat);