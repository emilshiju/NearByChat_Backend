
import { injectable } from "inversify";
import mongoose,{Schema,model, Types} from "mongoose";

import { Conversation } from "../../entities/conversation";
import chatRoomModel from "../../frameWorks/mongodb/models/chatRoomMode";


import { IConversationRepository } from "../../interfaces/user/conversation/IConversationRepository";
import ProfileModel from "../../frameWorks/mongodb/models/profileModel";
import UserModel from "../../frameWorks/mongodb/models/userModel";
import messageModel from "../../frameWorks/mongodb/models/messageMode";
import { timeStamp } from "console";
import { any, string } from "joi";



@injectable()

export class conversationRepository implements IConversationRepository{


     async RConversation(input: Conversation): Promise<any> {
          console.log("check chat rommmmmmmmmmmis thereeeeeeeeeeeeeeeeeeeeeeeeee ")
          const [member1, member2] = input.members;
           try{
            // @ts-ignore
            const member1ObjectId = new mongoose.Types.ObjectId(member1);
             // @ts-ignore
            const member2ObjectId = new mongoose.Types.ObjectId(member2);
          
            const chatroom = await chatRoomModel.findOne({
              members: {
                $all: [
                  { $elemMatch: { userId: member1ObjectId } },
                  { $elemMatch: { userId: member2ObjectId } }
                ]
              }
            }).exec();

         // to update the status of read or not 

            // if (chatroom) {
            //   // Update the status field of member2ObjectId to true
            //   await chatRoomModel.updateOne(
            //     {
            //       _id: chatroom._id,
            //       'members.userId': member2ObjectId
            //     },
            //     {
            //       $set: { 'members.$.isRead': true }
            //     }
            //   ).exec();
            // }
            
              console.log("chat rommmmmmmmmmmmmmmmm")
              let lastime
              let currentStatus
              chatroom?.members.forEach((a)=>{
                let curr=a.userId?.toString()
                console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                console.log(curr)
                //@ts-ignore
                if(curr==member2){
                  lastime=a.clearChat
                  currentStatus=a.status
                   console.log(a.clearChat)
                }
              })
              console.log(chatroom)

              if(chatroom){
                console.log("userrrrrrrrrrriddddddddddddddddddddddddddddddddddddddddd")
             

                   console.log("hereeee")
                   console.log(chatroom._id)


                 let allChat

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


                // .populate({
                //   path: 'sender',
                //   select: '_id'
                // }).populate({
                //   path: 'receiver',
                //   select: '_id'
                // }).exec();
              
                  console.log("ooo")
                  
                console.log("jkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                console.log(allChat)
              

                let profile=await UserModel.findById(member1)

                // return profile

                return {allChat,profile,chatroom}


              }else{



                let profile=await UserModel.findById(member1)

                return profile

                

              //   console.log("here erororo 87777777777777777777777777777777777777")
              //        console.log(chatroom._id)
              //        console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
              //        let id=chatroom._id.toString()
              //   let profile=await chatRoomModel.findOne({
              //     _id:id // Assuming you have the chatroom ID
              //   }).populate('members.0').exec();
              //     console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
              //   console.log(profile)
              //   console.log("pouiiiiii")
              //   return profile
              }
              

          

           }catch(error){
            console.log(error)
           }

        
        return 
    }

   async RCreateChatRoom(input: Conversation): Promise<any> {
    const [member1, member2] = input.members;
    console.log(member1)
    console.log(member2)
    console.log("8888888888888")
    const chatroom = await chatRoomModel.findOne({
      members: {
        $all: [
            { $elemMatch: { userId: member1 } },
            { $elemMatch: { userId: member2 } }
        ]
    }
    }).exec();
    console.log("000000000000000000000000")
    console.log(chatroom)

    if(!chatroom){

      const createdRoom = await chatRoomModel.create({
        name: 'New Chat Room',
        members: [{ userId: member1 }, { userId: member2 }],
    });

    return createdRoom


    }
      return chatroom
     
        
    }

     async RsendMessage(chatRoomId:string,userId:string,receiverId:string,textMessage:string):Promise<any> {

      console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(chatRoomId,userId,receiverId,textMessage)
        console.log("pppppppppppppppppppppppppppppp")


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
      });
      console.log(newMessage)


