import { Router } from "express";
import { findController } from "../../infrastructure/config/composition.root";
export const findRouter = Router();

findRouter.get("/", (req, res) => findController.findByEmail(req, res));
