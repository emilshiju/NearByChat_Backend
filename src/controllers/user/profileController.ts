import { NextFunction, Request, Response } from "express";






import dotenv from "dotenv"
import { IProfileInteractor } from "../../interfaces/user/profile/IProfileInteractor";

import Razorpay from "razorpay"

import bcrypt from "bcrypt"
import { fcmSubscription } from "../../entities/user";

dotenv.config();


export class profileController{
    private interactor:IProfileInteractor;
   
    constructor(interactor: IProfileInteractor) {
        this.interactor = interactor;
    }


    async onSubmitProfile(req:Request,res:Response,next:NextFunction){

        try{
            const input=req.body

            
            const response=await this.interactor.IcreateProfile(input)
            if(response){
                return res.json({status:true,data:response}).status(200)
            }
            

        }catch(error){
            next(error)
        }
    }



    async  getProfileUrl(req:Request,res:Response,next:NextFunction){
        try{


        
            const input=req.params.userId
           
           
            const response=await this.interactor.IgetProfileUrl(input)
            
            if(!response){
                return res.json({status:false})
            }
            

            return res.json({status:true,response})

        }catch(error){
           next(error)
        }
    }

    

    async updateImageUrl(req:Request,res:Response,next:NextFunction){

        try{

            const {userId,imageUrl}=req.body
           

            const response=await this.interactor.IupdateImageUrl(userId,imageUrl)
                
            return res.json({status:true,response})

        }catch(error){
            next(error)
        }
    }
    


    async getAllNotification(req:Request,res:Response,next:NextFunction){

        const  userId=req.params.userId

       
        try{

            const response=await this.interactor.IgetNotification(userId)
                
                if(response){
                         return res.json({status:true,allNotification:response})
                }

                return res.json({status:false})

        }catch(error){
            
            next(error)
        }
       
    }

    async checkConnectionStatus(req:Request,res:Response,next:NextFunction){

        try{

            const userId:any=req.query.userId
            const receiverId:any=req.query.id
            

            const response=await this.interactor.IcheckConnectionStatus(userId,receiverId)
           

            return res.json({status:response})



          }catch(error){
            next(error)
        }
    }
   

    
    async storePushNotification(req:Request,res:Response,next:NextFunction){

 

        try{

        const  {subscription}=req.body
        console.log("oni on i oni")
        const value:fcmSubscription=subscription
       
           
        const response=await this.interactor.IStorePushNotification(value)

        }catch(error){
            next(error)
        }



    }



    async UnsubscribeNotification(req:Request,res:Response,next:NextFunction){
      

        try{

        const  {subscription}=req.body
      

        const response=await this.interactor.IUnsubscribeNotification(subscription)

        }catch(error){
            next(error)
        }

    }


    async onPaymentOrder(req:Request,res:Response,next:NextFunction){
   
          try{

            const  { id ,amount }=req.body
           
            
      
            
        
          const instance = new Razorpay({ key_id: 'rzp_test_FtkJsWcVUfJKnH', key_secret: 'yjWPt0JccwIc7wwmK3Regtgo' })
          

          
        

        const options = {
            amount: amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt:id,
        };

        const order = await instance.orders.create(options);


          return res.json(order)

          }catch(error){
            next(error)
          }


    }


    async onPaymentSuccesfull(req:Request,res:Response,next:NextFunction){


        try{

        const {subId,userId,paymentId,orderId}=req.body


         const response=await this.interactor.IpaymentSummary(subId,userId,paymentId,orderId)

         return res.json({status:true})
        }catch(error){
            next(error)
        }
             

    }
    

    async onChangeIncrementSearchCount(req:Request,res:Response,next:NextFunction){
              


        try{

        const userId=req.body.id

        const response=await this.interactor.IincrementSearchCount(userId)

        return res.json({status:true})

        }catch(error){
            next(error)
        }
    }


    async onDisplayUserDetails(req:Request,res:Response,next:NextFunction){


        try{

        const userId=req.params.id

        const response=await this.interactor.IdispalyProfileDetails(userId)

        return res.json({data:response})

        }catch(error){
            next(error)
        }

    }

    async onHashPassword(req:Request,res:Response,next:NextFunction){


        try{

        const {currentPassword,hashedPassword}=req.body
        
    
       const isCorrect =await bcrypt.compare(currentPassword,hashedPassword)
      
        
        return res.json({status:isCorrect})
        }catch(error){
            next(error)
        }


    }


    async uploadUserProfileImage(req:Request,res:Response,next:NextFunction){


        try{

        const {userId,imageUrl}=req.body
        

const response=await this.interactor.IuploadUserProfileImage(userId,imageUrl)

  return res.json({status:true})

        }catch(error){
            next(error)
        }

    }



    async onDeleteProfileImageUrl(req:Request,res:Response,next:NextFunction){
          

        try{

        const {userId,index}=req.body

        const response=await this.interactor.IdeleteProfileImage(userId,index)

        return res.json({status:response})

        }catch(error){
            next(error)
        }
    }
}