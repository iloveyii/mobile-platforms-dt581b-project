import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import User from "../models/User";
import Condition from "../models/base/Condition";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

const token_secret = process.env.TOKEN_SECRET || "this-is-a-secret";

// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const condition = new Condition({ where: { email } });
    const model = new User({ email, password });
    await model.read(condition);
    const response = model.response;
    const user = response.data[0];
    console.log("User at login controller", user);
    if (response.success && (await bcrypt.compare(password, user.password))) {
      // Set jwt token in header
      console.log(
        "Sign token :",
        { id: user.id, email: user.email },
        token_secret
      );
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        token_secret
      );
      return res.status(200).send({
        success: true,
        data: [{ id: user.id, email: user.email, token }],
      });
    } else {
      return res.status(200).send({
        success: false,
        data: [{ email: "Incorrect email or password" }],
      });
    }
  } catch (error) {
    console.log("Error at login ", error);
    return res
      .status(403)
      .send({ success: false, data: [{ server: "Server error" }] });
  }
};
