import { NextFunction, Request, Response } from "express";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { inject, injectable } from "inversify";

import axios from "axios";
import dotenv from "dotenv";
import { IUserListInteractor } from "../../interfaces/admin/IUserlistInteractor";
import { searchSubscription } from "../../entities/searchSubscription";
dotenv.config();

// @injectable()
export class UserListController {
  private interactor: IUserListInteractor;
  // constructor(
  //   @inject(INTERFACE_TYPE.UserListInteractor) interactor: IUserListInteractor
  // ) {
  //   this.interactor = interactor;
  // }

  constructor(interactor: IUserListInteractor) {
    this.interactor = interactor;
  }


  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    console.log("yes");
    let users = await this.interactor.Igetusers();

    console.log("sodfjso");
    console.log(users);
    return res.json({ data: users });
  }


  async blockUser(req:Request,res:Response,next:NextFunction){

     let {id,status}=req.body
     console.log(id)
       console.log(status)

    let response=await this.interactor.IblockUser(id,status)

    return res.json({status:response})
  }



  async searchUsers(req:Request,res:Response,next:NextFunction){
 

 try{

 // @ts-ignore
    let value:string=req.query.value
    console.log("error")

    let users=await this.interactor.IUsersearch(value)

    console.log(users)

    console.log(users)
    
    return res.json({ data: users });
 }catch(error){
  console.log("third")
  console.log(error)
 }


  }


  async onSubmitReport(req:Request,res:Response,next:NextFunction){

    const { reporter,reportedUser,reason}=req.body

    const input={
      reporter,
      reportedUser,
      reason
    }
    console.log(input)

    const response=await this.interactor.Ireport(input)

    console.log(response)
    return res.json({status:response})


  }


  async ongetAllReports(req:Request,res:Response,next:NextFunction){

    const response=await this.interactor.IgetAllReports()

    console.log("all     reprttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
    console.log(response)


    


    return res.json({status:true,data:response})
  }


  async adminLogin(req:Request,res:Response,next:NextFunction){

    const {email,password}=req.body
    console.log('vanu')

    const {ifAdmin,AccessToken}=await this.interactor.IadminLogin(email,password)



    if(ifAdmin){
    
      const userData = {
        _id:ifAdmin._id,
        userName: ifAdmin.userName,
        role: ifAdmin.role,
        email:ifAdmin.email,
        status:ifAdmin.status
      }; 
       let role=['admin']
  
      if(!role.includes(userData.role)){
        return res.status(402).json({message:"not acces to this route"}) 
      }
   
  
      console.log('acess tokennnnnnnnnnnnnnnnadsfsdfsdfsd')
    console.log(AccessToken)
      return res
        .json({
          message: "succesfully Logined",
          data: userData,
          AccessToken ,
          status:true
        })
        .status(200)
  
      }else{

        return res.json({message:"credential not correct",status:false})
      }



    


  }

  async onChangeReportStatus(req:Request,res:Response,next:NextFunction){



    try{
    const {reportId,status}=req.body
    console.log(req.body)
    console.log(reportId)
    console.log(status)
    console.log("potiii")
    const response=await this.interactor.IOnChangeReportStatus(reportId,status)
    }catch(error){
      console.log("one")
      console.log(error)
    }


  }


  async onSearchReports(req:Request,res:Response,next:NextFunction){
    
    let value:string=req.query.value as string 

    const response=await this.interactor.IOnReport(value)

    return res.json({ data: response });

  }


  async onSearchSubscription(req:Request,res:Response,next:NextFunction){
            console.log(req.body)
    const value:searchSubscription=req.body
    console.log("searchhhhhhhhhhhhhhhhhhhhhhhh")
    console.log(value)

    const response=await this.interactor.IonSaveSearchSubscription(value)


    if(response){

      return res.json({status:true})
    }else{

      return res.json({status:false})

    }
  }


  async ongetSearchAllSubscription(req:Request,res:Response,next:NextFunction){
    console.log("vannnnnnnnnnnnnnnnnnnnnnn 88888888888888888888888888888888888888")

    const response=await this.interactor.IgetAllSearchSubscription()
    console.log("subscriptoin deralllllllllllllllllllllllllllllllllllllllllll")
    console.log(response)
    return res.json({data:response})
  }



  async ongetAllPaymentSubscription(req:Request,res:Response,next:NextFunction){
    

    console.log("abbbbbbbbbbbbbbbbbbb")

    const response=await this.interactor.IgetAllPaymentSubscription()
  console.log("allllllllllllllllllllllllllllllllllllllll")
    console.log(response)
    return res.json({data:response})
    
  }



  async ongetDashboad(req:Request,res:Response,next:NextFunction){



    const response=await this.interactor.IgetDashboard()
       console.log("ppppppppppppppppppppppppppppppppp")
      console.log(response)
      const dates=response.results?.map((a:any)=>a.date)
      const usersWeeklyCount=response.results?.map((a:any)=>a.count)
      const usersWeeklyOrderes=response.resultsOfSubscribed?.map((a:any)=>a.count)

    return res.json({data:response,week:dates,weeklyUsers:usersWeeklyCount,weeklyOrderes:usersWeeklyOrderes})
  }



  async getOneSubscriptionDetails(req:Request,res:Response,next:NextFunction){
      
    const id=req.params.id

    console.log("yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
    console.log(id)

    const response=await this.interactor.IgetOneSubscriptionDetails(id)
    
    console.log("subsssssssssssssssssssssssssssssssssssssssssss")
    console.log(response)

    return res.json({data:response})

  }



  async getCurrentSearchSubscription(req:Request,res:Response,next:NextFunction){

    const id=req.params.id


    const response=await this.interactor.IgetCurrentSearchSubscription(id)
            
    console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
    console.log(response)

    return res.json({data:response})
  }


  async onupdateSearchSUbscription(req:Request,res:Response,next:NextFunction){

         const value:searchSubscription=req.body.data
         const id:string=req.body.id
          console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppp    00000000000000000000000000000000000000000000000000000000000000000000000000000")
          console.log(value)

    const response=await this.interactor.IupdateSearchSubscription(value,id)

    console.log(response)

    return res.json({status:true})

  }


  async ondeleteSearchSubscription(req:Request,res:Response,next:NextFunction){
      
    const {id}=req.params

    console.log("vannnn")
    console.log(id)
     
    const respose=await this.interactor.IdeleteSearchSubscription(id)


    console.log(respose)
  return res.json({status:true})
  }

  
}
