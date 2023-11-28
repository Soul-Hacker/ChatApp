const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');
const ChatModel=mongoose.Schema({
    chatName:{
        type:String,trim:true
    },
    isGroupChat:{
        type:Boolean,default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }],
    LatestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    GroupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
},
{timestamps:true
}
)
const Chat=mongoose.model("Chat",ChatModel)
module.exports=Chat;