import { NextFunction, Request, Response } from "express";

import { IUserInteractor } from "../interfaces/user/IUserInteractor";


import { INTERFACE_TYPE } from "../utils/appConst";

const { OAuth2Client } = require('google-auth-library');

import axios from "axios";
import dotenv from "dotenv"

import { accessToken ,refreshToken} from "../services/jwtService";
dotenv.config();

import {v2 as cloudinary} from 'cloudinary';
import randomstring from 'randomstring';

import sendEmail from "../utils/nodeMailer";
import { emit } from "process";

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
      console.log("vanu")
      const input = req.body;

      const { Accesstoken, data, RefreshToken } =
        await this.interactor.createUser(input);

      // if(!data){
      //     console.log("dfhfsiijjjjjjjjjjjj")

      //     return res.json({message:"already  used"}).status(304)
      // }

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
        return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
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

      let id= req.cookies['jwt']; 
      const {userName ,userId}= req.body;
      console.log("888888888888888888888888888888888888888888888888888888888888888888888888")
      console.log(id,userName)
      if(!id){
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const accesstoken= await this.interactor.refreshToken(id,userName,userId);
      console.log("reeeeeeeeeeeeefreshhhhhhhhhhhhhhhhhhhh tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      console.log(accesstoken)
      res.status(200).json({data:accesstoken})
    } catch (error) {
      console.log("error aneee")
      console.log(error);
      return  res.status(401).json({message:"oops"})
      
    }
  }

  async onLoginUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async onFindUser(req: Request, res: Response, next: NextFunction) {
    try {
      // await this.interactor.findUser()
      const body = req.body;

      console.log("herereeeeee");
      console.log(body);

      const data = await this.interactor.IfindUser(body);
      console.log("response")
           console.log(data)
           console.log("oiooioio")
      return res.json({data}).status(200)
      
    } catch (error) {
      console.log(error);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try{
    console.log("hereee")
    console.log(process.env.CLIENT_ID)
    let CLIENT_ID=process.env.CLIENT_ID
    let REDIRECT_URI=process.env.REDIRECT_URI
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    console.log(REDIRECT_URI)
    console.log(CLIENT_ID)
    
    res.redirect(url);
    }catch(error){
      console.log(error)
    }
  }

  async googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    console.log("iveide aneee okk")
    const { code } = req.query;
    try {
      //  Exchange authorization code for access token
 console.log("ivide onnn anee")
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
        console.log(error);
        return res.json({message:"please create an google account"})
      
    }
  }


  async findEmail(req:Request,res:Response,next:NextFunction){
    console.log("am hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const {email}=req.body

    console.log(email)
    const isThere=await this.interactor.IcheckEmail(email)
    return res.json({status:isThere})




  }


  async googleLogin(req:Request,res:Response,next:NextFunction){
 
    const { idToken,email,username}=req.body

    console.log("vansdfsfsdfs333333333333333333333333333333333333333333333333333333333333333333333333333333d")
    try{

      const ticket=await client.verifyIdToken({
        idToken:idToken,
        audience:CLIENT_ID
      })


    

      

    let {data,Accesstoken,RefreshToken}=await this.interactor.IgoogleLogin(email)



      const userData = {
        _id: data._id,
        userName: data.userName,
        role: data.role,
        email:data.email,
        status:data.status
      };
      if(!userData.status){
        return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
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


      // return res.json({message:"Login SucessFully",token:generateToken})



    }catch(error){
      console.log("bjbjhb")
      console.log(error)
    }


  }


  async login(req:Request,res:Response,next:NextFunction){


    const {email,pasword}=req.body
    console.log("vanu")


    console.log(email,pasword)

    let  {ifUser,AccessToken,RefreshToken} =await this.interactor.IuserLogin(email,pasword)
       console.log("poyiiii")
    if(ifUser){
    
    const userData = {
      _id: ifUser._id,
      userName: ifUser.userName,
      role: ifUser.role,
      email:ifUser.email,
      status:ifUser.status
    }; 
     let role=['user']

    if(!role.includes(userData.role)){
      return res.status(402).json({message:"not acces to this route"}) 
    }
    if(!userData.status){
      return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
    }
    



    res.cookie("jwt", RefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log('acess tokennnnnnnnnnnnnnnnadsfsdfsdfsd')
  console.log(AccessToken)
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



  

  // async getAllUsers(req:Request,res:Response,next:NextFunction){
  //    console.log("yes")
  //   let users=await this.interactor.Igetusers()

  //   console.log("sodfjso")
  //   console.log(users)
  //   return res.json({data:users})
  // }


  async uploadProfileUser(req:Request,res:Response,next:NextFunction){

    try{
   console.log("vanuunu")
   console.log(req.body)
   console.log(req.file)
   if(req.file){
    
   const result = await cloudinary.uploader.upload(req.file.path , {
    folder:'/nearbychat'
    });
    console.log("am    33333333333333333333333333333333333333333333333333333333333333333333333            hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
 console.log(result)

if(result){
 return res.json({status:true,result})
}
return res.json({status:false})
}


   

    }catch(error){
      console.log(error)
    }

  }



  async userStatus(req:Request,res:Response,next:NextFunction){


    let userId:string=req.params.id

    let response=await this.interactor.IuserStatus(userId)
             console.log("statussssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
             console.log(response)
    return  res.json({status:response})

  }

  async saveLocation(req:Request,res:Response,next:NextFunction){

    let {longitude,latitude,userId}=req.body

    const response=await this.interactor.IsaveLocation(longitude,latitude,userId)




  }



  async sendOtp(req:Request,res:Response,next:NextFunction){


    const { email } = req.query
    console.log(email)

    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email' });
    }

    function generateOTP() {
      return randomstring.generate({
          length: 4,
          charset: 'numeric'
      });
  }

    const otp:string = generateOTP();

    const response=await this.interactor.IsendOtp(email,otp)
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    console.log(response)

    interface MailOptions {
      from: string;
      to: string;
      subject: string;
      text: string;
  }

     const mailOptions: MailOptions = {
           from: 'nearByChat@gmail.com',  // Change this to your email
           to: `${response.email}`,  // Change this to the recipient's email
           subject: `${response.otp}`,
          text: 'Hello, this is a test email.',
         };

    sendEmail(mailOptions)
       console.log("otp          hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(otp)


    

  }


  async verifyOtp(req:Request,res:Response,next:NextFunction){

    const { email, otp} = req.query;
    console.log(email,otp)
    console.log("verifyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy 0ooooooooooooooooooooooooooooooooooooooooooooooooooo")

    const response=await this.interactor.IverifyOtp(email as string,otp as string)
    console.log("resulttttttttttttttttttttttttttttttttttttttttttt")

    console.log(response)

    return res.json({response:response})


  }



  async editUserDetails(req:Request,res:Response,next:NextFunction){
           

    console.log("edittttttttttttt userrrrrrrrrrrrrr detailllllllllllllll")
    console.log(req.body)
    const {userName,dob,gender,userId}=req.body
  console.log(userName,dob,gender,userId)
    const response=await this.interactor.IeditUserDetails(userId,userName,dob,gender)

    return res.json({status:true})

  }



  async onGetOrderSummary(req:Request,res:Response,next:NextFunction){

    const userId:string=req.params.id
    console.log("vanu")
    console.log(userId)


    const response=await this.interactor.IgetOrderSummary(userId)
     
    console.log("ressssssssssssssssssssssssssss")
    console.log(response)

    return res.json({data:response})
  }
  

  async onChangePassword(req:Request,res:Response,next:NextFunction){
     
    const {password,userId}=req.body


    const response=await this.interactor.IchangePassword(userId,password)

    return res.json({status:true})

  }
}
