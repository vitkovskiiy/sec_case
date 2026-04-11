
import { Request,Response } from "express";
import { SubscribeService } from "../../application/services/subscribe.service";
import { AlreadySubscribedError, DomainError, RepositoryNotFoundError, SyntaxError } from "../../domain/error";
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  async subscribeRepo(req:Request, res:Response) {
    try {
      const { email, repo } = req.body; 
      const subscribe = await this.subscribeService.createSubscribe(email, repo);
      res.status(200).json({message: "Subscription successful. Confirmation email sent."})
    } catch (error) {
        console.log(error);
        if(error instanceof DomainError){
          res.status(400).json(error.message)
        }
        if(error instanceof RepositoryNotFoundError){
          res.status(404).json({message:"Repository not found on GitHub"})
        }
        if(error instanceof AlreadySubscribedError){
          res.status(409).json({message:"Email already subscribed to this repository"})
        }
        
        
    }
  }
}
