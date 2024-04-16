const Users= require('../models/userModel');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const Payments = require('../models/paymentModel');
const mongoose=require('mongoose');

const userCtr={
register :async (req,res)=>{
    try {
        const {name,email,password} =req.body;
        const user= await Users.findOne({email});
        if(user) return res.status(400).json({msg:"The email already exist"})

        if(password.length <6)
          return res.status(400).json({msg:"The password must be 6 charachters or more"})

         const hashedpassword= await bcrypt.hash(password,10);
         const newUser = new Users({
             name,email,password:hashedpassword
         });
        //  mongoose.connection.close();
        try {
            await newUser.save();
        } catch (error) {
            res.status(400).send({msg:error.message});
            
        }
        const accessToken=createAccessToken({id:newUser._id,email:newUser.email,role:newUser.role});
        const refreshToken= createRefreshtoken({id:newUser._id});
        
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:'/user/refresh_token'
        });

        res.json({accessToken});
        //  res.send("Register Succeed");


    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
   
},
login:async (req,res)=>{
    try {
        const {email,password} =req.body;
        const user= await Users.findOne({email});
        if(!user) return res.status(400).json({msg:"Email or password is wrong."});
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({msg:"Email or password is wrong.."});
     
        const accessToken=createAccessToken({id:user._id});
        const refreshToken= createRefreshtoken({id:user._id});
        
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:'/user/refresh_token',
            maxAge:7*24*60*60*1000
        });
        res.json({accessToken});

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
,
logout: async (req,res)=>{

    try {
        res.clearCookie('refreshToken',{path:'/user/refresh_token'});
        return res.json({msg:"logged out"})
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }

}
,
refreshToken:(req,res)=>{
    try {
        
        const rf_token = req.cookies.refreshToken;
    if(!rf_token) return res.status(400).json({msg:"Please Login Or Register!"});

    jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) res.status(400).json({msg:"Please Login Or Register!"});
        const accesstoken= createAccessToken({id:user.id});
        res.json({user,accesstoken})
    })


        } catch (error) {
            return res.status(500).json({msg:error.message})
        }


res.json({rf_token});
},
getUser: async(req,res)=>{
    try {
        const user=await Users.findById(req.user.id).select('-password');
        if(!user) return res.status(400).json({msg:"Userdoes not exist."});

        res.json(user);

    } catch (error) {
        return res.status(500).json({msh:error.message})
    }
},
addToCart: async(req,res)=>{
    try {
        const user = await Users.findById(req.user.id);
        if(!user) return res.status(400).json({msh:"User dose not exist"});

        await Users.findOneAndUpdate({_id:req.user.id},{
            cart: req.body.cart
        });
        return res.json({msg:"Added to cart"})
        
    } catch (err) {
        return res.status(500).json({msh:error.message})
    }
},
history:async(req,res)=>{
    try {
        const history = await Payments.find({user_id:req.user.id});
        res.json({msg:'success',history})
    } catch (err) {
        return res.status(500).json({msh:err.message})
    }
}


}

const createAccessToken=(user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'11m'})
}

const createRefreshtoken=(user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})

}

module.exports=userCtr
