import { inject, injectable } from "inversify";
import { IUserInteractor } from "../interfaces/user/IUserInteractor";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User,findUser } from "../entities/user";
import bcrypt from 'bcrypt';

import Joi, { Err, string } from 'joi';
import { accessToken,refreshToken, verifyRefreshToken } from "../services/jwtService";
import { Schema } from "mongoose";
import { response } from "express";


@injectable()
export class UserInteractor implements IUserInteractor{
    private repository:IUserRepository;
    constructor (
        @inject(INTERFACE_TYPE.UserRepository)repository:IUserRepository

    ){
        this.repository=repository  
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
          

        //   const checkEmail=await this.repository.findUser(userName)

        //   console.log(checkEmail)

        //   if(!checkEmail){
            
        //     return false
        //   }
          
const SALT_ROUNDS = 10;
           console.log(SALT_ROUNDS)
           console.log(password)
          password = await bcrypt.hash(password, SALT_ROUNDS);

          
        const data=await this.repository.create({userName,dob,gender,email,password})

        // @ts-ignore
        const Accesstoken=await  accessToken(data.userName,data.email,data._id)
         // @ts-ignore
        const RefreshToken=await refreshToken(data.userName,data._id)
        console.log(Accesstoken)
    
       console.log("here        token        toe toenm ekjsefhiusfjosd fjdsiojp           have            aces ")
        
       return   {data,Accesstoken,RefreshToken}
    }


    





     async refreshToken(id:string,username:string,userId:string): Promise<any> {
           
       
       
           let token =await verifyRefreshToken(id,username,userId)

           console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
           console.log(token)
           return token

        
        
    }


     async IfindUser(input:findUser): Promise<any> {

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

        let ifUser=await this.repository.RuserLogin(email,password)

        if(ifUser){
          

            const AccessToken=await  accessToken(ifUser.userName,ifUser.email,ifUser._id)
        const RefreshToken=await refreshToken(ifUser.userName,ifUser._id)

        
       return   {ifUser,AccessToken,RefreshToken}

        }

        return false

    }



    //  async Igetusers(): Promise<any> {
        
    //     let allUsers=await this.repository.Rgetusers()

    //     return allUsers
    // }



     async IgoogleLogin(email: string): Promise<any> {
        

        let data=await this.repository.RgoogleLogin(email)



        let Accesstoken=await accessToken(data.userName,email,data._id)
      const RefreshToken=await refreshToken(data.userName,data._id)

      return {data,Accesstoken,RefreshToken}

    }
    
    async IuserStatus(userId: string): Promise<boolean> {

        let response=await this.repository.RuserStatus(userId)
        return response
    }

     async IsaveLocation(longitude: any, latitude: any,userId:any): Promise<any> {

        let response=await this.repository.RsaveLocation(longitude,latitude,userId)
        
    }
    
    async IsendOtp(email: string, otp: string): Promise<any> {
        console.log(" send  otpppppppppppppppppppp")
        let response=await this.repository.RsendOtp(email,otp)
        return response
        
    }

    async IverifyOtp(email: string, otp: string): Promise<any> {
        console.log("verifyfyyyyyyyyyyyyyy otpppppppppppppppppppppppppppp")

        let response=await this.repository.RverifyOtp(email,otp)
        return response
        
    }


    async IeditUserDetails(userId:string,userName: string, dob: string, gender: string): Promise<any> {
        
        const response=await this.repository.ReditUserDetails(userId,userName,dob,gender)
        
        return response
    }


    async IgetOrderSummary(userId: string): Promise<any> {
        
        const response=await this.repository.RgetOrderSummary(userId)

        return response
    }




  async IchangePassword(userId:string,password: string): Promise<any> {
    
const SALT_ROUNDS = 10;

    password = await bcrypt.hash(password, SALT_ROUNDS);


      
    const response=await this.repository.RchangePassword(userId,password)

    return response
    
  }
    

}





