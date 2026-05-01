import { Pool } from 'pg';
import { ISubscriptionQueryRepository } from '../../domain/repositories/ISubscriptionQueryRepository';
import { SubscriptionReadModel } from '../../application/read-models/SubscriptionReadModel';

export class PostgresSubscriptionQueryRepository implements ISubscriptionQueryRepository {
  constructor(private readonly db: Pool) {}

  async findByEmail(email: string): Promise<SubscriptionReadModel[]> {
    const result = await this.db.query<SubscriptionReadModel>(
      `SELECT
        s.email,
        s.repo_name AS repo,
        s.is_confirmed AS confirmed,
        r.last_seen_tag
       FROM subscriptions s
       JOIN repositories r ON s.repo_name = r."name"
       WHERE s.email = $1`,
      [email],
    );

    return result.rows;
  }
}
