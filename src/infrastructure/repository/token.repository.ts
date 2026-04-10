import { Pool } from "pg";
import { ITokenRepository } from "../../domain/interfaces/ITokenRepository";

import { DatabaseError, DomainError } from "../../domain/error";

export class TokenRepository implements ITokenRepository {
  constructor(private readonly db: Pool) {}

  async validateToken(token: string): Promise<boolean> {
      const compare
  }

}
