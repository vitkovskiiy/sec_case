import { Pool } from "pg";
import { IUnsubscribeRepository } from "../../domain/repositories/IUnsubscribeRepository";
import { NotFoundToken } from "../../domain/errors/error";

export class UnsubscribeRepository implements IUnsubscribeRepository {
  constructor(private readonly db: Pool) {}
  async deleteConnect(token: string) {
    const query = `DELETE FROM subscriptions WHERE token = $1`;
    const deleteConnect = await this.db.query(query, [token]);
    if (deleteConnect.rowCount === 0) {
      throw new NotFoundToken("Token not found");
    }
    return true;
  }
}
