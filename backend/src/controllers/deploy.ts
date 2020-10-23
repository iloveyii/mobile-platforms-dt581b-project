import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
// @desc   Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/Deploys
export const createDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deploy received :", req.body);
};
