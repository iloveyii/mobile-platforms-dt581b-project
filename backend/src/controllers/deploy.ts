import { Request, Response, NextFunction } from "express";
import { exec } from "child_process";

// @desc   Get a Model
// @route  GET /api/v1/deploys
export const getDeploys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).send({
    success: true,
    msg: "You successfully accessed route - GET /api/v1/deploys",
  });
};

// @desc   Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/Deploys
export const createDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  exec("../../../deploy/deploy.sh", (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`); // test 2
  });

  return res.status(200).send({
    success: true,
    msg: "You successfully accessed route - POST /api/v1/deploys",
  });
};
