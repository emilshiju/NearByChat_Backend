import { report } from "../../entities/report"
import { searchSubscription } from "../../entities/searchSubscription"

export interface IUserListInteractor{
    Igetusers():Promise<any>
    IblockUser(id:string,status:boolean):Promise<boolean>
    IUsersearch(value:string):Promise<any>
    Ireport(input:report):Promise<any>
    IgetAllReports():Promise<any>
    IadminLogin(email:string,password:string):Promise<any>
    IOnChangeReportStatus(reportId:string,status:Boolean):Promise<any>
    IOnReport(value:string):Promise<any>
    IonSaveSearchSubscription(value:searchSubscription):Promise<any>
    IgetAllSearchSubscription():Promise<any>
    IgetAllPaymentSubscription():Promise<any>
    IgetDashboard():Promise<any>
    IgetOneSubscriptionDetails(id:string):Promise<any>
    IgetCurrentSearchSubscription(id:string):Promise<any>
    IupdateSearchSubscription(value:searchSubscription,id:string):Promise<any>
    IdeleteSearchSubscription(id:string):Promise<any>
}