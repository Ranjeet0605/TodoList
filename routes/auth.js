const router = require("express").Router()
const Usershcema  = require("../models/user");
const bcrypt = require("bcryptjs")
//sign up
router.post("/register",async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        
        const user = new Usershcema({email,username,password:hashpassword})
         await user.save().then(()=>
            res.status(200).json({message:"signup successfully."})
        )
        
    } catch(error){
  res.status(200).json({message:"user already exists"});
    }

})

// sign in
router.post("/login",async(req,res)=>{
    try{
    const user = await Usershcema.findOne({email:req.body.email});
    if(!user){
      return  res.status(400).json("please Sign Up first");
    }
    const passwordIscorrect = await bcrypt.compareSync(req.body.password,user.password);
    if(!passwordIscorrect){
       return res.status(400).json("Password is not correct");
    }
    
    const {password , ...others} = user._doc;
    res.status(200).json({others:others});
    }
    catch(error){
         res.status(400).json({message:"User does not exits"});
    }
})
module.exports = router;