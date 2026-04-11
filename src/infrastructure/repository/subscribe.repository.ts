import { Pool } from "pg";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subscription";
import { DatabaseError, DomainError } from "../../domain/error";

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: Pool) {}

  async saveSubscription(subscription: Subscription,token:string) {
    try {
      const insertSubQuery = `
        INSERT INTO subscriptions (email, repo_name,token,is_confirmed) 
        VALUES ($1, $2, $3,false)
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `;
      const result = await this.db.query(insertSubQuery, [subscription.email, subscription.repo,token]);
      if (result.rowCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new DatabaseError("Error in database");
    }
  }
}
