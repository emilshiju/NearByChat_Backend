
import { Profile } from "../entities/profile";
import ProfileModel from "../frameWorks/mongodb/models/profileModel";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { injectable } from "inversify";
import notificationModel from "../frameWorks/mongodb/models/notificationModel";
import mongoose,{Schema,model, Types} from "mongoose";
import UserModel from "../frameWorks/mongodb/models/userModel";
import SubscriptionModel from "../frameWorks/mongodb/models/subscriptionModel";
// import { messaging } from "../frameWorks/firebase/firebase";
import { any } from "joi";
import chatRoomModel from "../frameWorks/mongodb/models/chatRoomMode";
import webpush from "web-push";
import cron from 'node-cron';
import searchSubscriptionModel from "../frameWorks/mongodb/models/searchSubscription";
import paymentSummaryModel from "../frameWorks/mongodb/models/paymentSummary";

const config = {
  subject: "mailto:emilshiju10@gmail.com",
  publicKey:
    "BMdNWN2lmEXF2F9cjH-zOOA-7ugTGloANQyN5i1w3Pw3hVvyOsjdKPTiGBkWET93CLcO8ix_mZFWJUpPBOI3dbM",
  privateKey: "Fz37yqFAq68p8cFeQb_usGOOux8ab1kGlnjsuampu1M",
};



webpush.setVapidDetails(config.subject, config.publicKey, config.privateKey);

// @injectable()
export class ProfileRepository implements IPofileRepository {
  async RcreateProfile(input: Profile): Promise<any> {
    const updateData = {
      bio: input.bio,
      profession: input.profession,
      nickName: input.nickName,
      imageUrl: input.imageUrl,
    };

    const profile = await UserModel.findOneAndUpdate(
      {_id: input.userId },
      updateData,
      {new: true }
    );
    console.log(profile);
    return profile;
  }

  async RgetProfileUrl(input: any): Promise<any> {
    console.log("thirdd");
    console.log(input)
    let user = await UserModel.findById(input);
        console.log(user)
   if(user?.nickName){
    const data={
      nickName:user?.nickName,
      profession:user?.profession,
      bio:user?.bio,
      imageUrl:user?.imageUrl,
      currSearch:user?.currSearch,
      maxSearch:user?.maxSearch,
      profileUrl:user?.images
    }
   
    return data
  }
  return false
  }

  async RupdateImageUrl(
    userId: Schema.Types.ObjectId,
    imageUrl: string
  ): Promise<any> {
    let found = await UserModel.findByIdAndUpdate(
     userId ,
      { imageUrl: imageUrl }
    );
    console.log(found);
    const url={
      imageUrl:found?.imageUrl
    }
    return url
  }

  async RconnectionNotification(
    senderName: string,
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    userProfileId: Schema.Types.ObjectId,
    receiverProfileId: Schema.Types.ObjectId
  ): Promise<any> {
    try {
      console.log(receiverId);
      console.log(userProfileId);

      const notification = await new notificationModel({
        senderId,
        receiverId,
        senderProfile: userProfileId,
        receiverIdProfile: receiverProfileId,
        type: "connect",
        message: `${senderName} wants to connect with you.`,
      });

      const savedNotification = await notification.save();
      const save = await savedNotification.populate("senderProfile");
      console.log(savedNotification);

      console.log(
        "keteyiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );

      return save;
    } catch (error) {
      console.log(error);
    }
    // const response=await
  }

  async RgetNotification(userId: string): Promise<any> {
    const connectRequests = await notificationModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }); 
    if (!connectRequests || connectRequests.length === 0) {
       return false
    }
    // const objectId = new Types.ObjectId(userId);

    await Promise.all(connectRequests.map(async (connectRequest) => {
      console.log(connectRequest.senderId)
      if (connectRequest.senderId.toString()==userId ) {
        console.log("its eqaul")  
        console.log(connectRequest.senderId.toString())
          await connectRequest.populate('receiverId')
      }
      if (connectRequest.receiverId.toString()=== userId) {
          await connectRequest.populate('senderId')
      }


      // Optionally save each updated connect request
      await connectRequest.save();
  }));
  return connectRequests

