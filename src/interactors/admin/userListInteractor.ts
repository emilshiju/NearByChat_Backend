import { IUserListInteractor } from "../../interfaces/admin/IUserlistInteractor";

import { inject, injectable } from "inversify";
import { IUserListRepository } from "../../interfaces/admin/IUserlistRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { response } from "express";
import { report } from "../../entities/report";
import { accessToken } from "../../services/jwtService";
import { searchSubscription } from "../../entities/searchSubscription";
@injectable()


export class userListInteractor implements IUserListInteractor{
    private repository:IUserListRepository
    constructor(
        @inject(INTERFACE_TYPE.UserListRepository)repository:IUserListRepository
    ){
        this.repository=repository
    }

    async Igetusers(): Promise<any> {
        
        let allUsers=await this.repository.Rgetusers()

        return allUsers
    }

     async IblockUser(id:string,status:boolean):Promise<boolean> {
    
          

        let response=await this.repository.RblockUser(id,status)

        return response
    }


    async IUsersearch(value:string):Promise<any>{
       console.log("second chagen")
        let got=await this.repository.RUsersearch(value)
        return got

    }
    
    async Ireport(input: report): Promise<any> {


        const response= await this.repository.Rreport(input)

        return response
    }

     async IgetAllReports(): Promise<any> {

        const response=await this.repository.RgetAllReports()

        return response
        
    }

    
    async  IadminLogin(email: string, password: string): Promise<any> {
        
        let ifAdmin=await this.repository.RadminLogin(email,password)

        const AccessToken=await  accessToken(ifAdmin.userName,ifAdmin.email,ifAdmin._id)

        return {ifAdmin,AccessToken}
    }
    

     async IOnChangeReportStatus(reportId: string, status: Boolean): Promise<any> {
           console.log("second")
        const response=await this.repository.ROnChangeReportStatus(reportId,status)

        return response
    }
     
      async IOnReport(value: string): Promise<any> {
           
          const response=await this.repository.ROnReport(value)

          return response
    }


    async IonSaveSearchSubscription(value: searchSubscription): Promise<any> {
        
        const response=await this.repository.RonSaveSearchSubscription(value)

        return response
    }


    async IgetAllSearchSubscription(): Promise<any> {
        
        const response=await this.repository.RgetAllSearchSubscription()

        return response
    }

    async IgetAllPaymentSubscription(): Promise<any> {
        
        const response=await this.repository.RgetAllPaymentSubscription()

        return response
        
    }


    async IgetDashboard(): Promise<any> {
        
        const response=await this.repository.RgetDashboard()


        return  response


    }


    async IgetOneSubscriptionDetails(id:string): Promise<any> {
        
        const response=await this.repository.RgetOneSubscriptionDetails(id)


        return response
    }


    async IgetCurrentSearchSubscription(id: string): Promise<any> {
        
        const response=await this.repository.RgetCurrentSearchSubscription(id)

        return response
    }


    async IupdateSearchSubscription(value: searchSubscription,id:string): Promise<any> {
        
        const response=await this.repository.RupdateSearchSubscription(value,id)

        return response
    }

    async IdeleteSearchSubscription(id: string): Promise<any> {
        

        const response=await this.repository.RdeleteSearchSubscription(id)


        return response
    }

    
}