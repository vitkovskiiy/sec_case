import { Router } from "express";
import { tokenController } from "../../infrastructure/config/composition.root";

export const tokenRouter = Router();

tokenRouter.get("/:token", (req, res) => tokenController.validateToken(req, res));
