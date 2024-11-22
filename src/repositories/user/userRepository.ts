import { User, findUser, userList, userOtp } from "../../entities/user";
import { IUserRepository } from "../../interfaces/user/IUserRepository";

import UserModel from "../../frameWorks/mongodb/models/userModel";
import locationModel from "../../frameWorks/mongodb/models/userLocation";

import otpModel from "../../frameWorks/mongodb/models/otpModel";
import mongoose from "mongoose";

import paymentSummaryModel from "../../frameWorks/mongodb/models/paymentSummary";

import { SubscriptionType } from "../../entities/searchSubscription";
import { LocationType, MyObject } from "../../entities/locationDetails";

export class UserRepository implements IUserRepository {
  async create({
    userName,
    dob,
    gender,
    email,
    password,
  }: User): Promise<userList> {
    try {
      const createdUser = await UserModel.create({
        userName,
        dob,
        gender,
        email,
        password,
      });

      return createdUser.toObject();
    } catch (error) {
      throw error;
    }
  }

  async findUser(data: findUser): Promise<MyObject[]> {
    try {
      const userLocation: LocationType | null = await locationModel.findOne({
        userId: data.userId,
      });

      const r: number = data.radius || 0;
      const maxDistance = (r || 0) * 1000; // convert kilometers to meters

      const longitude = userLocation?.location?.coordinates[0] || 0;

      const latitude = userLocation?.location?.coordinates[1] || 0;

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
            as: "userDetails", // The field to add the populated user details
          },
        },
        {
          $unwind: "$userDetails", // Unwind the array to get individual documents
        },
      ]);

      const id2 = new mongoose.Types.ObjectId(data.userId as unknown as string);

      const nearof = [];
      for (let i of nearbyUsers) {
        if (!i.userId.equals(id2) && i.userDetails.nickName) {
          nearof.push(i);
        }
      }

      return nearof;
    } catch (error) {
      throw error;
    }
  }

  async RfindEmail(data: string): Promise<boolean> {
    try {
      const isThere = await UserModel.findOne({ email: data });

      if (isThere) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async RuserLogin(
    email: string,
    password: string
  ): Promise<userList | boolean> {
    try {
      const ifUser = await UserModel.findOne({ email: email });

      if (ifUser) {
        return ifUser.toObject();
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async RgoogleLogin(email: string): Promise<userList | null> {
    try {
      const data = await UserModel.findOne({ email: email });

      if (!data) {
        return null;
      }

      return data?.toObject();
    } catch (error) {
      throw error;
    }
  }

  async RuserStatus(userId: string): Promise<boolean> {
    try {
      const response = await UserModel.findById(userId);
      if (response?.status) return true;
      else return false;
    } catch (error) {
      throw error;
    }
  }

  async RsaveLocation(
    longitude: number,
    latitude: number,
    userId: string
  ): Promise<boolean> {
    try {
      await locationModel.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            "location.type": "Point", // Set GeoJSON type
            "location.coordinates": [longitude, latitude],
          },
        },
        { upsert: true, new: true }
      );

      return true;
    } catch (error) {
      throw error;
    }
  }

  async RsendOtp(email: string, otp: string): Promise<userOtp> {
    try {
      const a = await otpModel.create({
        email,
        otp,
      });

      a.save();
      console.log("get user details",a)
      return a.toObject();
      
    } catch (error) {
      throw error;
    }
  }

  async RverifyOtp(email: string, otp: string): Promise<Boolean> {
    try {
      const response = await otpModel.findOne({ email: email, otp: otp });

      if (response) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async RoleBasedAuthentication(
    id: mongoose.Schema.Types.ObjectId
  ): Promise<userList | null> {
    try {
      const ans = await UserModel.findOne({ _id: id });

      if (!ans) {
        return null;
      }
      return ans.toObject();
    } catch (error) {
      throw error;
    }
  }

  async ReditUserDetails(
    userId: string,
    userName: string,
    dob: string,
    gender: string
  ): Promise<userList | null> {
    try {
      const date = new Date(dob);
      console.log(date);

      const resposne: userList | null = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            userName: userName,
            dob: date,
            gender: gender,
          },
        },
        {
          new: true,
        }
      );

      return resposne;
    } catch (error) {
      throw error;
    }
  }

  async RgetOrderSummary(userId: string): Promise<SubscriptionType[]> {
    try {
      const response: SubscriptionType[] = await paymentSummaryModel.find({
        userId: userId,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async RchangePassword(
    userId: string,
    password: string
  ): Promise<userList | null> {
    try {
      const response: userList | null = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            password: password,
          },
        }
      );

      if (response) {
        return response;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export class userStatus {
  async userStatus(userId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    const response = await UserModel.findById(userId);

    if (response?.status) return true;
    else return false;
  }
}
