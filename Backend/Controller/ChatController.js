const asyncHandler=require("express-async-handler")
const Chat=require("../models/chatmodel")
const Users=require("../models/Users")
const AccessChat=asyncHandler(async(req,res)=>{
    //this is the current user who is login
    const{userid}=req.body 
    if(!userid)
    {
        console.log("UserId params is not sent with request")
        return res.sendStatus(400)
    }
    let isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$eleMatch:{$eq:req.user._id}}},
        {users:{$eleMatch:{$eq:userid}}},
        ]
    }).populate("users","-password").populate("LatestMessage")
        isChat=await Users.populate(isChat,{
            path:"LatestMessage.sender",
            select:"name pic email"
        })
        if(isChat.length>0)
        {
            res.send(isChat[0])
        }
        else
        {
            var ChatData={
                chatName:"sender",
                isGroupChat:false,
                users:[req.user._id,userid]
            }
            try
            {
                const createChat=await Chat.create(ChatData)
                const FullChat=await Chat.findOne({_id:createChat._id}).populate("users","-password")
           res.status(200).send(FullChat)
            } 
            catch(erro)
            {
               res.status(400)
               throw new Error(error.message); 
            }
        }

})
const AllChat=asyncHandler(async()=>{

})
const CreateGroupChat=asyncHandler(async()=>{

})
const RenameGroup=asyncHandler(async(req,res)=>{

})
const RemoveFromGroup=asyncHandler(async(req,res)=>{

})
const AddGroup=asyncHandler(async(req,res)=>{

})
module.exports={CreateGroupChat,AccessChat,AllChat,RenameGroup,RemoveFromGroup,AddGroup};