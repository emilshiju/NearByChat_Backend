import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";


import dotenv from "dotenv"
import { decoded } from "../entities/user";

dotenv.config();

export const accessToken = (userName: string, email: string,id:ObjectId) => {
  const secretOrPrivateKey: Secret = process.env.ACCESS_TOKEN_SECRET || "ejiofheoihfoiehofheiofhejrhfoh";

  const token = jwt.sign(
    {
      username: userName,
      email: email,
      id:id
    },
    secretOrPrivateKey,
    { expiresIn: "5d" }
  );

  console.log("ccreating creatn creaitn creaitn creta ty token token token otken eotne token")
  console.log(token)
  return token;
};

export const verifyRefreshToken = (
  input: string,
  username: string,
  userId:string
 
): Promise<string > => {

  const secret: Secret = process.env.REFRESH_TOKEN_SECRET || "SUFHSIUFHISDHFSHFKWEHFUEWH";

  return new Promise((resolve, reject) => {
    jwt.verify(input, secret, async (err) => {
      if (err) {
        reject(err); // Return error if verification fails
      } else {
        const secretOrPrivateKey: Secret = process.env.ACCESS_TOKEN_SECRET || "ejiofheoihfoiehofheiofhejrhfoh";

        const token = await jwt.sign(
          {
            username: username,
            id:userId
          },
          secretOrPrivateKey,
          { expiresIn: "10d" }
        );

        resolve(token); 
      }
    });
  });


};



export const refreshToken = (username: string,id:ObjectId) => {

        
  const secretOrPrivateKey: Secret = process.env.REFRESH_TOKEN_SECRET || "SUFHSIUFHISDHFSHFKWEHFUEWH";
  const token = jwt.sign(
    {
      username: username,
      id:id
    },
    secretOrPrivateKey,
    { expiresIn: "10d" }
  );
  console.log(token)
  return token;
};










type AccessTokenSecret = string | undefined;

interface CustomRequest extends Request {
  user?: decoded
}


export const verifyAccesToken=(req:CustomRequest,res:Response,next:NextFunction)=>{
  
  try{
    const authHeader = req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1]
   
 
    if (!token) {
     

      return res.status(401).json({ message: 'Unauthorized' });
    }

  
    const secretOrPrivateKey: AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "ejiofheoihfoiehofheiofhejrhfoh";
   
    jwt.verify(token, secretOrPrivateKey,(err:any,decoded:any)=>{


      
      if(err){
        console.log(err)
        return res.status(401).json({message:'Unauthorized'})
      }
  
    
      req.user=decoded 

      next()
    }
    
  );



  }catch(error){
  

    next(error)


  }
}



