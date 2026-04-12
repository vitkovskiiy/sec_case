import { DomainError } from "../../domain/errors/error";
import { Pool } from "pg";
import { IScannerRepository } from "../../domain/repositories/IScannerRepository";

export class ScannerRepository implements IScannerRepository {
  constructor(private readonly db: Pool) {}

  async returnListOfRepositories() {
    const insertQuery = `
         SELECT r."name" FROM repositories r
      `;
    const query = await this.db.query(insertQuery);
    if (query.rowCount === 0) {
      throw new DomainError("Database can't find any repo");
    }
    return query.rows;
  }

  async getOldTag(repoName: string): Promise<string | undefined> {
    const query = `SELECT r.tag_name FROM repositories r WHERE r."name" = $1`;
    const result = await this.db.query(query, [repoName]);
    const query2 = `UPDATE repositories SET last_seen_tag = LOCALTIMESTAMP(0) WHERE "name" = $1`;
    const result2 = await this.db.query(query2, [repoName]);
    if (result.rows.length > 0) {
      const tag = result.rows[0].tag_name;
      return tag === null ? undefined : tag;
    }
    return undefined;
  }
  async updateTag(repo: string, tag: string) {
    const insertQuery = `UPDATE repositories r SET tag_name = $2 WHERE r."name" = $1`;
    const query = await this.db.query(insertQuery, [repo, tag]);
    if (query.rowCount === 0) {
      throw new DomainError("Database can't find any old tag");
    }
    return true;
  }

  async getAllSubscribers(repo: string) {
    const insertQuery = `
    SELECT s.email 
    FROM subscriptions s 
    WHERE s.repo_name = $1 AND is_confirmed = true
  `;
    const query = await this.db.query(insertQuery, [repo]);
    console.log(query.rows);
    if (query.rowCount === 0) {
      throw new DomainError("Database can't find any old tag");
    }
    return query.rows;
  }
}
