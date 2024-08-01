import {User,findUser} from "../../entities/user"
import { ObjectId } from "mongoose";

export interface IUserInteractor{
    createUser(input:User):Promise<any>
    refreshToken(id:string,username:string,userId:string):Promise<string>
    IfindUser(input:findUser):Promise<any>
    IcheckEmail(input:string):Promise<boolean>
    IuserLogin(email:string,password:string):Promise<any>
    
    // Igetusers():Promise<any>
    IgoogleLogin(email:string):Promise<any>
    IuserStatus(userId:string):Promise<boolean>
    IsaveLocation(longitude:any,latitude:any,userId:any):Promise<any>,
    IsendOtp(email:string,otp:string):Promise<any>
    IverifyOtp(email:string,otp:string):Promise<any>
    IeditUserDetails(userId:string,userName:string,dob:string,gender:string):Promise<any>
    IgetOrderSummary(userId:string):Promise<any>
    IchangePassword(userId:string,password:string):Promise<any>

}