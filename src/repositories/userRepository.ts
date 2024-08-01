import { injectable } from "inversify";
import { User, findUser } from "../entities/user";
import { IUserRepository } from "../interfaces/user/IUserRepository";

import UserModel from "../frameWorks/mongodb/models/userModel";
import locationModel from "../frameWorks/mongodb/models/userLocation";
import AdminModel from "../frameWorks/mongodb/models/adminModel";
import otpModel from "../frameWorks/mongodb/models/otpModel";
import mongoose from "mongoose";
// import { ObjectId } from "mongoose";

import Joi, { Err, string } from "joi";
import bcrypt from "bcrypt";
import paymentSummaryModel from "../frameWorks/mongodb/models/paymentSummary";
import { response } from "express";

@injectable()
export class UserRepository implements IUserRepository {
  async create({ userName, dob, gender, email, password }: User): Promise<any> {
    const createdUser = await UserModel.create({
      userName,
      dob,
      gender,
      email,
      password,
    });

    console.log("saveddddddddddddddddddddddddddddddddd");
    // createdUser.save()
    // const userObject: User = createdUser.toObject();

    return createdUser;
  }

  async findUser(data: findUser): Promise<any> {
    console.log(data);

    
    let userLocation = await locationModel.findOne({ userId: data.userId });
   
    let r: number = data.radius || 0;
    const maxDistance = (r || 0) * 1000; // convert kilometers to meters
    
 
    // @ts-ignore
    let longitude = userLocation?.location?.coordinates[0] || 0;
    // @ts-ignore
    let latitude = userLocation?.location?.coordinates[1] || 0;

   

    let whoall = await locationModel.find();
    console.log(whoall);

    const nearbyUsers = await locationModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: maxDistance, // max distance in meters
          includeLocs: "dist.location",
          spherical: true,
        },
        
      },
      {
        $lookup: {
          from: "users", // The collection name of the UserModel
          localField: "userId", // The field in locationModel that references the user
          foreignField: "_id", // The field in UserModel that is referenced
          as: "userDetails" // The field to add the populated user details
        }
      },
      {
        $unwind: "$userDetails" // Unwind the array to get individual documents
      },
    ]);

    console.log("ivideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

    console.log(nearbyUsers)

  //   const userIds = nearbyUsers.map((user) => user.userId);
  //  console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
  //   console.log(userIds);

  //   const profileDetails = await UserModel.aggregate([
    
  //     {
  //       $lookup: {
  //         from: "profiles",
  //         localField: "userId",
  //         foreignField: "userId",
  //         as: "profileDetails",
  //       },
  //     },{
  //       $match: {
  //         profileDetails: { $ne: [] },
  //       },
  //     },
  //   ]);
  //   console.log("profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  //   // @ts-ignore
  //   console.log(profileDetails);
  //   for (let i of profileDetails) {
  //     console.log(i.profileDetails);
  //   }

  //   console.log("useressssssssssssssss");
  //   console.log(nearbyUsers);
  //   console.log(nearbyUsers);
    // const id1 = data.userId;
    const id2 = new mongoose.Types.ObjectId(data.userId as unknown as string);
    console.log(id2);
    let nearof = [];
    for (let i of nearbyUsers) {
      
      if (!i.userId.equals(id2)&&i.userDetails.nickName) {
        nearof.push(i);
      }
    }
    console.log("near of  near of near of ");
    console.log(nearof);

    return nearof;
  }

  async RfindEmail(data: string): Promise<boolean> {
    console.log(
      "is theeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    console.log(data);
    //  let email=data.email
    let isThere = await UserModel.findOne({ email: data });
    console.log(isThere);
    if (isThere) {
      return true;
    } else {
      return false;
    }
  }

  async RuserLogin(email: string, password: string): Promise<any> {
    console.log(email);
    let ifUser = await UserModel.findOne({ email: email });
    console.log("ivdie user sdie");
    console.log(ifUser);
    if (ifUser) {
      // let match=await bcrypt.compare(password,ifUser.password)
      // if(match){

      //   return ifUser
      // }

      return ifUser;
    }
    return false;
  }

 

  // async Rgetusers(): Promise<any> {

  //   let allUsers=await UserModel.find()

  //   return allUsers
  // }

  async RgoogleLogin(email: string): Promise<any> {
    let data = await UserModel.findOne({ email: email });

    return data;
  }

  async RuserStatus(userId:string): Promise<boolean> {
    let response = await UserModel.findById(userId);
    if (response?.status) return true;
    else return false;
  }

   async RsaveLocation(longitude: any, latitude: any,userId:any): Promise<any> {
     

    let updated =await locationModel.findOneAndUpdate(
      {userId:userId},
      {
          // $set:{
          //     'location.longitude':data.longitude,
          //     'location.latitude':data.latitude,
          //     radius:radius
          // }
          $set:{
              'location.type': 'Point', // Set GeoJSON type
              'location.coordinates': [longitude, latitude],
         
          }
      },{ upsert: true, new: true } 
      
  )

}


async RsendOtp(email: string, otp: string): Promise<any> {
  
  console.log(email)
  console.log(otp)
  let a=await  otpModel.create({
    email,
    otp
   })

   a.save()
   console.log("000000000000000000000000000000000000")
   console.log(a)

   return a


  
}
      async RverifyOtp(email: string, otp: string): Promise<any> {
        console.log(email,otp)

        const response=await otpModel.findOne({email:email,otp:otp})

        console.log("foujdinggggggggggggggggggggggg")
        console.log(response)

        if(response){
          return true
        }

        return false
  
     }


    async RoleBasedAuthentication(id: mongoose.Schema.Types.ObjectId): Promise<any> {
      console.log("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999")
       console.log(id)
      let ans=await UserModel.findOne({_id:id})

      return ans
     
   }


   async ReditUserDetails(userId:string,userName: string, dob: string, gender: string): Promise<any> {
            
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeeee")

    const date=new Date(dob)
    console.log(date)

  // convert this to date

//     const dateString = '2024-07-04';
// const [year, month, day] = dob.split('-').map(Number); // Convert each part to a number
// const dateObject = new Date(year, month - 1, day); // Month is zero-based
//  console.log(dateObject)

    const resposne=await UserModel.findOneAndUpdate({_id:userId}
      ,
      {
        $set:{
          userName:userName,
          dob:date,
          gender:gender
        }
      },
      {
        new:true
      }
    )

    console.log("resssssssssssssssssssssssssssssss")
    console.log(resposne)


    return resposne


   }




   async RgetOrderSummary(userId: string): Promise<any> {
     
  console.log("get user detailsssssssssssssssssssssssss")
    const response=await paymentSummaryModel.find({userId:userId})

    console.log(response)

    return response
   }


   async RchangePassword(userId:string,password: string): Promise<any> {
     
    console.log("hasheddddddddddd paswwordddddddddddddddddddddddddd")
    console.log(password)

    const respons=await UserModel.findOneAndUpdate({_id:userId},
      {$set:{
        password:password
      }
      }
    )

    return response
   }


     

}



export class userStatus {
  async userStatus(userId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    
    let response = await UserModel.findById(userId);
    console.log("-000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
    console.log(response?.status)
    if (response?.status) return true;
    else return false;
  }


  

  
}


