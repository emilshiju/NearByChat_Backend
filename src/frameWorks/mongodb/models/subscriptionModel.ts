import {Schema,model} from "mongoose";


const subscriptionModel=new Schema(
    {
        endpoint: {
            type: String,
            required: true,
            unique: true  // Ensure endpoint is unique
          },
          expirationTime: {
            type: Date,
            default: null  // Set default value if not provided
          },
          keys: {
            p256dh: {
              type: String,
              required: true
            },
            auth: {
              type: String,
              required: true
            }
          }
    }
)

const SubscriptionModel=model('subscriptionModel',subscriptionModel)


export default SubscriptionModel