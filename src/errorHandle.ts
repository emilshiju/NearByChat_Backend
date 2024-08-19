



import { Request, Response, NextFunction } from 'express';


const   errorHandler=((err: any, req: Request, res: Response, next: NextFunction)=>{
  console.log("catchedddddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log(err)
    return res.status(500).json({error:err})

    
})

export default errorHandler