import { IFindRepository } from "../../domain/repositories/IFindRepository";
import { IFindService } from "../../domain/interfaces/IFindService";
import {Subscription} from "../../domain/entities/Subscription";




export class FindService implements IFindService {
  constructor(private readonly repository: IFindRepository) {}
  async findSubscriptions(email: string): Promise<Subscription[]> {
    const subscriptions = await this.repository.findSubscriptionsByEmail(email);
      return subscriptions
  }
}
