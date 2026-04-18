import {Subscription} from "../entities/Subscription";

export interface IFindRepository {
    findSubscriptionsByEmail(email:string): Promise<Subscription[]>
}