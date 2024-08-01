import { report } from "../../entities/report"
import { searchSubscription } from "../../entities/searchSubscription"


export interface IUserListRepository{
    Rgetusers():Promise<any>
    RblockUser(id:string,status:boolean):Promise<any>
    RUsersearch(value:string):Promise<any>
    Rreport(input:report):Promise<any>
    RgetAllReports():Promise<any>
    RadminLogin(email:string,password:string):Promise<any>
    ROnChangeReportStatus(reportId:string,status:Boolean):Promise<any>
    ROnReport(value:string):Promise<any>
    RonSaveSearchSubscription(value:searchSubscription):Promise<any>
    RgetAllSearchSubscription():Promise<any>
    RgetAllPaymentSubscription():Promise<any>
    RgetDashboard():Promise<any>
    RgetOneSubscriptionDetails(id:string):Promise<any>
    RgetCurrentSearchSubscription(id:string):Promise<any>
    RupdateSearchSubscription(value:searchSubscription,id:string):Promise<any>
    RdeleteSearchSubscription(id:string):Promise<any>
}