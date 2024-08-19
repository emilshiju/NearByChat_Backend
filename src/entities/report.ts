import { ObjectId } from "mongoose";

export class report{
    constructor(
        public readonly reporter:string,
        public readonly reportedUser:string,
        public readonly reason:string
    ){}
}




export class UserReport {
    constructor(
      public readonly _id: ObjectId,
      public readonly email: string,
      public readonly nickName: string
    ) {}
  }
  
 
  export interface Report{
    _id: string;
    reporter: string;
    reportedUser:string;
    reason: string;
    isRead: boolean;
    createdAt: Date;
    __v: number;
  }


  export interface IUser {
    nickName: string;
    email: string;
  }
  
  export  interface IReport {
    _id: string;
    reporter: IUser;
    reportedUser: IUser;
    reason: string;
    isRead: boolean;
    createdAt: Date;
    __v: number;
  }

export interface ISortedReport {
  _id: string;
  reporter: IUser;
  reportedUser: IUser;
  reasons: string[];
  marked: boolean;
  createdAt: Date;
  __v: number;
}


export interface allReport {
  _id: ObjectId;
  reporter: {
    _id: ObjectId;
    email: String;
    nickName: String;
  };
  reportedUser: {
    _id: ObjectId;
    email: String;
    nickName: String;
  };
  reason: String[];
  isRead: Boolean;
  createdAt: Date;
  __v: Number;
}




export interface allReport {
  _id: ObjectId;
  reporter: {
    _id: ObjectId;
    email: String;
    nickName: String;
  };
  reportedUser: {
    _id: ObjectId;
    email: String;
    nickName: String;
  };
  reasons: String[];
  isRead: Boolean;
  createdAt: Date;
  __v: Number;
}

export interface sortReport{
  _id: ObjectId;
  reporter: {
    _id: ObjectId;
    email: String;
    nickName: String;
  };
  reportedUser: {
    _id: ObjectId;
    email: String;
    nickName: String;
  };
  reasons: String[];
  marked: Boolean;
  createdAt: Date;
  __v: Number;
}