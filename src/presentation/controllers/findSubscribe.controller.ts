import { Request, Response } from 'express';
import { GetSubscriptionsByEmailQueryHandler } from '../../application/queries/GetSubscriptionsByEmailQueryHandler';
import { GetSubscriptionsByEmailQuery } from '../../application/queries/GetSubscriptionsByEmailQuery';
import { DomainError } from '../../domain/errors/error';

export class FindController {
  constructor(private readonly handler: GetSubscriptionsByEmailQueryHandler) {}

  async findByEmail(req: Request, res: Response): Promise<void> {
    try {
      const query = new GetSubscriptionsByEmailQuery(req.query.email as string);
      const result = await this.handler.execute(query);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ message: error.message });
        return;
      }
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
