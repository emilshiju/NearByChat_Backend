import { NextFunction, Request, Response } from "express";

import { UserRepository } from "../repositories/user/userRepository";

import { decoded, userList } from "../entities/user";

const userRepo = new UserRepository();

interface CustomRequest extends Request {
  user?: decoded;
}

export const checkRole =
  (roles: string[]) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const decoded = req.user;
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ans: userList | null = await userRepo.RoleBasedAuthentication(
      decoded.id
    );

    if (!ans) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (roles.includes(ans?.role)) {
      next();
    } else {
      return res.status(402).json({ message: "not acces to this route" });
    }
  };
