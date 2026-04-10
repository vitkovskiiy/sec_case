import { DomainError,RepositoryNotFoundError} from "../../domain/error";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import {IChecker} from "../../domain/interfaces/IChecker"
import {IMailer} from "../../domain/interfaces/IMailer"

export class SubscribeService {
    constructor(
        private readonly repository: ISubscriptionRepository,
        private readonly validator: IChecker,
        private readonly mailer: IMailer,
    ){}


    async createSubscribe (email:string,repo:string){
        const validateRepo = this.validator.check(repo);
        const mailer = this.mailer.sendMail(email);
        const repoInDb = this.repository.addRepo(repo);
        if (!repoInDb){
            throw new RepositoryNotFoundError("Repo already exists")
        }
        const subscribeUser = this.repository.save(email,repo);
         
    }
}