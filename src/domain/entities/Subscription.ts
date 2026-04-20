import { DomainError } from "../errors/error";

export class Subscription {
  constructor(
    public readonly email: string,
    public readonly repo: string,
  ) {
    this.email = email.trim();
    console.log(this.email);
    if (!this.email.includes("@")) {
      throw new DomainError("Email should have @");
    }
    if (!this.repo.includes("/")) {
      throw new DomainError("Schema should be like owner/repo");
    }
  }
}
