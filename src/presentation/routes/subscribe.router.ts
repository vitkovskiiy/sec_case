import { Router } from "express";
import { subscribeController } from "../../index";

const router = Router();

router.post('/',subscribeController.subscribeRepo(req,res))

export default router;
