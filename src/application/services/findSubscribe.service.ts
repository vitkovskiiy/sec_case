import { IFindRepository } from "../../domain/interfaces/IFindRepository";
import { IFindService } from "../../domain/interfaces/IFindService";

export class FindService implements IFindService {
    constructor(private readonly repository: IFindRepository){

    }
    async findSubscriptions(email:string){
        const find =  await this.repository.findSubscriptionsByEmail(email);
        console.log(find);
        return find
    }
}