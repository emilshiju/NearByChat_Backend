import { inject, injectable } from "inversify";
import { IProfileInteractor } from "../../interfaces/user/profile/IProfileInteractor";
import { IPofileRepository } from "../../interfaces/user/profile/IProfileRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Profile, profileData } from "../../entities/profile";
import { Schema } from "mongoose";
import { paymentSummary } from "../../entities/paymentSummary";
import { fcmSubscription, userDetails, userList } from "../../entities/user";
import { statusUpdate } from "../../entities/notification";




export class ProfileInteractor implements IProfileInteractor{
    private repository:IPofileRepository;
 
    constructor(repository: IPofileRepository) {
        this.repository = repository;
    }

    
    async IcreateProfile(input: Profile): Promise<userList> {
        
        let res=await this.repository.RcreateProfile(input)

        return res
    }

    async IgetProfileUrl(input: string): Promise<profileData|boolean> {

      console.log("second")

        let res=await this.repository.RgetProfileUrl(input)
        
         return res
        
        }
        
       async IupdateImageUrl(userId: Schema.Types.ObjectId, imageUrl: string): Promise<{ imageUrl: string | null }> {
            
        let data=await this.repository.RupdateImageUrl(userId,imageUrl)
        return data
        }
  


     async IgetNotification(userId:string): Promise<any> {
        
        const respone=await this.repository.RgetNotification(userId)
        return respone
      }

            
     async IcheckConnectionStatus(userId:Schema.Types.ObjectId,receiverId:Schema.Types.ObjectId):Promise<statusUpdate|string|null>{

        let response=await this.repository.RcheckConnectionStatus(userId,receiverId)


        return response


     } 

   

    async IStorePushNotification(value: fcmSubscription): Promise<boolean> {
        
        const response=await this.repository.RStorePushNotification(value)

        return response
    }

    async IUnsubscribeNotification(value: fcmSubscription): Promise<boolean> {

        
         const response=await this.repository.RUnsubscribeNotification(value)

         return response
    }


    async IpaymentSummary(subId: string, userId: string, paymentId: string, orderId: string): Promise<paymentSummary> {
        

        const respone=await this.repository.RpaymentSummary(subId,userId,paymentId,orderId)

        return respone
    }

    async IincrementSearchCount(userId: string): Promise<userDetails|null> {
        

        const response=await this.repository.RincrementSearchCount(userId)

        return response
    }

    async IdispalyProfileDetails(userId: string): Promise<userList|null> {
        
        const response=await this.repository.RdisplayProfileDetails(userId)


        return response
    }

    async IuploadUserProfileImage(userId: string, imageUrl: string): Promise<userList|null> {
        
        const response=await this.repository.RuploadUserProfileImage(userId,imageUrl)

        return response
    }
    
    async IdeleteProfileImage(userId: string, index: number): Promise<boolean> {
        
        const response=await this.repository.RdeleteProfileImage(userId,index)

        return response
    }
    

}