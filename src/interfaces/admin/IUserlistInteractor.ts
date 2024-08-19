import { report } from "../../entities/report"
import { searchSubscription ,SubscriptionType} from "../../entities/searchSubscription"
import { userList } from "../../entities/user"

export interface IUserListInteractor{
    Igetusers():Promise<userList[]>
    IblockUser(id:string,status:boolean):Promise<boolean>
    IUsersearch(value:string):Promise<userList[]>
    Ireport(input:report):Promise<any>
    IgetAllReports():Promise<any>
    IadminLogin(email:string,password:string):Promise<any>
    IOnChangeReportStatus(reportId:string,status:Boolean):Promise<any>
    IOnReport(value:string):Promise<any>
    IonSaveSearchSubscription(value:searchSubscription):Promise<searchSubscription|boolean>
    IgetAllSearchSubscription():Promise<any>
    IgetAllPaymentSubscription():Promise<any>
    IgetDashboard():Promise<any>
    IgetOneSubscriptionDetails(id:string):Promise<SubscriptionType|null>
    IgetCurrentSearchSubscription(id:string):Promise<searchSubscription|null>
    IupdateSearchSubscription(value:searchSubscription,id:string):Promise<any>
    IdeleteSearchSubscription(id:string):Promise<any>
}