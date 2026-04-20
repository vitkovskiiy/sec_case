import {Subscription} from "../entities/Subscription";

export interface IFindService {
    findSubscriptions(email:string):Promise<Subscription[]>
}