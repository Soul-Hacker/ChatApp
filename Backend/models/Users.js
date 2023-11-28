const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password:{
        type:String,required:true
    },
    picture:{
        type:String,default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },


},{
    timestamps:true
})
UserSchema.pre('save',async function(next){
    if(!this.isModified)
    {
        next()
    }
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
UserSchema.methods.matchPassword=async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
}
async function run(){
    console.log("running point 1")
    await mongoose.connect('mongodb+srv://Hemant:Hemant@chatapp.kl5pnvs.mongodb.net/Connect?retryWrites=true&w=majority');

}
run();

const Users = mongoose.model("Users", UserSchema);
module.exports=Users