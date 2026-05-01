import { ISubscriptionQueryRepository } from '../../domain/repositories/ISubscriptionQueryRepository';
import { SubscriptionReadModel } from '../read-models/SubscriptionReadModel';
import { GetSubscriptionsByEmailQuery } from './GetSubscriptionsByEmailQuery';
import { DomainError } from '../../domain/errors/error';

export class GetSubscriptionsByEmailQueryHandler {
  constructor(private readonly repository: ISubscriptionQueryRepository) {}

  async execute(query: GetSubscriptionsByEmailQuery): Promise<SubscriptionReadModel[]> {
    if (!query.email || !query.email.includes('@')) {
      throw new DomainError('Invalid email format');
    }
    return this.repository.findByEmail(query.email);
  }
}
