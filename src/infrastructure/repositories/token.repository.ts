import { Pool } from "pg";
import { ITokenRepository } from "../../domain/interfaces/ITokenRepository";
import { DatabaseError } from "../../domain/errors/error";

export class TokenRepository implements ITokenRepository {
  constructor(private readonly db: Pool) {}

  async validateToken(token: string): Promise<boolean> {
    try {
      const insertRepoQuery = `
        SELECT * FROM subscriptions
        WHERE token = $1
      `;
      const query = await this.db.query(insertRepoQuery, [token]);
      if (query.rowCount === 0) {
        return false;
      }
      const insertRepoQuery2 = `
        UPDATE subscriptions
        SET is_confirmed = true
        WHERE id = $1
        RETURNING id;
    `;
      const query1 = await this.db.query(insertRepoQuery2, [query.rows[0].id]);
      if (query1.rowCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Error validate token");
    }
  }
}
