import {Subscription} from "../entities/Subscription";

export interface ISubscriptionFactory{
    createSubscription(repo:string,email:string):Promise<Subscription>;
}