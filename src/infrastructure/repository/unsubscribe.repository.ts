import { Pool } from "pg";
import { IUnsubscribeRepository } from "../../domain/interfaces/IUnsubscribeRepository";
import { DatabaseError } from "../../domain/error";

export class UnsubscribeRepository implements IUnsubscribeRepository {
  constructor(private readonly db: Pool) {}
  async deleteConnect(token: string) {
    try {
      const query = `DELETE FROM subscriptions WHERE token = $1`;
      const deleteConnect = await this.db.query(query, [token]);
      return { email: deleteConnect.rows[1], token: deleteConnect.rows[2] };
    } catch (error) {
        throw new DatabaseError("Can't find subscribe from this token")
    }
  }
}
