import { Router } from "express";
import { subscribeController } from "../../infrastructure/config/composition.root";

export const subscribeRouter = Router();

subscribeRouter.post("/", (req, res) => subscribeController.subscribeRepo(req, res));
