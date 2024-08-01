import { Profile } from "../../../entities/profile";
import { ObjectId } from "mongoose";

export interface IPofileRepository{

    RcreateProfile(input:Profile):Promise<any>
    RgetProfileUrl(input:any):Promise<any>
    RupdateImageUrl(userId:ObjectId,imageUrl:string):Promise<any>
    RgetNotification(userId:string):Promise<any>
    acceptedRequest(senderId:ObjectId,receiverId:ObjectId):Promise<any>
    connectionRequest(userName:string,senderId:string,receiverId:string):Promise<any>
    RcheckConnectionStatus(userId:ObjectId,receiverId:ObjectId):Promise<any>
    RgetProfileDetails(userId:ObjectId):Promise<any>
    RUnConnectUser(delteSenderId:string,deleteReceiverId:string):Promise<any>
    findUserDetails(id:ObjectId):Promise<any>
    RStorePushNotification(value:string):Promise<any>
    RGetRandomProfileDetails(value:string):Promise<any>
    RfindBlockUnblockDetails(chatRoomId:any,userId:any):Promise<any>
    RUnsubscribeNotification(value:any):Promise<any>
    RpaymentSummary(subId:string,userId:string,paymentId:string,orderId:string):Promise<any>
    RincrementSearchCount(userId:string):Promise<any>
    RdisplayProfileDetails(userId:string):Promise<any>
    RuploadUserProfileImage(userId:string,imageUrl:string):Promise<any>
    RdeleteProfileImage(userId:string,index:number):Promise<any>
    // RconnectionNotification(senderName:string,senderId:ObjectId,receiverId:ObjectId):Promise<any>
}