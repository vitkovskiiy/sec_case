import { Router } from "express";
import { tokenController } from "../../index";

export const tokenRouter = Router();

tokenRouter.get('/:token',(req,res) => tokenController.validateToken(req,res))

