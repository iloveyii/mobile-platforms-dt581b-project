import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Door from "../models/Door";


const database = new Database("rdigital");

// @desc   Get all from Model
// @route  GET /api/v1/doors
export const getDoors = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Door(undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/doors/:id
export const getDoor = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Door( req.body);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createDoor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Door received :", req.body.door);
    const model = new Door( req.body);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/door
export const updateDoor = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Door( req.body);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/door
export const deleteDoor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Deleting record from doors with id ", req.params.id);
    const model = new Door( req.body);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
