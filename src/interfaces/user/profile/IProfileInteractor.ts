import { ObjectId } from "mongoose";
import { Profile } from "../../../entities/profile";


export interface IProfileInteractor{

    IcreateProfile(input:Profile):Promise<any>
    IgetProfileUrl(input:any):Promise<any>
    IupdateImageUrl(userId:ObjectId,imageUrl:string):Promise<any>
    IgetNotification(userId:string):Promise<any>
    IcheckConnectionStatus(userId:ObjectId,receiverId:ObjectId):Promise<any>
    IUnconnectUser(delteSenderId:string,deleteReceiverId:string):Promise<any>
    IStorePushNotification(value:any):Promise<any>
    IUnsubscribeNotification(value:any):Promise<any>
    IpaymentSummary(subId:string,userId:string,paymentId:string,orderId:string):Promise<any>
    IincrementSearchCount(userId:string):Promise<any>
    IdispalyProfileDetails(userId:string):Promise<any>
    IuploadUserProfileImage(userId:string,imageUrl:string):Promise<any>
    IdeleteProfileImage(userId:string,index:number):Promise<any>
    
    // IsaveLocation(longitude:any,langitude:any):Promise<any>
    // IconnectionNotification(senderName:string,senderId:ObjectId,receiverId:ObjectId):Promise<any>
}