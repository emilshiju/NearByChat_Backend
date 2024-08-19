import { IUserListRepository } from "../../interfaces/admin/IUserlistRepository";

import UserModel from "../../frameWorks/mongodb/models/userModel";

import { allReport, IReport, report, sortReport } from "../../entities/report";
import reportModel from "../../frameWorks/mongodb/models/reportModel";

import {
  searchSubscription,
  SubscriptionType,
} from "../../entities/searchSubscription";
import searchSubscriptionModel from "../../frameWorks/mongodb/models/searchSubscription";
import paymentSummaryModel from "../../frameWorks/mongodb/models/paymentSummary";
import locationModel from "../../frameWorks/mongodb/models/userLocation";

import { userList } from "../../entities/user";

import { SubscriptionArray } from "../../entities/paymentSummary";
import { ResponseData } from "../../entities/dashboad";

export class userListRepository implements IUserListRepository {
  async Rgetusers(): Promise<userList[]> {
    try {
      const allUsers = (await UserModel.find({
        role: { $ne: "admin" },
      })) as userList[];

      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  async RblockUser(id: string, status: boolean): Promise<boolean> {
    try {
      let s;

      if (status) {
        s = await UserModel.findByIdAndUpdate(
          id,
          { $set: { status: false } },
          { new: true }
        );
      } else {
        s = await UserModel.findByIdAndUpdate(
          id,
          { $set: { status: true } },
          { new: true }
        );
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async RUsersearch(value: string) {
    const regex = new RegExp(value, "i");

    const res = await UserModel.aggregate([
      {
        $match: {
          role: { $ne: "admin" },
          $or: [
            { userName: { $regex: value, $options: "i" } },
            // { nickName: { $regex: value, $options: 'i' } },
            // { email: { $regex: value, $options: 'i' } }
          ],
        },
      },
      {
        $addFields: {
          userNameIndex: {
            $indexOfCP: [{ $toLower: "$userName" }, value.toLowerCase()],
          },
          // nickNameIndex: { $indexOfCP: [{ $toLower: "$nickName" },value.toLowerCase()] },
          // emailIndex: { $indexOfCP: [{ $toLower: "$email" }, value.toLowerCase()] }
        },
      },
      {
        $sort: {
          userNameIndex: 1,
          // nickNameIndex: 1,
          // emailIndex: 1
        },
      },
    ]);

    if (res.length == 0) {
      const res = await UserModel.find({
        role: { $ne: "admin" },
        $or: [
          { nickName: { $regex: `^${value}`, $options: "i" } },
          { email: { $regex: `^${value}`, $options: "i" } },
        ],
      });
      return res;
    }

    return res;
  }

  async Rreport(input: report): Promise<boolean> {
    try {
      const response = await reportModel.create({
        reporter: input.reporter,
        reportedUser: input.reportedUser,
        reason: input.reason,
      });

      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async RgetAllReports(): Promise<sortReport[]> {
    try {
      const response: allReport[] = await reportModel
        .find()
        .populate("reporter", "nickName  email")
        .populate("reportedUser", "nickName  email")
        .lean();

      const sorted:any = [];

      for (let rep of response) {
        const checkStatus = sorted.find((a:any) => {
          return (
            a.reporter.email == rep.reporter.email &&
            a.reportedUser.email == rep.reportedUser.email
          );
        });
        if (checkStatus) {
          checkStatus.reasons.push(rep.reason);
        }

        if (!checkStatus) {
          sorted.push({
            _id: rep._id,
            reporter: rep.reporter,
            reportedUser: rep.reportedUser,
            reasons: [rep.reason],
            marked: rep?.isRead,
            createdAt: rep.createdAt,
            __v: rep.__v,
          });
        }
      }

      return sorted;
    } catch (error) {
      throw error;
    }
  }

  async RadminLogin(
    email: string,
    password: string
  ): Promise<userList | boolean> {
    try {
      const ifAdmin: userList | null = await UserModel.findOne({
        email: email,
      });

      if (ifAdmin) {
        return ifAdmin;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async ROnChangeReportStatus(
    reportId: string,
    status: Boolean
  ): Promise<boolean> {
    try {
      const response: IReport | null = await reportModel.findByIdAndUpdate(
        reportId,
        { $set: { isRead: status } }
      );

      return true;
    } catch (error) {
      throw error;
    }
  }

  async ROnReport(value: string): Promise<sortReport[]> {
    try {
      const regex = new RegExp(value, "i");

      const a: IReport[] = await reportModel
        .find({})
        .populate("reporter", "nickName  email")
        .populate("reportedUser", "nickName  email")
        .lean();

      const response: any = a.filter((a, b) => {
        return (
          regex.test(a.reporter.email) ||
          regex.test(a.reporter.nickName) ||
          regex.test(a.reportedUser.email) ||
          regex.test(a.reportedUser.nickName)
        );
      });

      const sorted: sortReport[] = [];

      for (let rep of response) {
        let checkStatus = sorted.find((a) => {
          return (
            a.reporter.email == rep.reporter.email &&
            a.reportedUser.email == rep.reportedUser.email
          );
        });
        if (checkStatus) {
          checkStatus.reasons.push(...rep.reason);
        }

        if (!checkStatus) {
          sorted.push({
            _id: rep._id,
            reporter: rep.reporter,
            reportedUser: rep.reportedUser,
            reasons: [...rep.reason],
            marked: rep?.isRead,
            createdAt: rep.createdAt,
            __v: rep.__v,
          });
        }
      }

      return sorted;
    } catch (error) {
      throw error;
    }
  }





  async RonSaveSearchSubscription(
    value: searchSubscription
  ): Promise<searchSubscription | boolean> {
    try {
      const sumOfSub = await searchSubscriptionModel.find({});
      
      if (sumOfSub.length >= 3) {
        return false;
      }
      const response = await searchSubscriptionModel.create(value);
      console.log(value);

      return response;
    } catch (error) {
      throw error
    }
  }





  async RgetAllSearchSubscription(): Promise<searchSubscription[]> {
    try{
    const response = await searchSubscriptionModel.find();

    return response;
    }catch(error){
      throw  error
    }
  }


  async RgetAllPaymentSubscription(): Promise<SubscriptionArray[] | null> {


    try{
    const response: SubscriptionArray[] | null = await paymentSummaryModel.find(
      {}
    );

    if (!response) {
      return null;
    }

    return response;
  }catch(error){
    throw error
  }
  }



  async RgetDashboard(): Promise<ResponseData> {
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
            $lte: now,
          },
        },
      },

      {
        $group: {
          _id: null,
          totalSum: { $sum: "$price" },
        },
      },
    ]);

    // ])

    console.log("get atotal amount", totalAmountDaily);

    // get users count

    const countAlluser = await UserModel.countDocuments({});

    // get count of order

    const countPayment = await paymentSummaryModel.countDocuments({});

    // get count of reports

    const countReport = await reportModel.countDocuments({});

    // getCountOfusers joined  Weekely

    // Calculate the date one week ago
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Aggregation pipeline
    const usersJoinedDaily = await locationModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: oneWeekAgo, // Greater than or equal to one week ago
            $lte: now, // Less than or equal to now
          },
        },
      },

      {
        $project: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },

      {
        $group: {
          _id: "$day",
          count: { $sum: 1 },
        },
      },

      {
        $sort: { _id: 1 },
      },
    ]);
    console.log("aggggggggggggggggggggg resuleeeeeeee");
    console.log(usersJoinedDaily);

    const results = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split("T")[0];

      // Find the count for this date or use 0 if not found
      const dayData = usersJoinedDaily.find((item) => item._id === dateString);
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
            $lte: now, // Less than or equal to now
          },
        },
      },

      {
        $project: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },

      {
        $group: {
          _id: "$day",
          count: { $sum: 1 },
        },
      },

      {
        $sort: { _id: 1 },
      },
    ]);

    console.log("subsssssssssssssssssssssss");
    console.log(usersSubscribedDaily);

    const resultsOfSubscribed = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split("T")[0];

      // Find the count for this date or use 0 if not found
      const dayData = usersSubscribedDaily.find(
        (item) => item._id === dateString
      );
      resultsOfSubscribed.push({
        date: dateString,
        count: dayData ? dayData.count : 0,
      });
    }

    resultsOfSubscribed.reverse();

    console.log("User Joined Count by Day for the Last Week:");
    console.log("first");
    console.log(totalAmountDaily);
    console.log("second");
    console.log(countAlluser);
    console.log("third");
    console.log(countPayment);
    console.log("fourth");
    console.log(results);
    console.log("fifth");
    console.log(resultsOfSubscribed);
    console.log("last");
    console.log(countReport);
    console.log("ppp");

    console.log(
      totalAmountDaily,
      countAlluser,
      countPayment,
      countReport,
      results,
      resultsOfSubscribed
    );

    return {
      totalAmountDaily,
      countAlluser,
      countPayment,
      countReport,
      results,
      resultsOfSubscribed,
    };
  }




  async RgetOneSubscriptionDetails(
    id: string
  ): Promise<SubscriptionType | null> {

    try{
    const response = await paymentSummaryModel.findById(id);
   
    return response as SubscriptionType | null;
    }catch(error){
      throw error
    }
  }



  async RgetCurrentSearchSubscription(
    id: string
  ): Promise<searchSubscription | null> {
    
    try{
    const response = await searchSubscriptionModel.findById(id);
    

    return response as searchSubscription | null;

    }catch(error){
      throw error
    }
  }



  async RupdateSearchSubscription(
    value: searchSubscription,
    id: string
  ): Promise<searchSubscription | null> {
  
    try{

    const response = await searchSubscriptionModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: value.name,
          maxCount: value.maxCount,
          price: value.price,
          timePeriod: value.timePeriod,
          imageUrl: value.imageUrl,
        },
      },
      {
        new: true,
      }
    );

    
    return response;

  }catch(error){
    throw error
  }
  }

  async RdeleteSearchSubscription(
    id: string
  ): Promise<searchSubscription | null> {
   
    try{

    const response = await searchSubscriptionModel.findByIdAndDelete(id);



    return response;
    }catch(error){
      throw error
    }
  }
}
