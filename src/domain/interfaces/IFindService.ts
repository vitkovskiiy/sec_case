import { SubscriptionDTO } from "../../presentation/dtos/subscriptionDto";

export interface IFindService {
    findSubscriptions(email:string):Promise<SubscriptionDTO[]>
}