      return newMessage





    }

     async RGetAllConversation( userId: string): Promise<any> {
      console.log(" llllllllllllllllllllllllllllllllllllllllll          ")
      console.log(userId)

      const chatrooms = await chatRoomModel.find({ members:{$elemMatch :{ userId:userId }} }).populate('members.userId','nickName , imageUrl');
      console.log("al  chattttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
console.log(chatrooms)

const chatroomIds:any = chatrooms.map(chatrooms=> chatrooms._id);

const lastAttempt: any[] = await Promise.all(chatrooms.map(async (a: any) => {
  let id = a._id.toString();
  let time:any
  let status:any;
  console.log(id);
  console.log(a.members);

  a.members.forEach((c: any) => {
    let uid = c.userId._id;
    let u = uid.toString();

    if (userId == u) {
      time = c.clearChat
      status=c.status
    }
  });

  console.log("checking timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  console.log(time)
  

  let al:any

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
 
  const userDetails: any = a.members.filter((member: any) => {
    let opp = member.userId?._id.toString();
    console.log(opp);
    console.log("opppppppppppppp");
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




  console.log(all);
  console.log("last attempt");
  console.log(userDetails[0]);

  const userDetail = {
    _id: userDetails[0].userId._id,
    imageUrl: userDetails[0].userId.imageUrl,
    nickName: userDetails[0].userId.nickName
  };

  return { all:all, userDetails: userDetail };
}));

let allfiltered=lastAttempt.filter(item => item.all._id !== undefined);
console.log("filtered filteresd")

allfiltered.sort((a, b) => b.all.timeStamp - a.all.timeStamp );


console.log("Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

console.log(lastAttempt);





//  const lastAttempt:any=[]
//  chatrooms.forEach(async(a:any)=>{

//   let id=a._id.toString()
//   let time=null
//   console.log(id)
//   console.log(a.members)
//   a.members.forEach((c:any)=>{
//     let uid=c.userId._id
//     let u=uid.toString()
   
//    if(userId==u){
   
//     time=c.clearChat
//    }else{
    
//    }
//   })

//   const findMessages = await messageModel.find({
//     chatroom: id,
//     timeStamp: { $gte: time }
// }).sort({ timeStamp: -1,_id:-1 })
// .limit(1);
//  // @ts-ignore

// const userDetail:any= a.members.filter(member =>{
//   // @ts-ignore
//  let opp=member.userId?._id.toString() 
//  console.log(opp)
//  console.log("opppppppppppppp")
//  return  opp!== userId
//  });
//  console.log(findMessages)
// console.log("last atatempt ")
// console.log(userDetail)


// const userDetails={
//   _id:userDetail[0].userId._id,
//   imageUrl:userDetail[0].userId.imageUrl,
//   nickName:userDetail[0].userId.nickName
//  }



// lastAttempt.push({findMessages,userDetail})

//  })
    



    //   console.log(chatroomIds)
    //   // Find all messages in these chatrooms where receiverId is either the sender or receiver
    // const messages = await messageModel.find({
    //   chatroom: { $in: chatroomIds },
    // })
    // .sort({ timeStamp: 1 })
//     const allMessages:any=[]
// for (const chatroomId of chatroomIds) {
//   const messages:any = await messageModel.find({
//     chatroom: chatroomId
//   })
//   .sort({ timeStamp: -1,_id:-1 })
//   .limit(1);

//   allMessages.push(messages);
// }
    

//     // .populate('sender receiver', '_id'); // Populate sender and receiver  fields



//    console.log("ovdieeeeeeeeeeeeeeeeeeeeeeeeeeee")
//     console.log(allMessages.flat(1))
//     const flatAllMessages=allMessages.flat(1)
//     console.log("finidshhhhhhhhhhhhhhhhhhhhhhhhhh")
    
//   //   const messagesByChatroom = chatroomIds.reduce((acc, chatroomId) => {
//   //     const chatroomIds= chatroomId.toString();
//   //     // @ts-ignore
//   //     acc[chatroomIds] = messages.filter(message => message.chatroom.toString() === chatroomId.toString());
      
//   //     return acc;
//   // }, {});
//   //  // @ts-ignore
//   // console.log(messagesByChatroom)
//   const messagesByChatroom:any = [];

  

//   chatrooms.forEach(chatroomId => {
//     const chatroomIdStr = chatroomId._id.toString();
    
//     // @ts-ignore
//    let all = flatAllMessages.filter(message => message.chatroom.toString() === chatroomIdStr);
//  // @ts-ignore
//    const userDetails= chatroomId.members.filter(member => member.userId.toString() !== userId);
//    console.log(userDetails)
//     // @ts-ignore
   
//    console.log(all)
//    if(all.length>0){
//    messagesByChatroom.push({userDetails,all})
//    }
//   });
//   console.log("999999999999999999999999999999999999999999999")
//   console.log(messagesByChatroom);
//   console.log("curent user id")
//   console.log(userId)







//   const sortedMessage:any=[]
//   chatrooms.forEach(chatroomId => {
//     const chatroomIdStr = chatroomId._id.toString();
//     let lastClearChatTime:any=false
//     chatroomId.members.forEach(member=>{
//       let curr=member.userId?._id.toString() 
//       console.log(curr)
//       console.log(userId)
//       console.log("hehehehehe")
//       console.log(member.userId)
//           if(curr==userId){
//             console.log("keri")
//             flatAllMessages.filter((message:any)=>{
//               console.log(message.chatroom)
//               let strid=message.chatroom.toString()
             
          
//               if(strid==chatroomIdStr&&message.timeStamp>=member.clearChat){
//                 console.log("all message that filter clear chat ")
//                 console.log(message)
//               }
//             })
//             lastClearChatTime=member.clearChat
//           }
//     })
 

//     console.log("m   1   111111 1 1 1 1 1 1 1 1 1 1 1 last timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
//     console.log(lastClearChatTime)
//     // @ts-ignore
//     flatAllMessages.forEach((a)=>{
//       let b=a.chatroom
//       console.log(b)
//       console.log(a.timeStamp)
//     })

//     console.log("cureeeeeeeeeeeetn messsssssssageeeeeeeeeeeeeeeeeee")
    

// // @ts-ignore
//    let al = flatAllMessages.filter(async(message)=> {
//      const id =  message.chatroom.toString()
//      console.log(id)
//      console.log(chatroomIdStr)
//      console.log("message")
//      console.log(message)
//      console.log("time stamp")
//      console.log(message.timeStamp)
//      console.log(lastClearChatTime)
//      console.log(message.timeStamp>=lastClearChatTime)
//      console.log(chatroomIdStr)
  
//     if(id== chatroomIdStr&&message.timeStamp>=lastClearChatTime) {
//       console.log(message)
//       return message
//     }else{
//       console.log("error")
//     }
//     })
//    console.log(" al messsageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
//    console.log(al)
//     // @ts-ignore
//    const userDetail:any= chatroomId.members.filter(member =>{
//      // @ts-ignore
//     let opp=member.userId?._id.toString() 
//     console.log(opp)
//     console.log("opppppppppppppp")
//     return  opp!== userId
//     });
//    console.log("user detailssssssssssssssssssssssssssssssssssss")
//    console.log(userDetail)
    
   
//    if(al.length>0){

//    const userDetails={
//     _id:userDetail[0].userId._id,
//     imageUrl:userDetail[0].userId.imageUrl,
//     nickName:userDetail[0].userId.nickName
//    }


//    const all={
//     _id:al[0]._id,
//     sender:al[0].sender,
//     receiver:al[0].receiver,
//     chatroom:al[0].chatroom,
//     message:al[0].message,
//     timeStamp:al[0].timeStamp
//    }

//    sortedMessage.push({userDetails:userDetails,all:all})
//   }
//   });
//   console.log(sortedMessage)
//   console.log("kkkkkkkkkkkkkkkkkkkkkkkk")

  
//      let n=sortedMessage.sort((a:any,b:any)=>b.all.timeStamp-a.all.timeStamp)

  
//   console.log(n)
//   console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")



return allfiltered






      
    }


     async RDelteChat(selectedUserId:string,userId:string): Promise<any> {
          

         const response=await chatRoomModel.findById(selectedUserId)
        console.log("old roneeeeeeeeeeeeeeeee")
        console.log(response)
        console.log("old response")
        console.log(Date.now())
         if (response) {
          // Update the clearChat field for the specified user
          response.members.forEach(member => {
                //@ts-ignore
            let id=member.userId.toString()
              if (id == userId) {
                  member.clearChat = Date.now()
              }
          });

          // Save the updated document
          await response.save();
            console.log("new dateeeeeeeeeeee")
           
           console.log("00000 delteeeeeeeeeeeeeeeeeddddddddddddddddddddddddddddd")
       console.log(response)
    }

  }





   async RDeleteAllMessages(messagesId: string[]): Promise<any> {
    console.log("ivide vanuu last ane")
    console.log(messagesId)
      console.log("delted")
    const result = await messageModel.deleteMany({ _id: { $in: messagesId } });
    console.log(`Deleted ${result.deletedCount} messages.`);
    return result;
   }



   async RDeleteSingleChat(chatRoomId: any, userId: any): Promise<any> {
        
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

    
    console.log("updatedddddddddddddddddddddddddddddddddddddddddddd")
    console.log(response)

    return response
   }
   

   async RuserTouserBlock(chatRoomId: any, userId: any): Promise<any> {
     

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
    console.log("Idssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
    // console.log(response)
    

    

   console.log(response)

    
    return response

   }


   async RuserTouserUnblock(chatRoomId: any, userId: any): Promise<any> {
     

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

    console.log("updatedddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log(response)

    return response


   }

}