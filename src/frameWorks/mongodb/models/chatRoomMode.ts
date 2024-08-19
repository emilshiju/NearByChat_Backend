
import  { Schema, model } from "mongoose";

const chatroomSchema = new Schema({
  name: {
    type: String,
  },
  members: [
    {
    userId:{
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    clearChat:{
      type:Number,
      default: Date.now(),
    },
    status:{
      type:Boolean,
      default:false
    },
  }
  ],
  createdAt: {  
    type: Date,
    default:new Date()
  },
});

const chatRoomModel = model("chatRoom", chatroomSchema);

export default chatRoomModel;
