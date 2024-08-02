import { IUserListRepository } from "../../interfaces/admin/IUserlistRepository";
import { injectable } from "inversify";
import UserModel from "../../frameWorks/mongodb/models/userModel";
import ProfileModel from "../../frameWorks/mongodb/models/profileModel";
import { report } from "../../entities/report";
import reportModel from "../../frameWorks/mongodb/models/reportModel";
import { ObjectId } from "mongoose";
import { Socket } from "socket.io";
import { searchSubscription } from "../../entities/searchSubscription";
import searchSubscriptionModel from "../../frameWorks/mongodb/models/searchSubscription";
import paymentSummaryModel from "../../frameWorks/mongodb/models/paymentSummary";
import locationModel from "../../frameWorks/mongodb/models/userLocation";
import { response } from "express";


// @injectable()



export class userListRepository implements IUserListRepository{

    async Rgetusers(): Promise<any> {
    
        let allUsers=await UserModel.find({role: { $ne: 'admin' }})
        console.log("al users")
        console.log(allUsers)
        return allUsers
      }

       async RblockUser(id:string,status:boolean): Promise<boolean> {
        // type InputType = {
        //     Id:string;
        //     status: string;
        //   };
          
        //   const { Id, status }: InputType = input;
        let s
        console.log(id)
        console.log(status)
        console.log("lasttttttttttt")
         if(status){
          
         s=await UserModel.findByIdAndUpdate(id,
            {$set:{status:false}},
            {new:true}
        )
        
        Socket
        
    
         }else{
            
           s= await UserModel.findByIdAndUpdate(id,
                {$set:{status:true}},
                {new:true}
            )
         }
         console.log(s)
        return true
      }
    


      async RUsersearch(value:string){
         let status=value
         const regex = new RegExp(value, 'i'); 
         console.log("Iiiiii")

            console.log(value)
         console.log("first regex"+regex)


        //  const startsWithQuery = await UserModel.find({
        //   role: { $ne: 'admin' },
        //   $or: [
        //     { userName: { $regex: `^${value}`, $options: 'i' } },
        //     { nickName: { $regex: `^${value}`, $options: 'i'} },
        //     { email: { $regex: `^${value}`, $options: 'i'} }
        //   ]
        // });
        
        // const containsQuery = await UserModel.find({
        //   role: { $ne: 'admin' },
        //   $or: [
        //     { userName: { $regex: value, $options: 'i' } },
        //     { nickName: { $regex: value, $options: 'i'} },
        //     { email: { $regex: value, $options: 'i'} }
        //   ],
        //   $and: [
        //     { userName: { $not: { $regex: `^${value}`, $options: 'i' } } },
        //     { nickName: { $not: { $regex: `^${value}`, $options: 'i' } } },
        //     { email: { $not: { $regex: `^${value}`, $options: 'i' } } }
        //   ]
        // });
        
        // // Combine and return the results
        // const results = [...startsWithQuery, ...containsQuery];
        const res = await UserModel.aggregate([
          {
            $match: {
              role: { $ne: 'admin' },
              $or: [
                { userName: { $regex: value, $options: 'i' } },
                // { nickName: { $regex: value, $options: 'i' } },
                // { email: { $regex: value, $options: 'i' } }
              ]
            }
          },
          {
            $addFields: {
              userNameIndex: { $indexOfCP: [{ $toLower: "$userName" }, value.toLowerCase()] },
              // nickNameIndex: { $indexOfCP: [{ $toLower: "$nickName" },value.toLowerCase()] },
              // emailIndex: { $indexOfCP: [{ $toLower: "$email" }, value.toLowerCase()] }
            }
          },
          {
            $sort: {
              userNameIndex: 1,
              // nickNameIndex: 1,
              // emailIndex: 1
            }
          }
        ]);

        if(res.length==0){
        
          const res = await UserModel.find({
              role: { $ne: 'admin' },
              $or: [
                { nickName: { $regex: `^${value}`, $options: 'i'} },
                { email: { $regex: `^${value}`, $options: 'i'} }
              ]
            });
              return res
     
        }

        return res



      }





      
      async Rreport(input: report): Promise<any> {
         
         const response=await reportModel.create({
            reporter:input.reporter,
            reportedUser:input.reportedUser,
            reason:input.reason
         })
        
         console.log(response)




         if(response){
            return true
         }
      }

