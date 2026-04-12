import { Request, Response } from "express";
import { NotFoundToken, SyntaxError } from "../../domain/errors/error";
import { ITokenService } from "../../domain/interfaces/ITokenService";
export class TokenController {
  constructor(private readonly tokenService: ITokenService) {}

  async validateToken(req: Request, res: Response) {
    try {
      const token = req.params.token as string;
      const validateToken = await this.tokenService.validateToken(token);
      res.status(200).json({ message: "Subscription confirmed successfully" });
    } catch (error) {
      console.log(error);
      if (error instanceof SyntaxError) {
        res.status(400).json({ message: "Invalid token" });
      }
      if (error instanceof NotFoundToken) {
        res.status(404).json({ message: "Token not found" });
      }
    }
  }
}
