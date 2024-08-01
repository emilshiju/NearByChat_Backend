

import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Schema } from "mongoose";




import { IConversationInteractor } from "../../interfaces/user/conversation/IConversationInteractor";
import { IConversationRepository } from "../../interfaces/user/conversation/IConversationRepository";
import { Conversation } from "../../entities/conversation";
import { response } from "express";



@injectable()

export class conversationInteractor implements IConversationInteractor{

    private repository:IConversationRepository
    constructor(
        @inject(INTERFACE_TYPE.ConversationRepository) repository:IConversationRepository
    ){
        this.repository=repository
    }
    
    async IConversation(input: Conversation): Promise<any> {

        let response=await this.repository.RConversation(input)
        console.log("here             rsponseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        
        return response
    }

    async ICreateChatRoom(input: Conversation): Promise<any> {

        let response=await this.repository.RCreateChatRoom(input)

        return response
        
    }
  async IGetAllConversation(userId: string): Promise<any> {

    let response=await this.repository.RGetAllConversation(userId)
      
    return response
  }   

   async IDeleteChat(selectedUserId: string,userId:string): Promise<any> {

    

    let response=await this.repository.RDelteChat(selectedUserId,userId)

    return response
      
  }
  
   async IDeleteAllMessages(messagesId: string[]): Promise<any> {

    // const response=await this.repository.RDeleteAllMessages(messagesId)


    // return response
    
  }


  async IDeleteSingleChat(chatRoomId: any, userId: any): Promise<any> {
       
    const  response=await this.repository.RDeleteSingleChat(chatRoomId,userId)

    return response
  }

  async IuserTouserBlock(chatRoomId: any, userId: any): Promise<any> {
      console.log("ivdie ivdie ivide ")

    const respone=await this.repository.RuserTouserBlock(chatRoomId,userId)

    return respone
  }


  async IuserTouserUnblock(chatRoomId: any, userId: any): Promise<any> {
    

    const respone=await this.repository.RuserTouserUnblock(chatRoomId,userId)

    return respone


  }

}