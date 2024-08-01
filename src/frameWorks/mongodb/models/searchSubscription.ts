
import mongoose,{Schema,model,Types} from "mongoose";



const searchSubscription=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        maxCount:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        timePeriod:{
            type:Number,
            required:true
        },
        description:{
            type:String,    
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        }

    }
)

const searchSubscriptionModel=model('searchSubscription',searchSubscription)

export default searchSubscriptionModel