import {Schema,model, Types,Document} from "mongoose";


export interface NotificationType extends Document{
    _id: Types.ObjectId;
    senderId:Types.ObjectId;
    receiverId:Types.ObjectId;
    type: String;
    status: String // Assuming status can only be 'true' or 'false'
    message: String;
    isRead: Boolean;
    createdAt: Date;
}



interface UserList {
    _id: Types.ObjectId;
    userName: string;
    dob: Date;
    gender: string;
    email: string;
    password: string;
    status: boolean;
    role: string;
    imageUrl: string;
    currSearch: number;
    maxSearch: number;
    connections: any[];  // Replace `any[]` with the appropriate type if known
    bio: string;
    nickName: string;
    profession: string;
    updatedAt: Date;
    images: string[];
    __v: number;
  }
  
  export interface senderNotification {
    _id: Types.ObjectId;
    senderId: UserList;
    receiverId: Types.ObjectId;
    type: string;
    status: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    __v: number;
  }


 export  interface statusUpdate {
    userId: Types.ObjectId;
    status: string;  // If status can have specific values like "true" or "false", consider using a union type.
    _id: Types.ObjectId;
  }





  export interface notificationDisplayDetails {
    _id: Types.ObjectId;
    imageUrl: string;
    nickName: string;
  }




  export interface acceptRequest {
    _id: Types.ObjectId;
    senderId:  Types.ObjectId;
    receiverId: UserList;
    type: string;
    status: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    __v: number;
  }
