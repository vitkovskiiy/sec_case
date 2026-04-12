import { Router } from "express";
import { metricsController } from "../../infrastructure/config/composition.root";
export const metricsRouter = Router();

metricsRouter.get("/", (req, res) => metricsController.handle(req, res));