      async RgetAllReports(): Promise<any> {
         
         const response=await reportModel.find().populate('reporter','nickName  email').populate('reportedUser','nickName  email')

         const sorted:any=[]

           for(let rep of response){
                  console.log("111111111111111111111")
                  console.log(sorted)
             let checkStatus=sorted.find((a:any)=>{
           
             
                 // @ts-ignore
                   return a.reporter.email==rep.reporter.email&&a.reportedUser.email==rep.reportedUser.email
               
             })
             if(checkStatus){
               checkStatus.reasons.push(rep.reason)
             }
               console.log(checkStatus)
             if(!checkStatus){
               console.log("pusheddddddddddddddddd")

              
              
         
               sorted.push({
                  _id:rep._id,
                  reporter: rep.reporter,
                  reportedUser: rep.reportedUser,
                  reasons: [rep.reason],
                  marked:rep?.isRead,
                  createdAt: rep.createdAt,
                  __v: rep.__v
                })
             }

             
           }

       

         return sorted
      }



      async RadminLogin(email: string, password: string): Promise<any> {
         console.log(email);
         let ifAdmin = await UserModel.findOne({ email: email });
         console.log(ifAdmin);
         if (ifAdmin) {
           //       console.log("iide")
           //       console.log(ifAdmin.password)
           //       console.log(password)
           // let hash=ifAdmin.password
           //       let match=await bcrypt.compare(password,hash)
           //       console.log(match)
           //       console.log("ivide")
           //       if(match){
           //     console.log("trei")
           //         return ifAdmin
           //       }
     
           return ifAdmin;
         }
     
         return false;
       }



       async ROnChangeReportStatus(reportId: string, status: Boolean): Promise<any> {
         console.log("0000000000000000000000000000000000000000000000")
              console.log(reportId)
              console.log(status)
         const response=await reportModel.findByIdAndUpdate(reportId,{$set:{isRead:status}})

         console.log("report update")
         console.log(response)
       }



        async ROnReport(value: string): Promise<any> {

         console.log(value)
             

         const regex = new RegExp(value, 'i'); 
         interface m{
            _id:ObjectId,
            reporter:any,
            reportedUser:any,
            reason:any,
            isRead:boolean,
            createdAt:Date,
            __v:Number
            }

             console.log(regex)

             
             const a:m[]=await reportModel.find({})
             .populate('reporter','nickName  email')
             .populate('reportedUser','nickName  email') as unknown as m[];

             console.log("alllllllllllllllllllllllllllll")
             console.log(a)
            

             const response=a.filter((a:m,b)=>{
                     
               
               return (
                  regex.test(a.reporter.email) ||
                  regex.test(a.reporter.nickName) ||
                  regex.test(a.reportedUser.email) ||
                  regex.test(a.reportedUser.nickName)
                );
             })

             console.log("lastere tryyyyyyyyyyyyyyyyyyyyyyyy")
            

         // const response = await reportModel.find({
         //    $or: [
         //      { 'reporter.email': { $regex: regex} }, // Case-insensitive regex search
         //      { 'reporter.nickName': { $regex: regex } },
         //      { 'reportedUser.email': { $regex: regex } },
         //      { 'reportedUser.nickName': { $regex:regex } }
         //    ]
         //  }).populate('reporter','nickName  email')
         //  .populate('reportedUser','nickName  email')


        


          const sorted:any=[]

           for(let rep of response){
                  console.log("111111111111111111111")
                  console.log(sorted)
             let checkStatus=sorted.find((a:any)=>{
           
             
                 // @ts-ignore
                   return a.reporter.email==rep.reporter.email&&a.reportedUser.email==rep.reportedUser.email
               
             })
             if(checkStatus){
               checkStatus.reasons.push(rep.reason)
             }
               console.log(checkStatus)
             if(!checkStatus){
               console.log("pusheddddddddddddddddd")

              
              
         
               sorted.push({
                  _id:rep._id,
                  reporter: rep.reporter,
                  reportedUser: rep.reportedUser,
                  reasons: [rep.reason],
                  marked:rep?.isRead,
                  createdAt: rep.createdAt,
                  __v: rep.__v
                })
             }

             
           }

       
              console.log("allllllllllllllllllllllllllllllllllll")
              console.log(sorted)

         return sorted


       }


       async RonSaveSearchSubscription(value: searchSubscription): Promise<any> {
         
     console.log("saveeeeeeeeeee seeeeeeeeeearchhhhhhhhhhhh subscription subcription subscripiton ")
         console.log(value)
         const sumOfSub=await searchSubscriptionModel.find({})
         console.log(sumOfSub)
         console.log("finishhhhhhhh")
         if(sumOfSub.length>=3){
          return  false
         }
       const response=await searchSubscriptionModel.create(value)
        console.log(value)

        return response
       }
      
      
       async RgetAllSearchSubscription(): Promise<any> {
         
        const response=await searchSubscriptionModel.find()

        return response
       }
  


