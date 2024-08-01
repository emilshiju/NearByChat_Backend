
import { User ,findUser} from "../../entities/user"
import { ObjectId } from "mongoose";

export interface IUserRepository{
    findUser(data:findUser):Promise<any>
    create(data:User):Promise<User>
    RfindEmail(data:string):Promise<boolean>
    RuserLogin(user:string,password:string):Promise<any>
    
    // Rgetusers():Promise<any>
    RgoogleLogin(email:string):Promise<any>
    RuserStatus(userId:string):Promise<boolean>
    RsaveLocation(longitude:any,latitude:any,userId:any):Promise<any>
    RsendOtp(email:string,otp:string):Promise<any>
    RverifyOtp(email:string,otp:string):Promise<any>
    RoleBasedAuthentication(id:ObjectId):Promise<any>
    ReditUserDetails(userId:string,userName:string,dob:string,gender:string):Promise<any>
    RgetOrderSummary(userId:string):Promise<any>
    RchangePassword(userId:string,password:string):Promise<any>
}   