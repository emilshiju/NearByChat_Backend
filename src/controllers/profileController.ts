import { NextFunction, Request, Response, response } from "express";

import { inject, injectable } from "inversify";


import { INTERFACE_TYPE } from "../utils/appConst";

import axios from "axios";
import dotenv from "dotenv"
import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";
import { ObjectId } from "mongoose";
import Razorpay from "razorpay"

import bcrypt from "bcrypt"

dotenv.config();

@injectable()
export class profileController{
    private interactor:IProfileInteractor;
    constructor(
        @inject(INTERFACE_TYPE.ProfileInteractor) interactor:IProfileInteractor
    ){
        this.interactor=interactor
    }

    async onSubmitProfile(req:Request,res:Response,next:NextFunction){

        try{
            let input=req.body

            console.log(input)
            let response=await this.interactor.IcreateProfile(input)
            if(response){
                return res.json({status:true,data:response}).status(200)
            }
            

        }catch(error){
            console.log(error)
        }
    }

    async  getProfileUrl(req:Request,res:Response,next:NextFunction){
        try{

            console.log("skdjfhshfius")
   
            let input=req.params.userId
            console.log("ininput")
            console.log(input)
           
            let response=await this.interactor.IgetProfileUrl(input)
            console.log("user profile")
            console.log(response)
            console.log("output")
            if(!response){
                return res.json({status:false})
            }
            

            return res.json({status:true,response})

        }catch(error){
            console.log(error)
        }
    }

    

    async updateImageUrl(req:Request,res:Response,next:NextFunction){

        try{

            let {userId,imageUrl}=req.body
            console.log(req.body)

            let response=await this.interactor.IupdateImageUrl(userId,imageUrl)
                console.log("its    reeeeeeeeeeeeeeeeeeeesponseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                console.log(response)
            return res.json({status:true,response})

        }catch(error){
            console.log(error)
        }
    }
    


    async getAllNotification(req:Request,res:Response,next:NextFunction){

        const  userId=req.params.userId

        console.log("vanuuuuu")
      
            //@ts-ignore
        let senderName=req?.user?.username
        try{

            const response=await this.interactor.IgetNotification(userId)
                console.log(response)
                if(response){
                         return res.json({status:true,allNotification:response})
                }

                return res.json({status:false})

        }catch(error){
            
            console.log(error)
        }
        return 
    }

    async checkConnectionStatus(req:Request,res:Response,next:NextFunction){

        try{

            const userId:any=req.query.userId
            const receiverId:any=req.query.id
            console.log("sjfksdjfsdhfishfsdhfjhsdjfhsdjfhdsjfhdskjhfdskjfhkjds")
            console.log(userId,receiverId)

            const response=await this.interactor.IcheckConnectionStatus(userId,receiverId)
            console.log(response)

            return res.json({status:response})



          }catch(error){
            console.log(error)
        }
    }
   

    async onUnconnectUser(req:Request,res:Response,next:NextFunction){

        const {delteSenderId,deleteReceiverId}=req.body

        const response=await this.interactor.IUnconnectUser(delteSenderId,deleteReceiverId)
         console.log("un CNNECTEEDD USER USER USER USER USER USER ")
        console.log(response)
          return res.json({status:response})
    }

    async storePushNotification(req:Request,res:Response,next:NextFunction){

     console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
        let  {subscription}=req.body
        console.log("oni on i oni")
        let value=subscription
        console.log(value)
           
        const response=await this.interactor.IStorePushNotification(value)




    }



    async UnsubscribeNotification(req:Request,res:Response,next:NextFunction){
       console.log("vannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        let  {subscription}=req.body
        console.log(subscription)

        const response=await this.interactor.IUnsubscribeNotification(subscription)

    }


    async onPaymentOrder(req:Request,res:Response,next:NextFunction){
   
          try{

            const  { id ,amount }=req.body
            console.log("amounttttttttttt"+amount)
            
        const razorpayKeyId=process.env.RAZORPAY_KEY_ID
        const razorpaySecret=process.env.RAZORPAY_SECRET
            
        
          var instance = new Razorpay({ key_id: 'rzp_test_FtkJsWcVUfJKnH', key_secret: 'yjWPt0JccwIc7wwmK3Regtgo' })
          

          
        const cur=new Date()

        const options = {
            amount: amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt:id,
        };

        const order = await instance.orders.create(options);


          return res.json(order)

          }catch(error){
            console.log(error)
          }


    }


    async onPaymentSuccesfull(req:Request,res:Response,next:NextFunction){


        const {subId,userId,paymentId,orderId}=req.body


         const response=await this.interactor.IpaymentSummary(subId,userId,paymentId,orderId)

         return res.json({status:true})
             

    }
    

    async onChangeIncrementSearchCount(req:Request,res:Response,next:NextFunction){
              

        const userId=req.body.id

        const response=await this.interactor.IincrementSearchCount(userId)
    }


    async onDisplayUserDetails(req:Request,res:Response,next:NextFunction){

        const userId=req.params.id

        const response=await this.interactor.IdispalyProfileDetails(userId)

        return res.json({data:response})

    }

    async onHashPassword(req:Request,res:Response,next:NextFunction){

        const {currentPassword,hashedPassword}=req.body
        console.log(currentPassword)
        console.log(hashedPassword)
    
       const isCorrect =await bcrypt.compare(currentPassword,hashedPassword)
      
        console.log("affffffffffffffffffffffffffff")
    console.log(isCorrect)
        return res.json({status:isCorrect})


    }


    async uploadUserProfileImage(req:Request,res:Response,next:NextFunction){

        const {userId,imageUrl}=req.body
        console.log("userdddddddddddddddddddddddddddddddddddddddddd")
        console.log(userId)

const response=await this.interactor.IuploadUserProfileImage(userId,imageUrl)

  return res.json({status:true})

    }

    async onDeleteProfileImageUrl(req:Request,res:Response,next:NextFunction){
          
        const {userId,index}=req.body

        const response=await this.interactor.IdeleteProfileImage(userId,index)

        return res.json({status:response})
    }
}