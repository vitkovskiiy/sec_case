import { DomainError,RepositoryNotFoundError} from "../../domain/error";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import {IGitHubChecker} from "../../domain/interfaces/IGitHubChecker"
import {IMailer} from "../../domain/interfaces/IMailer"
import { Subscription } from "../../domain/entities/Subsciption";


export class SubscribeService {
    constructor(
        private readonly repository: ISubscriptionRepository,
        private readonly validator: IGitHubChecker,
        private readonly mailer: IMailer,
    ){}


    async createSubscribe (email:string,repo:string){
        const validateRepo = await this.validator.check(repo);
        const mailer = await this.mailer.sendMail(email);
        const repoInDb = await this.repository.addRepo(repo);
        if (!repoInDb){
            throw new RepositoryNotFoundError("Repo already exists")
        }
        const subsciption = await new Subscription(email,repo);
        const save = await this.repository.save(subsciption);

        return save; 
    }
}