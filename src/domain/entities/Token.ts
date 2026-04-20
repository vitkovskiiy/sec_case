import { SyntaxError } from "../errors/error";

export class Token {
  constructor(public readonly token: string) {
    if (this.token.length === 8) {
      throw new SyntaxError("Token length should be equal 8");
    }
  }
}
