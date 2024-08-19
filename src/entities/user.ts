import { ObjectId,Types ,Document} from "mongoose";

export class User{
    constructor(
        public readonly userName:string,
        public readonly dob:string,
        public readonly gender:string,
        public readonly email:string,
        public readonly password:string
    ){}
}



export class findUser{
    constructor(
        public readonly userId:ObjectId,
        // public readonly location:{longitude:number,latitude:number},
        public readonly radius:number
    ){}
}


export class userList {
    constructor(
        public readonly _id: ObjectId,
        public readonly userName: string,
        public readonly dob: Date,
        public readonly gender: string,
        public readonly email: string,
        public readonly password: string,
        public readonly status: boolean,
        public readonly role: string,
        public readonly imageUrl: string,
        public readonly currSearch: number,
        public readonly maxSearch: number,
        public readonly connections: any[] ,
        public readonly bio: string,
        public readonly nickName: string,
        public readonly profession: string,
        public readonly updatedAt: Date,
        public readonly images: string[] ,
    ) {}
}


export interface IUserDetails {
    imageUrl?: string; // Marked optional as it might be missing
    nickName?: string; // Marked optional as it might be missing
  }



  export interface userOtp {
    email: string;
    otp: string;
    _id: ObjectId;
    createdAt: Date;
    __v: number;
  }




 export  interface decoded {
    username: string;
    email: string;
    id:ObjectId;
    iat: number;  
    exp: number;  
  }


  export interface userDetails extends Document{

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

  export interface googleLoginInterface{

    data:userList,
    Accesstoken:string,
    RefreshToken:string
  }



  export interface adminLogin{
    ifAdmin:any,
    AccessToken:string
  }




  export interface fcmSubscription  {
    endpoint: string;
    expirationTime: number | null;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
  