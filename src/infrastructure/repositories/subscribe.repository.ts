import { Pool } from "pg";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subscription";

export class PostgresSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: Pool) {}
   async exists(repo: string,email:string): Promise<boolean> {
      const query = await this.db.query(`
        SELECT * FROM subscriptions s
        WHERE s.repo_name = $1
        AND s.email = $2
      `, [repo,email]);
      if(query.rowCount === 0){
        return false //add repo if dont exists
      }
      return true
    }
  async saveSubscription(subscription: Subscription, token: string) {
      const result = await this.db.query(`
        INSERT INTO subscriptions (email, repo_name,token,is_confirmed) 
        VALUES ($1, $2, $3,false)
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `, [subscription.email, subscription.repo, token]);
      if (result.rowCount === 0) {
        return false;
      }
      return true;
  }
    async newRepo(repo:string): Promise<boolean> {
        const result = await this.db.query(`SELECT r.name FROM repositories r WHERE r.name = $1`,[repo]);
        if (result.rowCount === 0){
            await this.db.query(`INSERT INTO repositories (name) VALUES ($1)`,[repo]);
        }
        return true
    }
}
