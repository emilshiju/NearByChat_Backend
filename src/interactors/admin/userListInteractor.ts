import { IUserListInteractor } from "../../interfaces/admin/IUserlistInteractor";

import { IUserListRepository } from "../../interfaces/admin/IUserlistRepository";


import { report, sortReport } from "../../entities/report";
import { accessToken } from "../../services/jwtService";
import { searchSubscription, SubscriptionType } from "../../entities/searchSubscription";
import { adminLogin, userList } from "../../entities/user";
import { SubscriptionArray } from "../../entities/paymentSummary";
import { ResponseData } from "../../entities/dashboad";



export class userListInteractor implements IUserListInteractor{
    private repository:IUserListRepository
    

    constructor(repository: IUserListRepository) {
        this.repository = repository;
    }


    async Igetusers(): Promise<userList[]> {
          try{
        const allUsers=await this.repository.Rgetusers()

        return allUsers

          }catch(error){
            throw error
          }
    }

     async IblockUser(id:string,status:boolean):Promise<boolean> {
    
          
  try{
        const response=await this.repository.RblockUser(id,status)

        return response

  }catch(error){
    throw error
  }
    }


    async IUsersearch(value:string):Promise<userList[]>{
       try{
        const got:userList[]=await this.repository.RUsersearch(value)
        return got

       }catch(error){
        throw error
       }

    }
    
    async Ireport(input: report): Promise<boolean> {
      
        try{

        const response:boolean= await this.repository.Rreport(input)

        return response
        }catch(error){
            throw error
        }
    }

     async IgetAllReports(): Promise<sortReport[]> {
        
        try{
        const response=await this.repository.RgetAllReports()

        return response
        }catch(error){
            throw error
        }
        
    }

    
    async  IadminLogin(email: string, password: string): Promise<adminLogin> {
          
        try{
        const ifAdmin:any=await this.repository.RadminLogin(email,password)

        const AccessToken=await  accessToken(ifAdmin.userName,ifAdmin.email,ifAdmin._id)

        return {ifAdmin,AccessToken}

        }catch(error){
            throw error
        }
    }
    

     async IOnChangeReportStatus(reportId: string, status: Boolean): Promise<boolean> {
          
        try{
        const response=await this.repository.ROnChangeReportStatus(reportId,status)

        return response
        }catch(error){
            throw error
        }
    }
     
      async IOnReport(value: string): Promise<sortReport[]> {
           try{
          const response=await this.repository.ROnReport(value)

          return response
           }catch(error){
            throw error
           }
    }


    async IonSaveSearchSubscription(value: searchSubscription): Promise<searchSubscription|boolean> {
        

        try{
        const response=await this.repository.RonSaveSearchSubscription(value)

        return response
        }catch(error){
            throw error
        }
    }


    async IgetAllSearchSubscription(): Promise<searchSubscription[]> {
        

        try{
        const response=await this.repository.RgetAllSearchSubscription()

        return response

        }catch(error){
            throw error
        }
    }

    async IgetAllPaymentSubscription(): Promise<SubscriptionArray[]|null> {
        

        try{
        const response:SubscriptionArray[]|null=await this.repository.RgetAllPaymentSubscription()
       
        if(response){

         return response

        }

        return null

    }catch(error){
        throw error
    }
        
    }


    async IgetDashboard(): Promise<ResponseData> {

        try{
        
        const response:ResponseData=await this.repository.RgetDashboard()


        return  response
        }catch(error){
            throw error
        }


    }


    async IgetOneSubscriptionDetails(id:string): Promise<SubscriptionType|null> {
        

        try{
        const response=await this.repository.RgetOneSubscriptionDetails(id)


        return response
        }catch(error){
            throw error
        }
    }


    async IgetCurrentSearchSubscription(id: string): Promise<searchSubscription|null> {
        

        try{
        const response=await this.repository.RgetCurrentSearchSubscription(id)

        return response
        }catch(error){
            throw error
        }
    }


    async IupdateSearchSubscription(value: searchSubscription,id:string): Promise<searchSubscription |null> {
        

        try{
        const response=await this.repository.RupdateSearchSubscription(value,id)

        return response
        }catch(error){
            throw error
        }
    }

    async IdeleteSearchSubscription(id: string): Promise<searchSubscription |null> {
        try{

        const response=await this.repository.RdeleteSearchSubscription(id)


        return response
        }catch(error){
            throw error
        }
    }

    
}