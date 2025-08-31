import mongoose, {Document, Schema } from "mongoose";



export interface Message extends Document{
    content:string, // here s is small at interface
    createdAt:Date,
}


const MessageSchema:Schema<Message>=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})



export interface User extends Document{
    name:string,
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
    verifyCode:string,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[],
}



const UserSchema:Schema<User>=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    verifyCode:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})


const UserModel =
mongoose.models.user as mongoose.Model<User>
 || mongoose.model<User>("User",UserSchema);

export default UserModel;