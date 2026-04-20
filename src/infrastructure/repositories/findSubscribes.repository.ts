import { Pool } from "pg";
import { IFindRepository } from "../../domain/repositories/IFindRepository";
import { DomainError } from "../../domain/errors/error";

export class FindRepository implements IFindRepository {
  constructor(private readonly db: Pool) {}

  async findSubscriptionsByEmail(email: string): Promise<any> {
    const result = await this.db.query(`
 SELECT 
      s.email,s.repo_name AS repo,s.is_confirmed AS confirmed, r.last_seen_tag FROM subscriptions s
      join repositories r on s.repo_name = r."name" where s.email = $1`, [email]);

    if (result.rowCount === 0) {
      throw new DomainError("");
    }
    console.log(result.rows)
    return result.rows
  }
}
