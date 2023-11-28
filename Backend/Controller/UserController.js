const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");
const generateToken = require("../Token");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    return next(new Error("Please enter all the details"));
  }

  const userExist = await Users.findOne({ email });

  if (userExist) {
    res.status(400);
    return next(new Error("User already exists"));
  }

  try {
    const user = await Users.create({ name, email, password, pic });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password:user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("Success user registered")
  } catch (error) {
    res.status(500);
    return next(new Error("Failed to register"));
  }
});

const AuthUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("User login success true")
  } else {
    res.status(401);
    return next(new Error("Invalid email or password"));
  }
});

const AllUsers=asyncHandler(async(req,res)=>{
  const keyword=req.query.search?{
    $or:[
      {name:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}}
    ]
  }:{};

  const users=await Users.find(keyword).find({_id:{$ne:
  req.user._id}})
  res.send(users)


})
module.exports = { registerUser, AuthUser,AllUsers };
