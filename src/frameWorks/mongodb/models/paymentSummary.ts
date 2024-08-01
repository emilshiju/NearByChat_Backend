import { date } from "joi";
import mongoose,{Schema,model,Types} from "mongoose";


const paymentSummary=new Schema(

    {
    userId :{type: Schema.Types.ObjectId,
        ref: 'users',
        required: true  },
    userName: { type: String, required: true },
    nickName: { type: String },
    imageUrl: { type: String },
    gender: { type: String },
    subscriptionName: { type: String, required: true },
    maxCount: { type: Number },
    price: { type: Number },
    email:{ type:String},
    dob:{ type:Date},
    timePeriod: { type: String },
    searchSubUrl: { type: String },
    description: { type: String },
    paymentStatus: { type: String, default: 'pending' }, // Default to 'pending' or any appropriate value
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true }, 
    },{ timestamps: true }
)


const paymentSummaryModel=model('paymentSummary',paymentSummary)


export default paymentSummaryModel

