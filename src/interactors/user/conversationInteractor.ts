






import { IConversationInteractor } from "../../interfaces/user/conversation/IConversationInteractor";
import { IConversationRepository } from "../../interfaces/user/conversation/IConversationRepository";
import { CombinedType, Conversation, IChatroom } from "../../entities/conversation";
import { userList } from "../../entities/user";
import { UpdateResult } from "mongodb";





export class conversationInteractor implements IConversationInteractor{

    private repository:IConversationRepository
   
    constructor(repository: IConversationRepository) {
      this.repository = repository;
  }

    
    async IConversation(input: Conversation): Promise<CombinedType|null|userList> {



      try{
        const response=await this.repository.RConversation(input)
        
        return response

      }catch(error){
        throw error
      }
    }


    async ICreateChatRoom(input: Conversation): Promise<IChatroom|null> {


        try{
        const response=await this.repository.RCreateChatRoom(input)

        return response
        }catch(error){
          throw error
        }
        
    }

  async IGetAllConversation(userId: string): Promise<any> {
     
    try{
    const response=await this.repository.RGetAllConversation(userId)
      
    return response
    }catch(error){
      throw error
    }
  }   



   async IDeleteChat(selectedUserId: string,userId:string): Promise<null> {

       try{

    const response=await this.repository.RDelteChat(selectedUserId,userId)

    return response
       }catch(error){
        throw error
       }
      
  }
  
  


  async IDeleteSingleChat(chatRoomId: string, userId: string): Promise<UpdateResult> {
       
    try{
    const  response=await this.repository.RDeleteSingleChat(chatRoomId,userId)

    return response
    }catch(error){
      throw error
    }
  }

  async IuserTouserBlock(chatRoomId: string, userId: string): Promise<UpdateResult> {
    
   try{
    const respone=await this.repository.RuserTouserBlock(chatRoomId,userId)

    return respone
   }catch(error){
    throw error
   }
  }


  async IuserTouserUnblock(chatRoomId:string, userId: string): Promise<UpdateResult> {
    
     try{
    const respone=await this.repository.RuserTouserUnblock(chatRoomId,userId)

    return respone
     }catch(error){
      throw error
     }


  }

}