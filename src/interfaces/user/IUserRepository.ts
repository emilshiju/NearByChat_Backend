
import { MyObject } from "../../entities/locationDetails";
import { SubscriptionType } from "../../entities/searchSubscription";
import { User ,findUser, userList, userOtp} from "../../entities/user"
import { ObjectId } from "mongoose";

export interface IUserRepository{
    findUser(data:findUser):Promise<MyObject[]>
    create(data:User):Promise<userList>
    RfindEmail(data:string):Promise<boolean>
    RuserLogin(user:string,password:string):Promise<userList|boolean>
    
    
    RgoogleLogin(email:string):Promise<userList|null>
    RuserStatus(userId:string):Promise<boolean>
    RsaveLocation(longitude:number,latitude:number,userId:string):Promise<boolean>
    RsendOtp(email:string,otp:string):Promise<userOtp>
    RverifyOtp(email:string,otp:string):Promise<Boolean>
    RoleBasedAuthentication(id:ObjectId):Promise<userList|null>
    ReditUserDetails(userId:string,userName:string,dob:string,gender:string):Promise<userList|null>
    RgetOrderSummary(userId:string):Promise<SubscriptionType[]|null>
    RchangePassword(userId:string,password:string):Promise<userList|null>
}   