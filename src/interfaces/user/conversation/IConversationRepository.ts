import { Conversation } from "../../../entities/conversation";







export interface IConversationRepository{
     RConversation(input:Conversation):Promise<any>
     RCreateChatRoom(input:Conversation):Promise<any>
     RsendMessage(chatRoomId:string,userId:string,receiverId:string,textMessage:string):Promise<any>
     RGetAllConversation(userId:string):Promise<any>
     RDelteChat(selectedUserId:string,userId:string):Promise<any>
     RDeleteAllMessages(messagesId:string[]):Promise<any>
     RDeleteSingleChat(chatRoomId:any,userId:any):Promise<any>
     RuserTouserBlock(chatRoomId:any,userId:any):Promise<any>
     RuserTouserUnblock(chatRoomId:any,userId:any):Promise<any>
}