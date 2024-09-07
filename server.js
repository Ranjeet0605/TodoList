const express = require("express");
const app = express();
const auth =  require("./routes/auth");
const list = require("./routes/list");
const cors = require("cors")
const path = require("path");
require("./Database/database");

app.use(cors());
app.use(express.json());
app.use("/api/v1",auth)
app.use("/api/v2",list)

app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"frontend","build")));
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
})

app.listen(4000,()=>{
    console.log("server is running port :",4000);
})
