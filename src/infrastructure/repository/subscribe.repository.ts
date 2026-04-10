import { Pool } from "pg";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subsciption";


export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: Pool) {}

  async addRepo(repo: string) {
    try {
      const insertRepoQuery = `
        INSERT INTO repositories (name) 
        VALUES ($1) 
        ON CONFLICT (name) DO NOTHING;
      `;
       //property $1 defend from sql injection
      await this.db.query(insertRepoQuery, [repo]);
      return true
    } catch (error) {
      return false
    }
  }
  async save(subsciption:Subscription) {
    try {
      const insertSubQuery = `
        INSERT INTO subscriptions (email, repo_name) 
        VALUES ($1, $2) 
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `;
      const result = await this.db.query(insertSubQuery, [subsciption.email, subsciption.repo]);

      if (result.rowCount === 0) {
        return false;
      }

      return true;
    } catch (error) {
      return false
    }
  }
}
