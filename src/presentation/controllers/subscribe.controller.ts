import { Request, Response } from 'express';
import { SubscribeCommandHandler } from '../../application/commands/subscribe/SubscribeCommandHandler';
import { SubscribeCommand } from '../../application/commands/subscribe/SubscribeCommand';
import { AlreadySubscribedError, DomainError, RepositoryNotFoundError } from '../../domain/errors/error';

export class SubscribeController {
  constructor(private readonly handler: SubscribeCommandHandler) {}

  async subscribeRepo(req: Request, res: Response): Promise<void> {
    try {
      const command = new SubscribeCommand(req.body.email, req.body.repo);
      await this.handler.execute(command);
      res.status(200).json({ message: 'Subscription successful. Confirmation email sent.' });
    } catch (error) {
      if (error instanceof AlreadySubscribedError) {
        res.status(409).json({ message: 'Email already subscribed to this repository' });
        return;
      }
      if (error instanceof RepositoryNotFoundError) {
        res.status(404).json({ message: 'Repository not found on GitHub' });
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
