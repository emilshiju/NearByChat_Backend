
import mongoose from "mongoose";
import { DeleteResult,UpdateResult } from 'mongodb';

import { allConversation, ChatMessage, chatRoomType, CombinedType, Conversation, IChatroom, saveChatRoom } from "../../entities/conversation";
import chatRoomModel from "../../frameWorks/mongodb/models/chatRoomMode";


import { IConversationRepository } from "../../interfaces/user/conversation/IConversationRepository";

import UserModel from "../../frameWorks/mongodb/models/userModel";
import messageModel from "../../frameWorks/mongodb/models/messageMode";
import { userList } from "../../entities/user";





export class conversationRepository implements IConversationRepository{


     async RConversation(input: Conversation): Promise<CombinedType|null|userList> {
        
          const [member1, member2] = input.members;

           try{
            
            const member1ObjectId = new mongoose.Types.ObjectId(member1) 
            
            const member2ObjectId = new mongoose.Types.ObjectId(member2);
          
            console.log(member1ObjectId,member2ObjectId)

            const chatroom= await chatRoomModel.findOne({
              members: {
                $all: [
                  { $elemMatch: { userId: member1ObjectId } },
                  { $elemMatch: { userId: member2ObjectId } }
                ]
              }
            }).exec()  as chatRoomType|null

         if(!chatroom){
          return null
         }
            
              
              let lastime
              let currentStatus
              chatroom?.members.forEach((a)=>{
                const curr=a.userId?.toString()
               
                
                if(curr==member2){
                  lastime=a.clearChat
                  currentStatus=a.status
                   console.log(a.clearChat)
                }
              })
              

              if(chatroom){
                

                 let allChat:ChatMessage[]=[]

                  if(currentStatus==false){
                  
                 allChat = await messageModel.find({
                  chatroom: chatroom._id,
                  timeStamp: { $gt:lastime }
                }) 

                   }

                  if(currentStatus==true){
                                
                     allChat = await messageModel.find({
                      chatroom: chatroom._id,
                      timeStamp: { $lt:lastime }
                    }) 

                  }


              
               
              

                const profile:userList|null=await UserModel.findById(member1)


                if(!profile){
                  return null
                }
            

                return {allChat,profile,chatroom}


              }else{



                const  profile:userList|null=await UserModel.findById(member1)
               
                if(!profile){
                  return null
                }

                return profile

                

              
              }
              

          

           }catch(error){
          
    
              throw error
            
           }

        
       
    }





    
   async RCreateChatRoom(input: Conversation): Promise<IChatroom|null> {


    try{
    const [member1, member2] = input.members;
   
    const chatroom = await chatRoomModel.findOne({
      members: {
        $all: [
            { $elemMatch: { userId: member1 } },
            { $elemMatch: { userId: member2 } }
        ]
    }
    }).exec();
    

    if(!chatroom){

      const createdRoom = await chatRoomModel.create({
        name: 'New Chat Room',
        members: [{ userId: member1 }, { userId: member2 }],
    })

    return createdRoom as unknown as IChatroom  


    }
      return chatroom as unknown as IChatroom

  }catch(error){
    throw error
  }
     
        
    }





     async RsendMessage(chatRoomId:string,userId:string,receiverId:string,textMessage:string):Promise<ChatMessage|null> {

      
    try{

        // findChatRoom and update the status of curret user

        const r = await chatRoomModel.findOneAndUpdate(
          { _id: chatRoomId, 'members.userId': userId },
          { $set: { 'members.$.status': false } },
          { new: true }
        );

      const newMessage = await messageModel.create({
        chatroom:chatRoomId,
        sender:userId,
        receiver:receiverId,
        message:textMessage,
        timeStamp:Date.now()
      })
    

      return newMessage.toObject()
    }catch(error){
      throw error
    }


    }





