import { Request, Response } from 'express';
import { ConfirmSubscriptionCommandHandler } from '../../application/commands/confirm/ConfirmSubscriptionCommandHandler';
import { ConfirmSubscriptionCommand } from '../../application/commands/confirm/ConfirmSubscriptionCommand';
import { DomainError, NotFoundToken, SyntaxError } from '../../domain/errors/error';

export class TokenController {
  constructor(private readonly handler: ConfirmSubscriptionCommandHandler) {}

  async validateToken(req: Request, res: Response): Promise<void> {
    try {
      const token = String(req.params.token);
      const command = new ConfirmSubscriptionCommand(token);
      await this.handler.execute(command);
      res.status(200).json({ message: 'Subscription confirmed successfully' });
    } catch (error) {
      if (error instanceof NotFoundToken) {
        res.status(404).json({ message: 'Token not found' });
        return;
      }
      if (error instanceof SyntaxError) {
        res.status(400).json({ message: 'Invalid token' });
        return;
      }
      if (error instanceof DomainError) {
        res.status(400).json({ message: error.message });
        return;
      }
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
