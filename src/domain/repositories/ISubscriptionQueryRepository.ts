import { SubscriptionReadModel } from '../../application/read-models/SubscriptionReadModel';

export interface ISubscriptionQueryRepository {
  findByEmail(email: string): Promise<SubscriptionReadModel[]>;
}
