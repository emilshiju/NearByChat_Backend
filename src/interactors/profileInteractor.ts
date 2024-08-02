import { inject, injectable } from "inversify";
import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { Profile } from "../entities/profile";
import { Schema } from "mongoose";




export class ProfileInteractor implements IProfileInteractor{
    private repository:IPofileRepository;
    // constructor(
    //     @inject(INTERFACE_TYPE.ProfileRepository)repository:IPofileRepository
    // ){
    //     this.repository=repository
    // }
    constructor(repository: IPofileRepository) {
        this.repository = repository;
    }

    
    async IcreateProfile(input: Profile): Promise<any> {
        
        let res=await this.repository.RcreateProfile(input)

        return res
    }

    async IgetProfileUrl(input: any): Promise<string> {

      console.log("second")

        let res=await this.repository.RgetProfileUrl(input)
        
         return res
        
        }
        
       async IupdateImageUrl(userId: Schema.Types.ObjectId, imageUrl: string): Promise<any> {
            
        let data=await this.repository.RupdateImageUrl(userId,imageUrl)
        return data
        }
  


     async IgetNotification(userId:string): Promise<any> {
        
        let respone=await this.repository.RgetNotification(userId)
        return respone
      }

            
     async IcheckConnectionStatus(userId:Schema.Types.ObjectId,receiverId:Schema.Types.ObjectId):Promise<boolean>{

        let response=await this.repository.RcheckConnectionStatus(userId,receiverId)


        return response


     } 

    async IUnconnectUser(delteSenderId:string,deleteReceiverId:string): Promise<any> {

        // const response=await this.repository.RUnConnectUser(delteSenderId,deleteReceiverId)

        // return response
        
    }

    async IStorePushNotification(value: any): Promise<any> {
        
        const response=await this.repository.RStorePushNotification(value)

        return response
    }

    async IUnsubscribeNotification(value: any): Promise<any> {

        
         const response=await this.repository.RUnsubscribeNotification(value)
    }


    async IpaymentSummary(subId: string, userId: string, paymentId: string, orderId: string): Promise<any> {
        

        const respone=await this.repository.RpaymentSummary(subId,userId,paymentId,orderId)

        return respone
    }

    async IincrementSearchCount(userId: string): Promise<any> {
        

        const response=await this.repository.RincrementSearchCount(userId)
    }

    async IdispalyProfileDetails(userId: string): Promise<any> {
        
        const response=await this.repository.RdisplayProfileDetails(userId)


        return response
    }

    async IuploadUserProfileImage(userId: string, imageUrl: string): Promise<any> {
        
        const response=await this.repository.RuploadUserProfileImage(userId,imageUrl)

        return response
    }
    
    async IdeleteProfileImage(userId: string, index: number): Promise<any> {
        
        const response=await this.repository.RdeleteProfileImage(userId,index)

        return response
    }
    

}