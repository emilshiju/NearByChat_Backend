import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";


import dotenv from "dotenv"

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
 
): Promise<string | null> => {

  const secret: Secret = process.env.REFRESH_TOKEN_SECRET || "SUFHSIUFHISDHFSHFKWEHFUEWH";

  return new Promise((resolve, reject) => {
    jwt.verify(input, secret, async (err, decoded) => {
      if (err) {
        reject(err); // Return error if verification fails
      } else {
        const secretOrPrivateKey: Secret = process.env.ACCESS_TOKEN_SECRET || "";

        const token = await jwt.sign(
          {
            username: username,
            id:userId
          },
          secretOrPrivateKey,
          { expiresIn: "10d" }
        );

        resolve(token); // Return the signed token
      }
    });
  });


};



export const refreshToken = (username: string,id:ObjectId) => {

            console.log("refereshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
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









// Define a type for your access token secret
type AccessTokenSecret = string | undefined;

interface CustomRequest extends Request {
  user?: any; // You can replace 'any' with a more specific type if you know the shape of 'user'
}


export const verifyAccesToken=(req:CustomRequest,res:Response,next:NextFunction)=>{
  
  try{
    const authHeader = req.headers['authorization'];
    let token=authHeader && authHeader.split(' ')[1]
   
 
    if (!token) {
     

      return res.status(401).json({ message: 'Unauthorized' });
    }

  
    const secretOrPrivateKey: AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
   
    jwt.verify(token, secretOrPrivateKey,(err:any,decoded:any)=>{


      
      if(err){
        console.log(err)
        return res.status(401).json({message:'Unauthorized'})
      }
      console.log("ivide ane decoed decoed  11111111111111111111111111111111111111111111111111111111111111111111                              decoed 99999999999999999999999999999999999999")
      console.log(decoded)
    
      req.user=decoded 

      next()
    }
    
  );



  }catch(error){

  }
}



