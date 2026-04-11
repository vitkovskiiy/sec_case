import { Pool } from "pg";
import { IFindRepository } from "../../domain/interfaces/IFindRepository";
import { SubscriptionDTO } from "../../presentation/dtos/subscriptionDto";
import { DomainError } from "../../domain/error";

export class FindRepository implements IFindRepository {
  constructor(private readonly db: Pool) {}

  async findSubscriptionsByEmail(email: string):Promise<SubscriptionDTO[]> {
    const insertRepoQuery = `
 SELECT 
      s.email, 
      s.repo_name AS repo,          
      s.is_confirmed AS confirmed, 
      r.last_seen_tag            
    FROM subscriptions s
join repositories r 
on s.repo_name = r."name"
where s.email = $1
  `;
    const result = await this.db.query(insertRepoQuery, [email]);
    if (result.rowCount === 0) {
      throw new DomainError("");
    }
    return result.rows.map(subscription => ({
    email: subscription.email,
    repo: subscription.repo,
    confirmed: subscription.confirmed,
    last_seen_tag: subscription.last_seen_tag || "" 
  }));
}
}
