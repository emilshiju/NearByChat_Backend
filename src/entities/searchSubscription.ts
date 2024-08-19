import { ObjectId } from "mongoose";


export class searchSubscription{
    constructor(
        public readonly name:string,
        public readonly maxCount:number,
        public readonly price:number,
        public readonly timePeriod:number,
        public readonly description:string,
        public readonly imageUrl:string
    ){}
}

export interface SubscriptionType {
    _id: ObjectId;  // Mongoose's ObjectId type
    userId: ObjectId;  // Mongoose's ObjectId type
    userName: string;
    nickName: string;
    imageUrl: string;
    gender: string;
    subscriptionName: string;
    maxCount: number;
    price: number;
    email: string;
    dob: Date;  // Use Date for ISO string representation
    timePeriod: string;
    searchSubUrl: string;
    description: string;
    paymentStatus: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    createdAt: Date;  // Use Date for ISO string representation
    updatedAt: Date;  // Use Date for ISO string representation
    __v: number;
  }

  