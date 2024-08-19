
import { ObjectId,Document } from "mongoose";


export class Profile{
    constructor(
        public readonly userId:ObjectId,
        public readonly nickName:string,
        public readonly bio:string,
        public readonly profession:string,
        public readonly imageUrl:string
    ){}
}


export interface Notification {
    senderId: ObjectId;
    receiverId: ObjectId;
    type: string;
    status: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }


  export interface profileData {
    nickName: string;      // Optional property
    profession: string | null | undefined;   // Optional property
    bio: string | null | undefined;          // Optional property
    imageUrl: string;      // Optional property
    currSearch: number;    // Change this to number
    maxSearch: number;     // Assuming maxSearch is a number
    profileUrl: string[];  // Optional property
  }



  export interface userProfileConnection extends Document{
    
    status: String;
    userId?: ObjectId 

  }