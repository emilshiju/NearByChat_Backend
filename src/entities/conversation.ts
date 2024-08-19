
import { ObjectId,Types,Document } from "mongoose";
import { userList } from "./user";
// import { ObjectId } from "mongodb";
// import { mongoose } from "mongoose";

export class Conversation{
    constructor(
        public readonly members: string[]
    ){}
}



export interface IMember {
    userId: ObjectId;
    clearChat: number;
    status: boolean;
  }
  
  // Define the TypeScript interface for the main schema
 export  interface IChatroom {
    
    name: string|null;
    members: IMember[];
    createdAt: Date;
  }


  export interface saveChatRoom extends Document{
    name: string|null;
    members: IMember[];
    createdAt: Date;
  }


 export  interface ChatMessage {
    sender: ObjectId;
    receiver:ObjectId;
    chatroom:ObjectId;
    message: String;
    isRead: Boolean;
    timeStamp: Number;
   
  }


  export interface ChatClearStatus {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    clearChat: number;
    status: boolean;
  }


  export interface message{

    _id: ObjectId;
  sender: ObjectId;
  receiver: ObjectId;
  chatroom: ObjectId;
  message: string;
  isRead: boolean;
  timeStamp: number;
  __v: number;
  }



  export interface chatRoomType{
    _id:ObjectId,
    name: string;
  members: IMember[];
  createdAt?: Date;
  }
  export interface CombinedType {
    allChat: ChatMessage[];
    profile: userList;
    chatroom: chatRoomType;
    
  }



  export interface IUser {
    _id: ObjectId;      // Assuming this is returned as well in populated data
    nickName: String;
    imageUrl: String;
  }
  
  // Define the IMember interface with the populated user data
 export  interface Member {
    clearChat: number;
    status: boolean;
    userId?: ObjectId | null;
  }
  
  export interface allConversation{
    _id:ObjectId,
    name: String|null
  members: Member[];
  createdAt?: Date;
  __v: number;
  }


  interface User {
    _id: ObjectId;
    imageUrl: string;
    nickName: string;
  }
  export interface allConversationDetails{
    
    userId:{_id: ObjectId;
      imageUrl: string;
      nickName: string;};
  clearChat: number; 
  status: boolean;
  _id: ObjectId;
  }


  type chatMessage = {
    _id:Types.ObjectId;
    sender: Types.ObjectId;
    receiver:Types.ObjectId | null | undefined;
    chatroom:Types.ObjectId | null | undefined;
    message: String | null | undefined;
    isRead: Boolean;
    timeStamp: number
  };

export interface chatArray {
    all: chatMessage;
    userDetails: User;
  };