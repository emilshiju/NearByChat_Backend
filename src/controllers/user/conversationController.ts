import { NextFunction, Request, Response } from "express";


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



export class conversationController{
    private interactor:IConversationInteractor;
   

    constructor(interactor: IConversationInteractor) {
        this.interactor = interactor;
      }


    async  chatRoom(req:Request,res:Response,next:NextFunction){


        try{
        
            const {receiverId,userId}=req.body
          
           
            const inputs=new Conversation([receiverId,userId])
           
            const response:any=await this.interactor.IConversation(inputs)
           
            if(response&&response.allChat){
                
                    return res.json({chat:response.allChat,profile:response.profile,chatroom:response.chatroom})
         
            }else{
            if(response)
                    return res.json({profile:response})
       
            }

        



        }catch(error){

            next(error)
        }
    }


    async onCreateChatRoom(req:Request,res:Response,next:NextFunction){
       

        try{

        const {receiverId,userId}=req.body
          
           
            const input=new Conversation([receiverId,userId])

            const response=await this.interactor.ICreateChatRoom(input)

            return res.json({response})

        }catch(error){
            next(error)
        }

    }

    async getAllConversastion(req:Request,res:Response,next:NextFunction){



        try{
        
        const userId=req.query.userId as string; 
       

        const response=await this.interactor.IGetAllConversation(userId)


        return res.json({allChat:response})

        }catch(error){
            next(error)
        }
        


    }


    async onSaveChatImage(req:Request,res:Response,next:NextFunction){
       

        try{

        if(req.file){
           

        const result = await cloudinary.uploader.upload(req.file.path , {
            folder:'/nearbychat'
            });
      

        if(result){
            return res.json({status:true,result})
           }
           return res.json({status:false})

        }

    }catch(error){
        next(error)
    }


    }


    async onClearChat(req:Request,res:Response,next:NextFunction){
       

        try{

        const {selectedUserId,userId}=req.body
        
        const response=await this.interactor.IDeleteChat(selectedUserId,userId)

        }catch(error){
            next(error)
        }

        
    }


    

     async onDeleteSingleChat(req:Request,res:Response,next:NextFunction){

          
        try{

        const {chatRoomId,userId} = req.body
       

        const response=await this.interactor.IDeleteSingleChat(chatRoomId,userId)
          
        if(response){
          return res.json({status:true})

        }

    }catch(error){
        next(error)
    }
       

     }
     


     async OnuserTouserBlock(req:Request,res:Response,next:NextFunction){
    


        try{
        const {chatRoomId,userId}=req.body
    

        const response=await this.interactor.IuserTouserBlock(chatRoomId,userId)
         

        return res.json({data:response})
        }catch(error){
            next(error)
        }
        
     }



     async OnuserTouserUnblock(req:Request,res:Response,next:NextFunction){
     
        try{

        const {chatRoomId,userId}=req.body
        

        const response=await this.interactor.IuserTouserUnblock(chatRoomId,userId)

        return res.json({data:response})

        }catch(error){
            next(error)
        }
     }





}