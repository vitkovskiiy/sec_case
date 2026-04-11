import { Router } from "express";
import { findController } from "../..";
export const findRouter = Router();

findRouter.get('/',(req,res) => findController.findByEmail(req,res))

