import { NextFunction, Request, Response } from "express";

import { inject, injectable } from "inversify";


import { INTERFACE_TYPE } from "../../utils/appConst";

import axios from "axios";
import dotenv from "dotenv"



import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


import { IConversationInteractor } from "../../interfaces/user/conversation/IConversationInteractor";
import { Conversation } from "../../entities/conversation";

dotenv.config();


@injectable()


export class conversationController{
    private interactor:IConversationInteractor;
    // constructor(
    //     @inject(INTERFACE_TYPE.ConversationInteractor)  interactor:IConversationInteractor
    // ){
    //     this.interactor=interactor
    // }

    constructor(interactor: IConversationInteractor) {
        this.interactor = interactor;
      }


    async  chatRoom(req:Request,res:Response,next:NextFunction){


        try{
        console.log("chat rommmmmmmmmmmm chat rommmmm chat rommmmmmmmmmmmmmmm chat rom mmmmmmmmmmmmmmmmmmmmmmmmm")
            let {receiverId,userId}=req.body
          
           
            const inputs=new Conversation([receiverId,userId])
           
            const response=await this.interactor.IConversation(inputs)
            console.log("kkkkkk       7777      kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
               console.log(response.chatroom)
            if(response&&response.allChat){
                
                    return res.json({chat:response.allChat,profile:response.profile,chatroom:response.chatroom})
         
            }else{
            if(response)
                    return res.json({profile:response})
       
            }

        



        }catch(error){

            console.log(error)
        }
    }


    async onCreateChatRoom(req:Request,res:Response,next:NextFunction){
       
        let {receiverId,userId}=req.body
          
           
            const input=new Conversation([receiverId,userId])

            const response=await this.interactor.ICreateChatRoom(input)

            return res.json({response})

    }

    async getAllConversastion(req:Request,res:Response,next:NextFunction){

        // const receiverId=req.params.receiverId
        const userId=req.query.userId as string; 
        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeee  232323232323")
        console.log(userId)
   

        const response=await this.interactor.IGetAllConversation(userId)


        return res.json({allChat:response})
        


    }


    async onSaveChatImage(req:Request,res:Response,next:NextFunction){
        console.log("etiiiiiiiiiiiiiiiiiiiiiiiiiiiii poyeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
console.log(req.file)
        if(req.file){
            console.log("keriiiiiiiiiiiiiii")

        const result = await cloudinary.uploader.upload(req.file.path , {
            folder:'/nearbychat'
            });
        console.log(result)

        if(result){
            return res.json({status:true,result})
           }
           return res.json({status:false})

        }



    }


    async onClearChat(req:Request,res:Response,next:NextFunction){
           console.log("kkkk vanuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        const {selectedUserId,userId}=req.body
        console.log("delteddddddddddddddddddddddddddddddddddddddddddddddddddddddd  userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        console.log(selectedUserId)
        const response=await this.interactor.IDeleteChat(selectedUserId,userId)

        
    }


    // async onDeleteAllMessages(req:Request,res:Response,next:NextFunction){


    //     const { messagesId }=req.body
    //     console.log("messsssssssss ")
    //     console.log(messagesId)

    //     const response=await this.interactor.IDeleteAllMessages(messagesId)
  

    //     return res.status(200).json({status:true})
    // }
   

     async onDeleteSingleChat(req:Request,res:Response,next:NextFunction){



        const {chatRoomId,userId} = req.body
        console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        console.log(chatRoomId,userId)

        const response=await this.interactor.IDeleteSingleChat(chatRoomId,userId)
          
        if(response){
          return res.json({status:true})

        }
        console.log("errrrrrrrrrrrrrorrrrrrrrrrrrrrrrrrrr")
     }
     


     async OnuserTouserBlock(req:Request,res:Response,next:NextFunction){
    

        const {chatRoomId,userId}=req.body
    console.log(req.body)
        console.log("user to user block vanuu   chatRoomId userId chatroomid chatroomid userid userid userid" )
        console.log(userId,chatRoomId)

        const response=await this.interactor.IuserTouserBlock(chatRoomId,userId)
         

        return res.json({data:response})
        
     }

     async OnuserTouserUnblock(req:Request,res:Response,next:NextFunction){
     
         console.log("sencd vanu second vanu second vanu")

        const {chatRoomId,userId}=req.body
        

        const response=await this.interactor.IuserTouserUnblock(chatRoomId,userId)

        return res.json({data:response})
     }





}