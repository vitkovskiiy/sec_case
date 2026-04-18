import {ISubscriptionRepository} from "../repositories/ISubscriptionRepository";
import {Subscription} from "../entities/Subscription";
import {AlreadySubscribedError} from "../errors/error";
import {ISubscriptionFactory} from "../interfaces/ISubscriptionFactory";

export class SubscriptionFactory implements ISubscriptionFactory{
    constructor(private readonly db: ISubscriptionRepository) {}

    async createSubscription(repo:string,email:string): Promise<Subscription> {
        const subscription = await this.db.exists(repo,email);
        if(subscription){
           throw new AlreadySubscribedError("Subscription already exists")
        }
        return new Subscription(repo,email);
    }
}