import { Pool } from "pg";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subscription";
import { DatabaseError, DomainError } from "../../domain/errors/error";

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: Pool) {}
  private async ensureRepoExists(repo: string): Promise<void> {
    try {
      const query = `
        INSERT INTO repositories (name) 
        VALUES ($1) 
        ON CONFLICT (name) DO NOTHING;
      `;
      await this.db.query(query, [repo]);
    } catch (error) {
      console.error("Ошибка при создании репозитория:", error);
      throw new DatabaseError("Error creating repository record");
    }
  }
  async saveSubscription(subscription: Subscription, token: string) {
    try {
      await this.ensureRepoExists(subscription.repo);
      const insertSubQuery = `
        INSERT INTO subscriptions (email, repo_name,token,is_confirmed) 
        VALUES ($1, $2, $3,false)
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `;
      const result = await this.db.query(insertSubQuery, [subscription.email, subscription.repo, token]);
      if (result.rowCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new DatabaseError("Error in database");
    }
  }
}
