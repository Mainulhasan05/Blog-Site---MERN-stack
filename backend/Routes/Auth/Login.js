const router=require("express").Router();
const User=require("../../userSchema")
const Comments=require("../../commentsSchema")
const Post=require("../../postSchema")
const bcrypt=require("bcrypt");
const Admin=require("../../adminSchema")
var jwt = require('jsonwebtoken');

const verifyToken=async(req,res,next)=>{
    try {
        const verified=await jwt.verify(req.body.token,process.env.SECRET)
        if(verified){
            next();
        }    
    } catch (error) {
        res.send("Token not valid")
    }
    
}

router.post("/login",async(req,res)=>{
    
    const findUser=await User.findOne({email:req.body.email});
    if(findUser){
        const matchPass=await bcrypt.compare(req.body.password,findUser.password);
        if(matchPass){
            res.status(200).json(findUser);
        }
        else{
            res.status(500).json({"msg":"Invalid Login"})
        }
        
    }
    else{
        res.status(500).json({"msg":"Invalid Login"})
    }
})

router.post("/register",async(req,res)=>{
    try {
        const duplicate=await User.findOne({email:req.body.email});
    if(!duplicate){
        // const token=jwt.sign({name:"rifat"},process.env.SECRET)
        req.body.password=await bcrypt.hash(req.body.password,10);
        // req.body.token=token
        const newUser=new User(req.body);

        await newUser.save(newUser);
        // const savedUser=await newUser.save();
        res.status(200).json({"msg":"User added successfully"})
    }
    else{
        res.status(500).json({"msg":"Email is already in use"})
    }
    } catch (error) {
        res.status(500).json({"msg":"Email is already in use"})
    }
    
})

router.get("/deleteAccount/:id",async(req,res)=>{
    
    try {
        const user=await User.findByIdAndDelete(req.params.id)
        const post=await Post.deleteMany({author:req.params.id})
        const comments=await Comments.deleteMany({author:req.params.id})
        const users=await User.find({});
        res.status(200).json(users);        
    } catch (error) {
        res.status(500).json({msg:"failed"})
    }

})

router.post("/adminlogin",async(req,res)=>{
    try {
        const findUser=await Admin.findOne({username:req.body.username});
        const matchPass=await bcrypt.compare(req.body.password,findUser.password);
            if(matchPass){
                res.status(200).json(findUser);
            }
            else{
                res.status(500).json({"msg":"Invalid Login"})
            }    
    } catch (error) {
        res.status(500).json({"msg":"Invalid Login"})
    }
    
})
router.post("/createadmin",async(req,res)=>{
    req.body.password=await bcrypt.hash(req.body.password,10);
    const admin=new Admin(req.body);
    await admin.save();
   res.status(200).json(admin)
})

router.get("/getUser",async(req,res)=>{
    const users=await User.find({});
    res.status(200).json(users)
})

router.post("/updateProfile",async(req,res)=>{
    
    try {
        const findUser=await User.findOne({email:req.body.email});
    if(req.body.oldpassword){
        const matchPass=await bcrypt.compare(req.body.oldpassword,findUser.password);
        if(matchPass){
            if(req.body.newpassword){
                req.body.password=await bcrypt.hash(req.body.newpassword,10);
                const obj={
                    first:req.body.first,
                    last:req.body.last,
                    email:req.body.email,
                    password:req.body.password
                }
                const update=await User.findByIdAndUpdate(req.body._id,obj,{new:true})
                res.status(200).json(update);
            }
            else{
                const obj={
                    first:req.body.first,
                    last:req.body.last,
                    email:req.body.email,
                }
                const update=await User.findByIdAndUpdate(req.body._id,obj,{new:true})
                res.status(200).json(update);
            }
        }
        else{
            res.status(500).json({msg:"Wrong pasowrd"});
        }
        
    }
    else{
        
         res.status(500).json({msg:"Provide pasowrd"});
    }
    } catch (error) {
        res.status(500).json({msg:"Error Occured"});
    }
    
})


router.post("/updateProfileadmin",async(req,res)=>{
    try {
        if(req.body.newpassword){
            req.body.password=await bcrypt.hash(req.body.newpassword,10);
                    const obj={
                        first:req.body.first,
                        last:req.body.last,
                        email:req.body.email,
                        password:req.body.password
                    }
                    const update=await User.findByIdAndUpdate(req.body._id,obj)
                    const users=await User.find({});
                    res.status(200).json(users)
        }
        else{
            const update=await User.findByIdAndUpdate(req.body._id,req.body);
            const users=await User.find({});
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).json({msg:"failed"})
    }
    
})
module.exports=router;