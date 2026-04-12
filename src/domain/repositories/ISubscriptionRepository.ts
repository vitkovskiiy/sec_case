import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository {
  saveSubscription(subsciption: Subscription,token:string): Promise<boolean>;
}
