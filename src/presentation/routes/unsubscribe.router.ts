import { Router } from "express";
import { unsubscribeController } from "../../index";

export const unsubscribeRouter = Router();
unsubscribeRouter.get('/:token',(req,res) => unsubscribeController.deleteSubscribe(req,res))
