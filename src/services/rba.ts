import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { UserRepository } from "../repositories/userRepository";
import { userListRepository } from "../repositories/admin/userListRepository";
import { INTERFACE_TYPE } from "../utils/appConst";

import { IUserRepository } from "../interfaces/user/IUserRepository";

// import { container } from "../routes/userRoute";


// const userRepo=container.get<IUserRepository>(INTERFACE_TYPE.UserRepository)

const userRepo=new  UserRepository()


interface CustomRequest extends Request {
    user?: any; // You can replace 'any' with a more specific type if you know the shape of 'user'
  }
  

 

export const checkRole=(roles:string[])=>async(req:CustomRequest,res:Response,next:NextFunction)=>{

    let decoded=req.user
    console.log(decoded)
    console.log("decoedddddddddddddddddd")

    const ans=await userRepo.RoleBasedAuthentication(decoded.id)
    console.log(ans)
  console.log("Kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
   if(roles.includes(ans?.role)){
    console.log("0000000000")
    next()

    }else{
      console.log("nnnnnnnnnnnnnnnnnnnnnnn")
      return res.status(402).json({message:"not acces to this route"}) 
    }

    


}









