import { Request, Response, NextFunction } from "express";
import { exec } from "child_process";

// @desc   Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/Deploys
export const createDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deploy received :", req.body);

  exec("../deploy/deploy.sh", (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};
