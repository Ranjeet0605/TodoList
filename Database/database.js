const mongoose = require("mongoose");

const connection = async(req,res)=>{
    try{

   await mongoose.connect("mongodb+srv://username:password@cluster0.o50ap.mongodb.net/ToDoList").then(()=>{
        console.log("Database is connected");
    })
}
catch(error){
res.status(403).json("Database is not connected")
}}
connection();
