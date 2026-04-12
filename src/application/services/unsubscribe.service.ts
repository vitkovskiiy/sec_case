import { IUnsubscribeService } from "../../domain/interfaces/IUnsubscribeService";
import { IUnsubscribeRepository } from "../../domain/repositories/IUnsubscribeRepository";
import { Token } from "../../domain/entities/Token";

export class UnsubscribeService implements IUnsubscribeService {
  constructor(private readonly repository: IUnsubscribeRepository) {}
  async deleteSubscribe(token: string) {
    const tokenEntity = new Token(token);
    const tokenDelete = await this.repository.deleteConnect(tokenEntity.token);
    return true;
  }
}
