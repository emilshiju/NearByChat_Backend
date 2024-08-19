import { Profile, profileData } from "../../../entities/profile";
import { ObjectId } from "mongoose";
import { fcmSubscription, userDetails, userList } from "../../../entities/user";
import { acceptRequest, notificationDisplayDetails, NotificationType, senderNotification, statusUpdate } from "../../../entities/notification";
import { paymentSummary } from "../../../entities/paymentSummary";

export interface IPofileRepository{

    RcreateProfile(input:Profile):Promise<userList>
    RgetProfileUrl(input:string):Promise<profileData|boolean>
    RupdateImageUrl(userId:ObjectId,imageUrl:string):Promise<{ imageUrl: string | null }>
    RgetNotification(userId:string):Promise<any>
    acceptedRequest(senderId:ObjectId,receiverId:ObjectId):Promise<acceptRequest|null>
    connectionRequest(userName:string,senderId:string,receiverId:string):Promise<senderNotification>
    RcheckConnectionStatus(userId:ObjectId,receiverId:ObjectId):Promise<statusUpdate|string|null>
    RgetProfileDetails(userId:ObjectId):Promise<userList|null>
    RUnConnectUser(delteSenderId:string,deleteReceiverId:string):Promise<NotificationType|null>
    findUserDetails(id:ObjectId):Promise<notificationDisplayDetails|null>
    RStorePushNotification(value:fcmSubscription):Promise<boolean>
    RGetRandomProfileDetails(value:string):Promise<userList|null>
    RfindBlockUnblockDetails(chatRoomId:ObjectId,userId:ObjectId):Promise<boolean>
    RUnsubscribeNotification(value:fcmSubscription):Promise<boolean>
    RpaymentSummary(subId:string,userId:string,paymentId:string,orderId:string):Promise<paymentSummary>
    RincrementSearchCount(userId:string):Promise<userDetails|null>
    RdisplayProfileDetails(userId:string):Promise<userList|null>
    RuploadUserProfileImage(userId:string,imageUrl:string):Promise<userList|null>
    RdeleteProfileImage(userId:string,index:number):Promise<boolean>
    
}