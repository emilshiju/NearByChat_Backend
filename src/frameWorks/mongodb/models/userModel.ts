import mongoose,{Schema,model,Types} from "mongoose";

const userSchema=new Schema(
    {
        userName:{
            type:String,
            required:true,
        },
        dob:{
            type:Date,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            default:true
        },
        role:{
            type:String,
            default:'user'
        },
        nickName:{
            type:String,
        },
        bio:{
            type:String
        },
        profession:{
            type:String
        },imageUrl:{
            type:String,
            default:"https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717497267/nearbychatdemo/okyoyinbjjrenwsx4am3.png"
        },
        connections:[
            {
               userId:{
                    type:Types.ObjectId,
                    ref:"users"
                },
                status:{
                    type:String,
                    default:"pending"
                }
            }
        ],
        currSearch:{
            type:Number,
            default:0
        },
        maxSearch:{
            type:Number,
            default:3
        },
        images: [
            {
              type: String,
            },
          ],
       
        
    },
    {
        timestamps: true 
    }
)

const UserModel=model("users",userSchema)


export default UserModel