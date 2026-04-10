import { Pool } from "pg";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subscription";
import { DatabaseError } from "../../domain/error";

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: Pool) {}

  async addRepo(repo: string) {
    try {
      const insertRepoQuery = `
        INSERT INTO repositories (name) 
        VALUES ($1) 
        ON CONFLICT (name) DO NOTHING;
      `;
      //if i decide to show clear pg i add a property $ to defend query from sql injection
      await this.db.query(insertRepoQuery, [repo]);
      return true;
    } catch (error) {
      throw new DatabaseError("Error in database");
    }
  }
  async save(subscription: Subscription) {
    try {
      const insertSubQuery = `
        INSERT INTO subscriptions (email, repo_name) 
        VALUES ($1, $2) 
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `;
      const result = await this.db.query(insertSubQuery, [subscription.email, subscription.repo]);
      if (result.rowCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new DatabaseError("Error in database");
    }
  }
}