       async RgetAllPaymentSubscription(): Promise<any> {
         
        const response=await paymentSummaryModel.find({})

          
         return response

       }


       async RgetDashboard(): Promise<any> {
        
        
        // getting daily sale amount


        // const totalAmount=await paymentSummaryModel.aggregate([
        //   {$group:{_id:null,totalSum:{$sum:"$price"}}}const now = new Date();

    // Subtract 24 hours from the current date and time

    const now = new Date();

    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Aggregation pipeline
    const totalAmountDaily = await paymentSummaryModel.aggregate([
     
      {
        $match: {
          createdAt: {
            $gte: twentyFourHoursAgo, 
            $lte: now                 
          }
        }
      },
   
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$price" }
        }
      }
    ]);


        // ])

        console.log("get atotal amount",totalAmountDaily)




        // get users count

        const  countAlluser=await UserModel.countDocuments({});

        // get count of order

        const countPayment=await paymentSummaryModel.countDocuments({});


        // get count of reports

        const countReport=await reportModel.countDocuments({});
         

        // getCountOfusers joined  Weekely
              



    // Calculate the date one week ago
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Aggregation pipeline
    const usersJoinedDaily = await locationModel.aggregate([
   
      {
        $match: {
          createdAt: {
            $gte: oneWeekAgo, // Greater than or equal to one week ago
            $lte: now         // Less than or equal to now
          }
        }
      },
    
      {
        $project: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          }
        }
      },
     
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 }
        }
      },
    
      {
        $sort: { _id: 1 }
      },
      
    ]);
    console.log("aggggggggggggggggggggg resuleeeeeeee")
    console.log(usersJoinedDaily)
     

    const results = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split('T')[0];

      // Find the count for this date or use 0 if not found
      const dayData = usersJoinedDaily.find(item => item._id === dateString);
      results.push({ date: dateString, count: dayData ? dayData.count : 0 });
    }

    results.reverse();

    console.log("User Joined Count by Day for the Last Week:", results);
  


  // get count of order weekely

     
  const usersSubscribedDaily = await paymentSummaryModel.aggregate([
   
    {
      $match: {
        createdAt: {
          $gte: oneWeekAgo, // Greater than or equal to one week ago
          $lte: now         // Less than or equal to now
        }
      }
    },
  
    {
      $project: {
        day: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        }
      }
    },
   
    {
      $group: {
        _id: "$day",
        count: { $sum: 1 }
      }
    },
  
    {
      $sort: { _id: 1 }
    },
    
  ]);


 console.log("subsssssssssssssssssssssss")
 console.log( usersSubscribedDaily )

  const resultsOfSubscribed = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split('T')[0];

    // Find the count for this date or use 0 if not found
    const dayData =  usersSubscribedDaily .find(item => item._id === dateString);
    resultsOfSubscribed.push({ date: dateString, count: dayData ? dayData.count : 0 });
  }

  resultsOfSubscribed.reverse();

  console.log("User Joined Count by Day for the Last Week:", resultsOfSubscribed);


   return {totalAmountDaily,countAlluser,countPayment,countReport,results,resultsOfSubscribed }


       }


       async RgetOneSubscriptionDetails(id:string): Promise<any> {
         

        const response=await paymentSummaryModel.findById(id)
          console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        console.log(response)
         return response
        
       }

       async RgetCurrentSearchSubscription(id: string): Promise<any> {
         console.log("000000000000000000000000000")
        const response=await searchSubscriptionModel.findById(id)
        console.log("seachhhhhhhhhhhhhhhhh subbbbbbbbbbbbbbbbbscripttttttttttttttttttttttt")
        console.log(response)

        return response
       }

       async RupdateSearchSubscription(value: searchSubscription,id:string): Promise<any> {
        console.log("kitiiiiiiiiiiiii")
          //  console.log(value)
          //  console.log(id)

        const response=await searchSubscriptionModel.findOneAndUpdate(
          {_id:id},
          {$set:{
            name:value.name,
            maxCount:value.maxCount,
            price:value.price,
            timePeriod:value.timePeriod,
            imageUrl:value.imageUrl
          }
        },{
          new:true
        })


        console.log("updaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
           console.log(response)
         return response
       }


       async RdeleteSearchSubscription(id: string): Promise<any> {
          console.log("8888888888888888888888888888888")

        const response=await searchSubscriptionModel.findByIdAndDelete(id)

         console.log("eueueueueu")
        console.log(response)
        console.log("llallal")

        return response
       }
}
