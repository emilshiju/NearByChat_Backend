

import {Schema,model, Types} from "mongoose";

const notificationSchema=new Schema(
    {
        senderId:{
            type:Types.ObjectId,
            required:true,
            ref:"users",
        },
        receiverId:{
            type:Types.ObjectId,
            required:true,
            ref:"users",
        },
        type:{
            type:String,
            required:true
        },
        status:{
            type:String,
            default:"pending"
        },
        message:{
            type:String,
            required:true
        },
        isRead:{
            type:Boolean,
            default:false
        },
        createdAt:{
            type:Date,
            default:new Date()
        }
    }
)

const notificationModel=model('notification',notificationSchema)


export default notificationModel