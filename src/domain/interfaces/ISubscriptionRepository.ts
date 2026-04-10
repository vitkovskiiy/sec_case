import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository {
  addRepo(repo: string): Promise<boolean>;
  saveSubscription(subsciption: Subscription,token:string): Promise<boolean>;
  saveToken(email:string,token:string):Promise<boolean>
}
