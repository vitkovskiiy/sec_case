import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository {
  addRepo(repo: string): Promise<boolean>;
  save(subsciption: Subscription): Promise<boolean>;
}
