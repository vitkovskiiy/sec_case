import { Subscription } from "../entities/Subsciption";

export interface ISubscriptionRepository { 
    addRepo(repo:string): Promise<boolean>
    save(subsciption: Subscription): Promise<boolean>;
}