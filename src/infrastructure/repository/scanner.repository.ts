import { Pool } from "pg";
import { DomainError } from "../../domain/error";

export class ScannerRepository {
  constructor(private readonly db: Pool) {}

  async returnListOfRepositories(repo:string){
    const query = `
        SELECT
        VALUES ($1, $2, $3,false)
        ON CONFLICT (email, repo_name) DO NOTHING
        RETURNING id;
      `;
  }
}
