import { ResponseData } from "../../entities/dashboad"
import { SubscriptionArray } from "../../entities/paymentSummary"
import { report, sortReport } from "../../entities/report"
import { searchSubscription ,SubscriptionType} from "../../entities/searchSubscription"
import { userList } from "../../entities/user"


export interface IUserListRepository{
    Rgetusers():Promise<userList[]>
    RblockUser(id:string,status:boolean):Promise<boolean>
    RUsersearch(value:string):Promise<userList[]>
    Rreport(input:report):Promise<boolean>
    RgetAllReports():Promise<sortReport[]>
    RadminLogin(email:string,password:string):Promise<userList|boolean>
    ROnChangeReportStatus(reportId:string,status:Boolean):Promise<boolean>
    ROnReport(value:string):Promise<sortReport[]>
    RonSaveSearchSubscription(value:searchSubscription):Promise<searchSubscription|boolean>
    RgetAllSearchSubscription():Promise<searchSubscription[]>
    RgetAllPaymentSubscription():Promise<SubscriptionArray[]|null>
    RgetDashboard():Promise<ResponseData>
    RgetOneSubscriptionDetails(id:string):Promise<SubscriptionType|null>
    RgetCurrentSearchSubscription(id:string):Promise<searchSubscription|null>
    RupdateSearchSubscription(value:searchSubscription,id:string):Promise< searchSubscription |null>
    RdeleteSearchSubscription(id:string):Promise<searchSubscription |null>
}