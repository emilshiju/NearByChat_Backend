import { UpdateResult } from "mongodb";
import { CombinedType, Conversation, IChatroom } from "../../../entities/conversation";
import { userList } from "../../../entities/user";




export interface IConversationInteractor{
   IConversation(input:Conversation):Promise<CombinedType|null|userList>
   ICreateChatRoom(input:Conversation):Promise<IChatroom|null>
   IGetAllConversation(userId:string):Promise<any>
   IDeleteChat(selectedUserId:string,userId:string):Promise<null>

   IDeleteSingleChat(chatRoomId:string,userId:string):Promise<UpdateResult>
   IuserTouserBlock(chatRoomId:string,userId:string):Promise<UpdateResult>
   IuserTouserUnblock(chatRoomId:string,userId:string):Promise<UpdateResult>
 
}