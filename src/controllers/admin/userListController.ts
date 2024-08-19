import { NextFunction, Request, Response } from "express";


import dotenv from "dotenv";
import { IUserListInteractor } from "../../interfaces/admin/IUserlistInteractor";
import { searchSubscription } from "../../entities/searchSubscription";
import { HttpStatusCode } from "../../entities/enums/statusCode";
dotenv.config();


export class UserListController {
  private interactor: IUserListInteractor;
 

  constructor(interactor: IUserListInteractor) {
    this.interactor = interactor;
  }


  async getAllUsers(req: Request, res: Response, next: NextFunction) {

    try{
  
    const  users = await this.interactor.Igetusers();

   
   
    console.log(users);
    return res.json({ data: users })
    
    }catch(error){

      next(error)
    }
    
  }


  async blockUser(req:Request,res:Response,next:NextFunction){



    try{

     const {id,status}=req.body
     console.log(id)
       console.log(status)

    const response=await this.interactor.IblockUser(id,status)

    return res.json({status:response})

    }catch(error){
         next(error)
    }
  }



  async searchUsers(req:Request,res:Response,next:NextFunction){
 

 try{


    const value:string=req.query.value as string || ''
   

    const users=await this.interactor.IUsersearch(value)

    console.log(users)

    console.log(users)
    
    return res.json({ data: users });
 }catch(error){
  
    next(error)
 }


  }


  async onSubmitReport(req:Request,res:Response,next:NextFunction){


    try{

    const { reporter,reportedUser,reason}=req.body

    const input={
      reporter,
      reportedUser,
      reason
    }
   

    const response=await this.interactor.Ireport(input)

    
    return res.json({status:response})

    }catch(error){
        next(error)

    }


  }


  async ongetAllReports(req:Request,res:Response,next:NextFunction){


    try{

    const response=await this.interactor.IgetAllReports()

    return res.json({status:true,data:response})
    }catch(error){

      next(error)
    }


  }


  async adminLogin(req:Request,res:Response,next:NextFunction){



    try{

    const {email,password}=req.body
    

    const {ifAdmin,AccessToken}=await this.interactor.IadminLogin(email,password)



    if(ifAdmin){
    
      const userData = {
        _id:ifAdmin._id,
        userName: ifAdmin.userName,
        role: ifAdmin.role,
        email:ifAdmin.email,
        status:ifAdmin.status
      }; 
      
  
      if(userData.role !== 'admin'){
        // 402
        return res.status(HttpStatusCode.NOT_ACESSS).json({message:"not acces to this route"}) 
      }
   
  
    
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

    }catch(error){
         next(error)

    }

    


  }




  async onChangeReportStatus(req:Request,res:Response,next:NextFunction){



    try{
    const {reportId,status}=req.body
    
    const response=await this.interactor.IOnChangeReportStatus(reportId,status)
    }catch(error){
       next(error)
    }


  }


  async onSearchReports(req:Request,res:Response,next:NextFunction){


    try{
    
    const value:string=req.query.value as string 

    const response=await this.interactor.IOnReport(value)

    return res.json({ data: response });

    }catch(error){

      next(error)

    }

  }


  async onSearchSubscription(req:Request,res:Response,next:NextFunction){
           

    try{

    const value:searchSubscription=req.body
    

    const response=await this.interactor.IonSaveSearchSubscription(value)


    if(response){

      return res.json({status:true})
    }else{

      return res.json({status:false})

    }



  }catch(error){
    
    next(error)

  }
  }


  async ongetSearchAllSubscription(req:Request,res:Response,next:NextFunction){
      
    try{
    const response=await this.interactor.IgetAllSearchSubscription()
  
    return res.json({data:response})
    }catch(error){
       next(error)
    }


  }



  async ongetAllPaymentSubscription(req:Request,res:Response,next:NextFunction){
    

  try{

    const response=await this.interactor.IgetAllPaymentSubscription()
  
    return res.json({data:response})

  }catch(error){
     next(error)
  }
    
  }



  async ongetDashboad(req:Request,res:Response,next:NextFunction){



    try{
    const response=await this.interactor.IgetDashboard()
      
      const dates=response.results?.map((a:{ date: string; count: number })=>a.date)
      const usersWeeklyCount=response.results?.map((a:{ date: string; count: number })=>a.count)
      const usersWeeklyOrderes=response.resultsOfSubscribed?.map((a:{ date: string; count: number })=>a.count)

    
    return res.json({data:response,week:dates,weeklyUsers:usersWeeklyCount,weeklyOrderes:usersWeeklyOrderes})

    }catch(error){
     next(error)
    }

  }



  async getOneSubscriptionDetails(req:Request,res:Response,next:NextFunction){


    try{
      
    const id=req.params.id
    const response=await this.interactor.IgetOneSubscriptionDetails(id)
    return res.json({data:response})

    }catch(error){
      next(error)
    }

  }



  async getCurrentSearchSubscription(req:Request,res:Response,next:NextFunction){


    try{

    const id=req.params.id
    const response=await this.interactor.IgetCurrentSearchSubscription(id)
    return res.json({data:response})

    }catch(error){
      next(error)
    }

  }


  async onupdateSearchSUbscription(req:Request,res:Response,next:NextFunction){


    try{
         const value:searchSubscription=req.body.data
         const id:string=req.body.id
         const response=await this.interactor.IupdateSearchSubscription(value,id)
         return res.json({status:true})
    }catch(error){
      next(error)
    }

  }


  async ondeleteSearchSubscription(req:Request,res:Response,next:NextFunction){
      
    try{
    const {id}=req.params
 
    const respose=await this.interactor.IdeleteSearchSubscription(id)

      return res.json({status:true})

    }catch(error){
      next(error)
    }
  }

  
}
