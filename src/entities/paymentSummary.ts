

import { ObjectId,Types ,Document} from "mongoose";



export interface paymentSummary extends Document{


    _id: ObjectId;  // Mongoose's ObjectId type
    userId: ObjectId;  // Mongoose's ObjectId type
    userName: String;
    nickName: String;
    imageUrl: String;
    gender: String;
    subscriptionName: String;
    maxCount: Number;
    price: Number;
    email: String;
    dob: Date;  // Use Date for ISO string representation
    timePeriod: String;
    searchSubUrl: String;
    description: String;
    paymentStatus: String;
    razorpayPaymentId: String;
    razorpayOrderId: String;
    createdAt: Date;  // Use Date for ISO string representation
    updatedAt: Date;  // Use Date for ISO string representation
    __v: number;

}





export interface SubscriptionArray {
    _id: ObjectId;
    userId: ObjectId;
    userName:   String;
    nickName:String;
    imageUrl: String;
    gender: String;
    subscriptionName: String;
    maxCount: Number;
    price: Number;
    email: String;
    dob: Date;
    timePeriod: String;
    searchSubUrl: String;
    description: String;
    paymentStatus: String;
    razorpayPaymentId: String;
    razorpayOrderId: String;
    createdAt: Date;
    updatedAt: Date;
    __v: Number;
  }