     async RGetAllConversation( userId: string): Promise<any> {
    

      const chatrooms:allConversation[]|null = await chatRoomModel.find({ members:{$elemMatch :{ userId:userId }} }).populate('members.userId','nickName , imageUrl') .lean()
     
if(!chatrooms){
  return null
}

 chatrooms.map(chatrooms=> chatrooms._id);

const lastAttempt: any[] = await Promise.all(chatrooms.map(async (a: any) => {
  let id = a._id.toString();
  let time
  let status;
  console.log(id);
  console.log(a.members);

  a.members.forEach((c: any) => {
    const uid = c.userId._id;
    const u = uid.toString();

    if (userId == u) {
      time = c.clearChat
      status=c.status
    }
  });

  

  let al

  if(status==false){

  al= await messageModel.find({
    chatroom: id,
    timeStamp: { $gte: time }
  }).sort({ timeStamp: -1, _id: -1 }).limit(1);
  
}else{
  

  al= await messageModel.find({
    chatroom: id,
    timeStamp: { $lte: time }
  }).sort({ timeStamp: -1, _id: -1 }).limit(1);
 



}
 
  const userDetails = a.members.filter((member: any) => {
    const opp = member.userId?._id.toString();
    
    return opp !== userId;
  });


  const all={
        _id:al[0]?._id,
        sender:al[0]?.sender,
        receiver:al[0]?.receiver,
        chatroom:al[0]?.chatroom,
        message:al[0]?.message,
        isRead:al[0]?.isRead,
        timeStamp:al[0]?.timeStamp
       }




  

  const userDetail = {
    _id: userDetails[0].userId._id,
    imageUrl: userDetails[0].userId.imageUrl,
    nickName: userDetails[0].userId.nickName
  };

  return { all:all, userDetails: userDetail };
}));

const allfiltered=lastAttempt.filter(item => item.all._id !== undefined);


allfiltered.sort((a, b) => b.all.timeStamp - a.all.timeStamp );






return allfiltered






      
    }

    



     async RDelteChat(selectedUserId:string,userId:string): Promise<null> {


      try{
          

         const response:saveChatRoom|null=await chatRoomModel.findById(selectedUserId)
        
        if(!response){
          return null
        }
     
      
         if (response) {
          // Update the clearChat field for the specified user
          response.members.forEach(member => {
                
            let id=member.userId.toString()
              if (id == userId) {
                  member.clearChat = Date.now()
              }
          });

          // Save the updated document
          await response.save();
           
           
        
     
    }
    return null

  }catch(error){
    throw error
  }

  }





   async RDeleteAllMessages(messagesId: string[]): Promise<DeleteResult> {
   
    try{
    const result = await messageModel.deleteMany({ _id: { $in: messagesId } });
 
    return result;
    }catch(error){
      throw error
    }
   }



   async RDeleteSingleChat(chatRoomId: string, userId: string): Promise<UpdateResult> {
        

    try{
    const response = await chatRoomModel.updateMany(
      { _id: { $in: chatRoomId }, 'members.userId': userId },
       {
        $set: { 
          // 'members.$.status': true,
          'members.$.clearChat': Date.now()
      }
       },
      { new: true }
  );

    
   

    return response

}catch(error){
  throw error
}

   }
   



   async RuserTouserBlock(chatRoomId: string, userId: string): Promise<UpdateResult> {
     

    try{

    const response = await chatRoomModel.updateMany(
      { _id: { $in: chatRoomId }, 'members.userId': userId },
       {
        $set: { 
          'members.$.status': true,
          'members.$.clearChat': Date.now()
      }
       },
      { new: true }
    )
   

    
    return response

  }catch(error){
    throw error
  }

   }




   async RuserTouserUnblock(chatRoomId: string, userId: string): Promise<UpdateResult> {
     

    try{

    const response = await chatRoomModel.updateMany(
      { _id: { $in: chatRoomId }, 'members.userId': userId },
       {
        $set: { 
          'members.$.status': false,
          // 'members.$.clearChat': Date.now()
      }
       },
      { new: true }
    )

    

    return response

  }catch(error){
    throw error
  }


   }

}