    // console.log(connectRequests)
  }

   async acceptedRequest(senderId:Schema.Types.ObjectId,receiverId:Schema.Types.ObjectId): Promise<any> {
    
     try{
      console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

      console.log(senderId)
      console.log(receiverId)

         
             const userProfile = await UserModel.findById(senderId);

                     if (!userProfile) {
                                     // No profile found for the user
                           return false;
                        }
                        
                    
                     const connection = userProfile.connections.find(conn =>
                      //@ts-ignore
                 conn.userId&& (conn.userId as mongoose.Types.ObjectId).equals(receiverId )
                 );
                 
                 if(connection){
                  connection.status='true'
                 }

                 await userProfile.save();
                 console.log(connection)



                 const userProfile2 = await UserModel.findById(receiverId);

                    
                 
                 if (!userProfile2) {
                  // No profile found for the user
                         return false;
                 }
     
                     //@ts-ignore
                     const connection2 = userProfile2.connections.find(conn =>
                      //@ts-ignore
                 conn.userId&& (conn.userId as mongoose.Types.ObjectId).equals(senderId)
                 );


                 if(connection2){
                  connection2.status='true'
                 }

                 await userProfile2.save();




  
      
  
        const notification = await notificationModel.findOne({
          senderId: senderId,
          receiverId: receiverId,
        }).populate('receiverId','nickName , imageUrl')
        


        if (!notification) {
          console.log('Notification not found');
          return;
        }

        notification.status='true'

        notification.message='both are connected'

        const updatedNotification = await notification.save()
        console.log("updaed notificaiotn")
        console.log(updatedNotification)



console.log("kkkkkkkk")


      
      return updatedNotification

     }catch(error){
      console.log("error")

     }


  }

  async connectionRequest(userName:string,senderId:string,receiverId:string): Promise<any> {

  console.log("oneeeeeeeeeeeeeeeee")
  console.log(userName,senderId,receiverId)
  const senderObjectId = new Types.ObjectId(senderId);
  const receiverObjectId = new Types.ObjectId(receiverId);


  const userFirst = await UserModel.findOneAndUpdate(
    { _id: senderObjectId, 'connections.userId': receiverObjectId },
    { $set: { 'connections.$.status': 'pending' } },
    { new: true }
  );
   const userSecond=await UserModel.findOneAndUpdate(
    { _id: receiverObjectId, 'connections.userId': senderObjectId },
    { $set: { 'connections.$.status': 'Accept' } },
    { new: true }
   )
  
  if(!userFirst){
    const response = await UserModel.findByIdAndUpdate(
      senderId,
      {
          $push: {
              connections: {
                  userId: receiverId,
              }
          }
      },
      { new: true }  // This option returns the updated document
  );
}
      
  if(!userSecond){

      const response2 = await UserModel.findByIdAndUpdate(
        receiverId,
        {
          $push: {
            connections: {
              userId: senderId,
              status:'Accept'
            }
          },
        },
        { new: true } // This option returns the updated document
      );
    }

    
    



      
   console.log("finding finding finding finding ")
      const findNotification=await notificationModel.findOne({ $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]})

  

       console.log("user is hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee    11111111111111111111111111111111111111111111111111111111111111111111111111111111")
       console.log(findNotification)
       console.log(senderObjectId)
       console.log(receiverObjectId)

      if(findNotification){
        //@ts-ignore
           findNotification.senderId=senderObjectId,
           //@ts-ignore
           findNotification.receiverId=receiverObjectId
           findNotification.type='connect'
           findNotification.message=`${userName} wants to connect with you.`
       
           const saved= await findNotification.save();
           const save = await saved.populate("senderId")
           return save
           
        
      }else{

      
            
      const notification = await new notificationModel({
        senderId,
        receiverId,
        type: "connect",
        message: `${userName} wants to connect with you.`,
      });

      const savedNotification = await notification.save();
      const save = await savedNotification.populate("senderId");
      console.log(savedNotification);

      return save;

    }



   
 }

  async RcheckConnectionStatus(userId:any,receiverId:any): Promise<any> {

    console.log("ivdieeeee 999999999999999999999999999999999999999999")
    console.log(userId)
    console.log(receiverId)

    const userProfile = await UserModel.findById(userId);

    if (!userProfile) {
      // No profile found for the user
      return false;
  }

  const connection = userProfile.connections.find(conn =>
    conn.userId&& (conn.userId as mongoose.Types.ObjectId).equals(receiverId)
);


  if(!connection){

  }

  console.log("all connection of user all ocnnectio n of user 00000000000000000000000000000000")



  if(connection ){
    return connection
  }

  

    return 'false'
   
 }

  async RgetProfileDetails(userId: Schema.Types.ObjectId): Promise<any> {
    console.log(userId)
    let response=await UserModel.findById(userId)

    return response
 }


  async RUnConnectUser(delteSenderId:string,deleteReceiverId:string): Promise<any> {
   
    // const response = await UserModel.updateOne(
    //   { _id: delteSenderId },
    //   { $pull: { connections: { userId: deleteReceiverId } } }
    // );
    const response = await UserModel.findOneAndUpdate(
      { _id: delteSenderId, "connections.userId": deleteReceiverId },
      { $set: { "connections.$.status": 'false' } }
    );
    const response2 = await UserModel.findOneAndUpdate(
      { _id: deleteReceiverId, "connections.userId": delteSenderId },
      { $set: { "connections.$.status": 'false' } }
    );

    const findNotification:any=await notificationModel.findOne({ $or: [
      { senderId: delteSenderId, receiverId: deleteReceiverId},
      { senderId: deleteReceiverId, receiverId: delteSenderId }
    ]})
    // @ts-ignore
    // findNotification?.message='both are unConnected'
    if (findNotification) {
      findNotification.message = 'both are unConnected';
    }
    
    findNotification.save()

   
        return findNotification

 }  


 async findUserDetails(id: Schema.Types.ObjectId): Promise<any> {

     const response = await UserModel.findOne({ _id: id }, 'imageUrl nickName');

     return response
 }




 // firebase integration for push Notification


  async RStorePushNotification(value: string):Promise<any> {
      console.log("ivdie eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  bbbb")
    console.log(value)
    // const topic = 'all'

    // try{
   
    // await messaging.subscribeToTopic(value, topic);
    // console.log("sucesfulfyllllllllllllllllllll           regisssssssssssssssteredddddddddddddddd")
    // }catch(error){
    //   console.log("error")
    // }
  //   messaging.subscribeToTopic(value, topic)
  // .then((response) => {
  //   // See the MessagingTopicManagementResponse reference documentation
  //   // for the contents of response.
  //   console.log('Successfully subscribed to topic:', response);
  // })
  // .catch((error) => {
  //   console.log('Error subscribing to topic:', error);


  // const message = {
 
  //     title: 'New Message',
  //     body: 'This is a test multicast notification',
  //     token: value,
    
   
  // };
  // });



  // store in firebase

  let cornJon:any=null

    const response=await SubscriptionModel.create(value)
      
    interface modelSubscriptions{
      endpoint: string;
      expirationTime: Date | null;
      keys: {
        p256dh: string;
        auth: string;
      };

    }



    const sendNotification=async()=>{




      try{

    const subscriptions:modelSubscriptions[] = await SubscriptionModel.find({ });

    const tokens: string[] = subscriptions.map((subscription: modelSubscriptions) => {
      const endpointParts = subscription.endpoint.split('/');
      return endpointParts[endpointParts.length - 1];
    });
    
    if(subscriptions.length==0){

      cornJon.stop()
    }



   
  


  const notificationPromises = subscriptions.map(subscription => {
    const payload = JSON.stringify({
      title: 'Neay by chat',
      body: 'lot of users are there nearby go on ',
    });

    return webpush.sendNotification(subscription, payload)
      .then(() => console.log('Notification sent successfully'))
      .catch(error => console.error('Error sending notification:', error));
  });

  await Promise.all(notificationPromises);



}catch(error){

  console.log("error in psh notificaon sending ")
}




}


  
 // Schedule the task to run every 10 seconds
 cornJon=cron.schedule('*/10 * * * * *', async () => {
  await sendNotification();
}, {
  timezone: 'UTC'  // Optional: Specify the timezone if different from UTC
});



  }


  async RUnsubscribeNotification(value: any): Promise<any> {
    console.log("valyeeeeeeeeeeeeeeeeeee")
    console.log(value.endpoint)

    const deletedSubscription = await SubscriptionModel.findOneAndDelete({ endpoint: value.endpoint });
 

    console.log(deletedSubscription)


  }






  async RGetRandomProfileDetails(value: string): Promise<any> {
    

    const profileDetails=await UserModel.findById(value)

    return profileDetails
  }


  async RfindBlockUnblockDetails(chatRoomId: any, userId: any): Promise<any> {
     console.log("chatroooooooooommmmmmmmmmm detaaaaaaaaaaaaaaaaaaaaaaailllssssssssssssss")
     let Id=userId.toString()
 console.log(chatRoomId,userId)
 console.log("here found found found found")
 console.log(Id)
    
    const response:any = await chatRoomModel.findOne(
      { _id: { $in: chatRoomId }, 'members.userId': userId },
      
    )


    console.log("first response")
    console.log(response)
    console.log("current id")
    console.log(Id)

     const status=response.members.find((a:any,b:any)=>{

      let str=a.userId.toString()
        console.log(str)
      if(str==Id){
        return a
      }
     })
    
     console.log("resposne statussssssssssssssssssssssssssssssssssssssss")
     console.log(status)
       return  status.status


  }


  async RpaymentSummary(subId: string, userId: string, paymentId: string, orderId: string): Promise<any> {
    


    const userDetails=await UserModel.findById(userId)
    const searchSubscriptionDetails=await searchSubscriptionModel.findById(subId)
    
    // const currentCountofSearch=userDetails?.maxSearch
    const inSubscriptionCount=searchSubscriptionDetails?.maxCount
    // const totalCount=currentCountofSearch+inSubscriptionCount

    const updateUserDetails=await UserModel.findOneAndUpdate(
      {_id:userId},
      {$inc:{maxSearch:inSubscriptionCount}}
    )

    console.log("updated user detailssss")
    console.log(updateUserDetails)

     const searchSubscriptionPaymentSummary={
       
       userId:userDetails?._id,
       userName:userDetails?.userName,
       nickName:userDetails?.nickName,
       imageUrl:userDetails?.imageUrl,
       gender:userDetails?.gender,
       email:userDetails?.email,
       dob:userDetails?.dob,
       subscriptionName:searchSubscriptionDetails?.name,
       maxCount:searchSubscriptionDetails?.maxCount,
       price:searchSubscriptionDetails?.price,
       timePeriod:searchSubscriptionDetails?.timePeriod,
       searchSubUrl:searchSubscriptionDetails?.imageUrl,
       description:searchSubscriptionDetails?.description,
       paymentStatus:"sucess",
       razorpayPaymentId:paymentId,
       razorpayOrderId:orderId

     }

     const response=await paymentSummaryModel.create(searchSubscriptionPaymentSummary)


     response.save()

     return response


  }









  
  async RincrementSearchCount(userId: string): Promise<any> {
        


  const updateUser=await UserModel.findOneAndUpdate(
    {_id:userId},
    {$inc:{currSearch:1}}
  )

  console.log("updatedddddddddddd userrrrrrrrrrrrrr")
  console.log(updateUser)

  return updateUser

  }



 
   async RdisplayProfileDetails(userId: string): Promise<any> {
     

    const response=await UserModel.findById(userId)

    return response
   }


   async RuploadUserProfileImage(userId: string, imageUrl: string): Promise<any> {
     

    console.log(imageUrl,userId)


    const resposne=await UserModel.findOneAndUpdate({_id:userId},{$push:{images:imageUrl}},{new:true})


    console.log(resposne)
    console.log("lllllllllllllllllllllllllllllllllllllllllllllll")


    return resposne



   }

   async RdeleteProfileImage(userId: string, index: number): Promise<any> {

    console.log(userId,index,"sdffffffffffsdfdsfdsfdsfsdfdsfdsf")
     
    interface  USER{
      images:string[]
    }
        // @ts-ignore
    const user:USER = await UserModel.findById(userId)

    
    if(user){
       
    user.images.splice(index, 1);


    
     // @ts-ignore
    await user.save();
  console.log("datedddddddddddddddddddddddddd")
    console.log(user)
    return true
    }else{
      console.log("nulllll")
    }



    // const resposne=await UserModel.findOneAndRemove
   }
  
}
