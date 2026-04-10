import { Pool } from "pg";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subscription";
import { DatabaseError, DomainError } from "../../domain/error";

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
  async saveSubscription(subscription: Subscription) {
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

  async saveToken(email:string,token:string){
    try {
      const insertSubQuery = `
        INSERT INTO subscriptions (token) 
        VALUES ($1)
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `;
      const result = await this.db.query(insertSubQuery,[email,token])
      if(result.rowCount === 0){
        throw new DomainError("Error in database")
      }
      return true
    } catch (error) {
      throw new DatabaseError("Error in database");
    }
  }
}
