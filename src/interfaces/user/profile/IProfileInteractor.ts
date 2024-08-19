import { ObjectId } from "mongoose";
import { Profile, profileData } from "../../../entities/profile";
import { fcmSubscription, userDetails, userList } from "../../../entities/user";
import { statusUpdate } from "../../../entities/notification";
import { paymentSummary } from "../../../entities/paymentSummary";


export interface IProfileInteractor{

    IcreateProfile(input:Profile):Promise<userList>
    IgetProfileUrl(input:string):Promise<profileData|boolean>
    IupdateImageUrl(userId:ObjectId,imageUrl:string):Promise<{ imageUrl: string | null }>
    IgetNotification(userId:string):Promise<any>
    IcheckConnectionStatus(userId:ObjectId,receiverId:ObjectId):Promise<statusUpdate|string|null>
   
    IStorePushNotification(value:fcmSubscription):Promise<boolean>
    IUnsubscribeNotification(value:fcmSubscription):Promise<boolean>
    IpaymentSummary(subId:string,userId:string,paymentId:string,orderId:string):Promise<paymentSummary>
    IincrementSearchCount(userId:string):Promise<userDetails|null>
    IdispalyProfileDetails(userId:string):Promise<userList|null>
    IuploadUserProfileImage(userId:string,imageUrl:string):Promise<userList|null>
    IdeleteProfileImage(userId:string,index:number):Promise<boolean>
    
  
}