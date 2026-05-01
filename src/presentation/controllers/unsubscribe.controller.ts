import { Request, Response } from 'express';
import { UnsubscribeCommandHandler } from '../../application/commands/unsubscribe/UnsubscribeCommandHandler';
import { UnsubscribeCommand } from '../../application/commands/unsubscribe/UnsubscribeCommand';
import { DomainError, NotFoundToken, SyntaxError } from '../../domain/errors/error';

export class UnsubscribeController {
  constructor(private readonly handler: UnsubscribeCommandHandler) {}

  async deleteSubscribe(req: Request, res: Response): Promise<void> {
    try {
      const token = String(req.params.token);
      const command = new UnsubscribeCommand(token);
      await this.handler.execute(command);
      res.status(200).json({ message: 'Unsubscribed successfully' });
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
