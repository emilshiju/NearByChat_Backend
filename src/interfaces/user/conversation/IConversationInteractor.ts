import { Conversation } from "../../../entities/conversation";




export interface IConversationInteractor{
   IConversation(input:Conversation):Promise<any>
   ICreateChatRoom(input:Conversation):Promise<any>
   IGetAllConversation(userId:string):Promise<any>
   IDeleteChat(selectedUserId:string,userId:string):Promise<any>
   // IDeleteAllMessages(messagesId:string[]):Promise<any>
   IDeleteSingleChat(chatRoomId:any,userId:any):Promise<any>
   IuserTouserBlock(chatRoomId:any,userId:any):Promise<any>
   IuserTouserUnblock(chatRoomId:any,userId:any):Promise<any>
 
}