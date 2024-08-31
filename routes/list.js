const router = require('express').Router();
const Usershcema = require("../models/user");
const listschema = require("../models/list");
// create list
router.post("/addTask", async(req,res)=>{
    try{
  const {title,body,_id} = req.body;
  const existingUser = await Usershcema.findOne({_id});

  if(existingUser){
     const list = new listschema({title,body,user:existingUser})
     await list.save().then(()=> res.status(200).json({list}))
     existingUser.List.push(list);
     existingUser.save();
  }
}catch(error){
    console.log(error);
}
})


// updated list

router.put("/updateTask/:id",async(req,res)=>{
    try {
        const {title,body} = req.body;
          
           const list  =  await listschema.findByIdAndUpdate(req.params.id,{title,body},{new:true});
           if(!list){
            return res.status(400).json({message:"Task is not update"})
           }

      res.status(200).json({message:"Task Updated","List":list});
       
    } catch (error) {
          console.log(error)
          res.status(500).json({message:"server error"});
    }
})


// delete list


router.delete("/DeleteTask/:id",async(req,res)=>{
    try {
       
        const {id} = req.body;
          const existinguser = await Usershcema.findByIdAndUpdate(id,{$pull:{List:req.params.id}},{new:true});
          if(existinguser){

  await listschema.findByIdAndDelete(req.params.id).then(()=> res.status(200).json({message:"Task Deleted"}));

          }
          else{
            return res.status(404).json({message:"User not found"});
          }
    } catch (error) {
         res.status(500).json({message:"server Error"})

    }
})
//get list

router.get("/getTask/:id", async(req,res)=>{
    try{
    const list = await listschema.find({user:req.params.id}).sort({createdAt:-1});
        if(list.length!==0){
    res.status(200).json({list});}
    else{
        res.status(200).json("NO Task");
    }
}catch(error){
    res.status(500).json(error);
}
})

module.exports = router;