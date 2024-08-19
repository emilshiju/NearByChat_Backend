import { MyObject } from "../../entities/locationDetails";
import { SubscriptionType } from "../../entities/searchSubscription";
import {User,findUser, userList, userOtp} from "../../entities/user"


export interface IUserInteractor{
    createUser(input:User):Promise<any>
    refreshToken(id:string,username:string,userId:string):Promise<string>
    IfindUser(input:findUser):Promise<MyObject[]>
    IcheckEmail(input:string):Promise<boolean>
    IuserLogin(email:string,password:string):Promise<any>
    
   
    IgoogleLogin(email:string):Promise<any>
    IuserStatus(userId:string):Promise<boolean>
    IsaveLocation(longitude:number,latitude:number,userId:string):Promise<boolean>,
    IsendOtp(email:string,otp:string):Promise<userOtp>
    IverifyOtp(email:string,otp:string):Promise<Boolean>
    IeditUserDetails(userId:string,userName:string,dob:string,gender:string):Promise<userList|null>
    IgetOrderSummary(userId:string):Promise<SubscriptionType[]|null>
    IchangePassword(userId:string,password:string):Promise<userList|null>

}