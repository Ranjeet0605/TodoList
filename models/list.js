const mongoose = require("mongoose");
const listshcema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true
    },
    user:[
        { 
         type: mongoose.Types.ObjectId,
         ref: "user",
       }
     ],
   

},
{timestamps:true}
)

module.exports = mongoose.model("List",listshcema);