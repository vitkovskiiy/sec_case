import { SubscriptionDTO } from "../../presentation/dtos/subscriptionDto";

export interface IFindRepository {
    findSubscriptionsByEmail(email:string): Promise<SubscriptionDTO[]>
}