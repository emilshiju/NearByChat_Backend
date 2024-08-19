import { ChatMessage, CombinedType, Conversation, IChatroom } from "../../../entities/conversation";




import { DeleteResult, UpdateResult } from 'mongodb';
import { userList } from "../../../entities/user";


export interface IConversationRepository{
     RConversation(input:Conversation):Promise<CombinedType|null|userList>
     RCreateChatRoom(input:Conversation):Promise<IChatroom|null>
     RsendMessage(chatRoomId:string,userId:string,receiverId:string,textMessage:string):Promise<ChatMessage|null>
     RGetAllConversation(userId:string):Promise<any>
     RDelteChat(selectedUserId:string,userId:string):Promise<null>
     RDeleteAllMessages(messagesId:string[]):Promise<DeleteResult>
     RDeleteSingleChat(chatRoomId:string,userId:string):Promise<UpdateResult>
     RuserTouserBlock(chatRoomId:string,userId:string):Promise<UpdateResult>
     RuserTouserUnblock(chatRoomId:string,userId:string):Promise<UpdateResult>
}