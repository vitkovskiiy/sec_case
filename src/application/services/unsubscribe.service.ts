import { IUnsubscribeService } from "../../domain/interfaces/IUnsubscribeService";
import { IUnsubscribeRepository } from "../../domain/interfaces/IUnsubscribeRepository";
import { Token } from "../../domain/entities/Token";

export class UnsubscribeService implements IUnsubscribeService {
  constructor(private readonly repository: IUnsubscribeRepository) {}
  async deleteSubscribe(token: string) {
    try {
      const tokenEntity = new Token(token)
      const tokenDelete = await this.repository.deleteConnect(tokenEntity.token);
      return { token: tokenDelete.token, email: tokenDelete.email };
    } catch (error) {
        console.log(error)
    }
  }
}
