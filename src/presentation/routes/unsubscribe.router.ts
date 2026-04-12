import { Router } from "express";
import { unsubscribeController } from "../../infrastructure/config/composition.root";

export const unsubscribeRouter = Router();
unsubscribeRouter.get("/:token", (req, res) => unsubscribeController.deleteSubscribe(req, res));
