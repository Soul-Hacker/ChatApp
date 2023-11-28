const jwt=require('jsonwebtoken')
const User=require('../models/Users')
const asyncHandler=require("express-async-handler")
const secret="OmSriVigneshwarayeNamah"
  const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer"))
    {
        try{
            token=req.headers.authorization.split(" ")[1];
            const decode=jwt.verify(token,secret)
            req.user = await User.findById(decode.id).select({ password: 0 });

            // req.user=await User.findById(decode._id).select(~password);
            next();
        }
        catch(e)
        {
            res.status(401);
            throw new Error("User not authorized, token failed");

        }
    }
    if(!token)
    {
        res.status(401)
            throw new Error("User not authorized, token failed");


    }
  })
  module.exports={protect}