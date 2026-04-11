
import { Request,Response } from "express";
import { RepositoryNotFoundError, SyntaxError } from "../../domain/error";
import { IUnsubscribeService } from "../../domain/interfaces/IUnsubscribeService";
export class UnsubscribeController {
  constructor(private readonly unsubscribeService: IUnsubscribeService) {}

  async deleteSubscribe(req:Request, res:Response) {
    try {
      const token = req.params.token as string;
      const validateToken = await this.unsubscribeService.deleteSubscribe(token);
      res.status(200).json({message:"Subscription confirmed successfully"});
    } catch (error) {
        console.log(error);
        if(error instanceof SyntaxError){
          res.status(400).json({message:"Invalid token"})
        }
        if(error instanceof RepositoryNotFoundError){
          res.status(404).json({message:"Token not found"})
        }
    }
  }
}
