import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository {
  exists(repo:string,email:string): Promise<boolean>;
  saveSubscription(subscription: Subscription, token:string): Promise<boolean>;
  newRepo(repo:string):Promise<boolean>;
}
