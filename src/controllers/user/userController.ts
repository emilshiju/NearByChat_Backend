import { NextFunction, Request, Response } from "express";

import { IUserInteractor } from "../../interfaces/user/IUserInteractor";




const { OAuth2Client } = require('google-auth-library');

import axios from "axios";
import dotenv from "dotenv"


dotenv.config();

import {v2 as cloudinary} from 'cloudinary';
import randomstring from 'randomstring';

import sendEmail from "../../utils/nodeMailer";

import { googleLoginInterface, userOtp } from "../../entities/user";
import { HttpStatusCode } from "../../entities/enums/statusCode";
import { UserRole } from "../../entities/enums/role";

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


let CLIENT_ID=process.env.CLIENT_ID

const client = new OAuth2Client(process.env.CLIENT_ID);



export class UserController {
  private interactor: IUserInteractor;


  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }



  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
     
      const input = req.body;

      const { Accesstoken, data, RefreshToken } =
        await this.interactor.createUser(input);

     

      const userData = {
        _id: data._id,
        userName: data.userName,
        role: data.role,
        email:data.email,
        status:data.status,
        nickName:data.nickName,
        imageUrl:data.imageUrl
      };

      if(!userData.status){
        //    403
        return res.status(HttpStatusCode.FORBIDDEN).json({ error: 'Your account is blocked. Please contact support.' });
      }
      

      res.cookie("jwt", RefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .json({
          message: "succesfully registered",
          data: userData,
          Accesstoken,
        })
        .status(200);


    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {

      const id= req.cookies['jwt']; 
      const {userName ,userId}= req.body;
    
      if(!id){
        // 401 
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      }
      const accesstoken= await this.interactor.refreshToken(id,userName,userId);
     //200
      res.status(HttpStatusCode.OK).json({data:accesstoken})
    } catch (error) {
    
      return  res.status(401).json({message:"oops"})
      
    }
  }

 

  async onFindUser(req: Request, res: Response, next: NextFunction) {
    try {
    
      const body = req.body;

      

      const data = await this.interactor.IfindUser(body);
     
      return res.json({data}).status(200)
      
    } catch (error) {
      next(error)
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try{
  
    const CLIENT_ID=process.env.CLIENT_ID
    const REDIRECT_URI=process.env.REDIRECT_URI
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
   
    
    res.redirect(url);
    }catch(error){
      next(error)
    }
  }

  async googleAuthCallback(req: Request, res: Response, next: NextFunction) {
  
    const { code } = req.query;
    try {
      //  Exchange authorization code for access token

      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      });
      const { access_token, id_token } = data;

      const { data: profile } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { email } = profile;

        const isThere=await this.interactor.IcheckEmail(email)
        if(!isThere){
            return res.json({messaeg:"please create an account here"})
        }

        return res.json({message:"sucessfulyy logined"})




    } catch (error) {
      
        return res.json({message:"please create an google account"})
      
    }
  }


  async findEmail(req:Request,res:Response,next:NextFunction){
    

    try{
    const {email}=req.body

    console.log(email)
    const isThere=await this.interactor.IcheckEmail(email)
    return res.json({status:isThere})
    }catch(error){
      next(error)
    }



  }


  async googleLogin(req:Request,res:Response,next:NextFunction){
 
    const { idToken,email,username}=req.body

    
    try{

      const ticket=await client.verifyIdToken({
        idToken:idToken,
        audience:CLIENT_ID
      })


    

      

    const {data,Accesstoken,RefreshToken}=await this.interactor.IgoogleLogin(email)

     

      const userData = {
        _id: data._id,
        userName: data.userName,
        role: data.role,
        email:data.email,
        status:data.status
      };
      if(!userData.status){
        // 403
        return res.status(HttpStatusCode.FORBIDDEN).json({ error: 'Your account is blocked. Please contact support.' });
      }
      

      res.cookie("jwt", RefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .json({
          message: "succesfully registered",
          data: userData,
          Accesstoken,
        })
        .status(200);



    }catch(error){
     next(error)
    }


  }


  async login(req:Request,res:Response,next:NextFunction){


    const {email,pasword}=req.body
  


    console.log(email,pasword)

    const  {ifUser,AccessToken,RefreshToken} =await this.interactor.IuserLogin(email,pasword)
      
    if(ifUser){
    
    const userData = {
      _id: ifUser._id,
      userName: ifUser.userName,
      role: ifUser.role,
      email:ifUser.email,
      status:ifUser.status
    }; 
    //  let role=['user']

    if(userData.role !== UserRole.USER){
      // 402
      return res.status(HttpStatusCode.NOT_ACESSS).json({message:"not acces to this route"}) 
    }
    if(!userData.status){
      // 403
      return res.status(HttpStatusCode.FORBIDDEN).json({ error: 'Your account is blocked. Please contact support.' });
    }
    



    res.cookie("jwt", RefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

   
    return res
      .json({
        message: "succesfully Logined",
        data: userData,
        AccessToken ,
        status:true
      })
      .status(200);

    }else{

      return res.json({message:"credential not correct",status:false}).status(400)
    }


  }



  

 

  async uploadProfileUser(req:Request,res:Response,next:NextFunction){

    try{
  
   if(req.file){
    
   const result = await cloudinary.uploader.upload(req.file.path , {
    folder:'/nearbychat'
    });
  

if(result){
 return res.json({status:true,result})
}
return res.json({status:false})
}


   

    }catch(error){
     next(error)
    }

  }



  async userStatus(req:Request,res:Response,next:NextFunction){


    try{

    const userId:string=req.params.id

    const response=await this.interactor.IuserStatus(userId)
            
    return  res.json({status:response})
    }catch(error){
      next(error)
    }

  }

  async saveLocation(req:Request,res:Response,next:NextFunction){


    try{

    const {longitude,latitude,userId}=req.body

    await this.interactor.IsaveLocation(longitude,latitude,userId)

    
    return res.json({status:true})
    }catch(error){
      next(error)
    }


  }



  async sendOtp(req:Request,res:Response,next:NextFunction){



    try{

    const { email } = req.query
    

    if (typeof email !== 'string') {
      // 400
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid email' });
    }

    function generateOTP() {
      return randomstring.generate({
          length: 4,
          charset: 'numeric'
      });
  }

    const otp:string = generateOTP();

    const response:userOtp=await this.interactor.IsendOtp(email,otp)
   

    interface MailOptions {
      from: string;
      to: string;
      subject: string;
      text: string;
  }
  console.log("off useeeeeeeeeerrr")
  console.log(response.email)

     const mailOptions: MailOptions = {
           from: 'nearByChat@gmail.com',  // Change this to your email
           to: `${response.email}`,  // Change this to the recipient's email
           subject: `${response.otp}`,
          text: 'Hello, this is a test email.',
         };

    sendEmail(mailOptions)
      
        }catch(error){


          next(error)
        }

    

  }




  async verifyOtp(req:Request,res:Response,next:NextFunction){


    try{

    const { email, otp} = req.query;
    
    const response=await this.interactor.IverifyOtp(email as string,otp as string)
    

    return res.json({response:response})

    }catch(error){
      next(error)
    }


  }



  async editUserDetails(req:Request,res:Response,next:NextFunction){
           


    try{
  
    const {userName,dob,gender,userId}=req.body
 
    await this.interactor.IeditUserDetails(userId,userName,dob,gender)

    return res.json({status:true})

    }catch(error){
      next(error)
    }

  }



  async onGetOrderSummary(req:Request,res:Response,next:NextFunction){


    try{

    const userId:string=req.params.id
   

    const response=await this.interactor.IgetOrderSummary(userId)
   

    return res.json({data:response})

    }catch(error){
      next(error)
    }
  }
  

  async onChangePassword(req:Request,res:Response,next:NextFunction){
     
    try{
      
    const {password,userId}=req.body


   await this.interactor.IchangePassword(userId,password)

    return res.json({status:true})

    }catch(error){
      
      next(error)
    }

  }
  
}
