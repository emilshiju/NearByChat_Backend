import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ error: err });
};

export default errorHandler;
