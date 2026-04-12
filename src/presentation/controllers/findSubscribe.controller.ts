import { Request, Response } from "express";
import { IFindService } from "../../domain/interfaces/IFindService";
import { DomainError } from "../../domain/errors/error";

export class FindController {
  constructor(private readonly findService: IFindService) {}

  async findByEmail(req: Request, res: Response) {
    try {
      const email = req.query.email;
      if (!email) {
        throw new DomainError("Email is require!");
      }
      const find = await this.findService.findSubscriptions(email as string);
      res.status(200).json(find);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ message: "Invalid email" });
      }
    }
  }
}
