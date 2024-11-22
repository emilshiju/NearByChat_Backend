
import "reflect-metadata";

import { IUserInteractor } from "../../interfaces/user/IUserInteractor";
import { IUserRepository } from "../../interfaces/user/IUserRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { User,findUser, googleLoginInterface, userList, userOtp } from "../../entities/user";
import bcrypt from 'bcrypt';

import Joi, { Err, string } from 'joi';
import { accessToken,refreshToken, verifyRefreshToken } from "../../services/jwtService";
import { NullExpression, Schema } from "mongoose";
import { response } from "express";
import { SubscriptionType } from "../../entities/searchSubscription";
import { MyObject } from "../../entities/locationDetails";



export class UserInteractor implements IUserInteractor{
    private repository:IUserRepository;
    
    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async createUser(input:User) {
         let {userName,dob,gender,email,password}=input


         const schema=Joi.object({
            userName:Joi.string().min(3).max(39).required(),
            dob: Joi.date().iso().required(),
            gender: Joi.string().valid('male', 'female', 'other').required(),
            email: Joi.string().email().required(),
           password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
          })
          

        
const SALT_ROUNDS = 10;
           console.log(SALT_ROUNDS)
           console.log(password)
          password = await bcrypt.hash(password, SALT_ROUNDS);

          
        const data:userList=await this.repository.create({userName,dob,gender,email,password})

       
        const Accesstoken:string=await  accessToken(data.userName,data.email,data._id)
       
        const RefreshToken:string=await refreshToken(data.userName,data._id)
        console.log(Accesstoken)
    
       console.log("here        token        toe toenm ekjsefhiusfjosd fjdsiojp           have            aces ")
        
       return   {data,Accesstoken,RefreshToken}
    }


    





     async refreshToken(id:string,username:string,userId:string): Promise<string> {
           
       
       
           const token =await verifyRefreshToken(id,username,userId)

           console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
           console.log(token)
           return token

        
        
    }


     async IfindUser(input:findUser): Promise<MyObject[]> {

     console.log("a m hereeeeeeeeeeeee at inteeeeteractor rrrrrrrrrrr")
     
        const users=await this.repository.findUser(input)
        
        return users

    }

   async  IcheckEmail(input: string): Promise<boolean> {
            
         let userIsThere= await this.repository.RfindEmail(input)

        return userIsThere
    }




    async IuserLogin(email:string,password:string){
     console.log(" i suer login")
     console.log(email)

        let ifUser:any=await this.repository.RuserLogin(email,password)

        if(ifUser){
          

            const AccessToken=await  accessToken(ifUser.userName,ifUser.email,ifUser._id)
        const RefreshToken=await refreshToken(ifUser.userName,ifUser._id)

        
       return   {ifUser,AccessToken,RefreshToken}

        }

        return false

    }







     async IgoogleLogin(email: string): Promise<googleLoginInterface|null> {
        

        const data:userList|null=await this.repository.RgoogleLogin(email)

        if(!data){
            return null
        }

        const  Accesstoken:string=await accessToken(data.userName,email,data._id)
      const RefreshToken:string=await refreshToken(data.userName,data._id)

      return {data,Accesstoken,RefreshToken}

    }
    
    async IuserStatus(userId: string): Promise<boolean> {

        let response=await this.repository.RuserStatus(userId)
        return response
    }

     async IsaveLocation(longitude: number, latitude: number,userId:string): Promise<boolean> {

        let response=await this.repository.RsaveLocation(longitude,latitude,userId)

        return response
        
    }
    
    async IsendOtp(email: string, otp: string): Promise<userOtp> {
        console.log(" send  otpppppppppppppppppppp",email,otp)
        let response=await this.repository.RsendOtp(email,otp)
        console.log("yes")
        return response
        
    }

    async IverifyOtp(email: string, otp: string): Promise<Boolean> {
        console.log("verifyfyyyyyyyyyyyyyy otpppppppppppppppppppppppppppp")

        let response=await this.repository.RverifyOtp(email,otp)
        return response
        
    }


    async IeditUserDetails(userId:string,userName: string, dob: string, gender: string): Promise<userList|null> {
        
        const response=await this.repository.ReditUserDetails(userId,userName,dob,gender)
        
        return response
    }


    async IgetOrderSummary(userId: string): Promise<SubscriptionType[]|null> {
        
        const response=await this.repository.RgetOrderSummary(userId)
        if(!response){
            return null
        }

        return response
    }




  async IchangePassword(userId:string,password: string): Promise<userList|null> {
    
const SALT_ROUNDS = 10;

    password = await bcrypt.hash(password, SALT_ROUNDS);


      
    const response=await this.repository.RchangePassword(userId,password)

    return response
    
  }
    

}





