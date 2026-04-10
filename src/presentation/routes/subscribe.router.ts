import { Router } from "express";
import { subscribeController } from "../../index";

export const subscribeRouter = Router();

subscribeRouter.post('/',(req,res) => subscribeController.subscribeRepo(req,res))

