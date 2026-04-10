import { AlreadySubscribedError} from "../../domain/error";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import {IGitHubChecker} from "../../domain/interfaces/IGitHubChecker"
import {IMailer} from "../../domain/interfaces/IMailer"
import { Subscription } from "../../domain/entities/Subscription";


export class SubscribeService {
    constructor(
        private readonly repository: ISubscriptionRepository,
        private readonly validator: IGitHubChecker,
        private readonly mailer: IMailer,
    ){}

    async createSubscribe(email: string, repo: string) {
        await this.validator.check(repo);
        await this.repository.addRepo(repo);
        const subscription = new Subscription(email, repo);
        const isSaved = await this.repository.save(subscription);
        if (!isSaved) {
           throw new AlreadySubscribedError("Email already subscribed to this repository")
        }
        const mailer = await this.mailer.sendMail(email);
    }
}