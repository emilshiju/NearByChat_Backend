

import mongoose,{Schema,model, Types} from "mongoose";

const reportSchema=new Schema(
    {
        reporter:{
            type:Types.ObjectId,
            required:true,
            ref:"users"
        },
        reportedUser:{
            type:Types.ObjectId,
            required:true,
            ref:"users"
        },
        reason:{
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

const reportModel=model('report',reportSchema)

export default reportModel