
import { Request,Response } from "express";
import { SubscribeService } from "../../application/services/subscribe.service";
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  async subscribeRepo(req:Request, res:Response) {
    try {
      const { email, repo } = req.body; 
      const subscribe = this.subscribeService.createSubscribe(email, repo);
      if(!subscribe){
        throw new Error("error while subscribe");
      }
    } catch (error) {
        console.log(error)
    }
  }
}
