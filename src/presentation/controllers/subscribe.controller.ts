import { Request, Response } from "express";
import { SubscribeService } from "../../application/services/subscribe.service";
import { AlreadySubscribedError, DomainError, RepositoryNotFoundError } from "../../domain/errors/error";
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  async subscribeRepo(req: Request, res: Response) {
    try {
      const { email, repo } = req.body;
      await this.subscribeService.createSubscribe(email, repo);
      res.status(200).json({ message: "Subscription successful. Confirmation email sent." });
    } catch (error) {
      console.log(error);
      if (error instanceof DomainError) {
        res.status(400).json({ message: "Invalid input (e.g., invalid repo format)" });
      }
      if (error instanceof RepositoryNotFoundError) {
        res.status(404).json({ message: "Repository not found on GitHub" });
      }
      if (error instanceof AlreadySubscribedError) {
        res.status(409).json({ message: "Email already subscribed to this repository" });
      }
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
