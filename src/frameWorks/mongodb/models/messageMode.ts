import { Schema, model } from "mongoose";

const messageSchema=new Schema(
    {

        
          sender: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true  
          },
          receiver:{
            type:Schema.Types.ObjectId,
            ref:'users'
          },
          chatroom: {
            type: Schema.Types.ObjectId,
            ref: 'chatRoom'
          },
          message:{
            type:String
          },
          isRead:{
              type:Boolean,
              default:false
          },
          timeStamp: {
            type: Number,
          }
    }
    
)

const messageModel=model("message",messageSchema)

export default messageModel

