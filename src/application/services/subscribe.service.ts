import { AlreadySubscribedError} from "../../domain/error";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";
import {IGitHubChecker} from "../../domain/interfaces/IGitHubChecker"
import {IMailer} from "../../domain/interfaces/IMailer"
import { Subscription } from "../../domain/entities/Subscription";
import { generateToken } from "../../infrastructure/tools/tokenGenerator";


export class SubscribeService {
    constructor(
        private readonly repository: ISubscriptionRepository,
        private readonly validator: IGitHubChecker,
        private readonly mailer: IMailer,
    ){}

    async createSubscribe(email: string, repo: string) {
        const subscription = new Subscription(email, repo);
        const isRepo = await this.validator.check(repo);
        const token = generateToken();
        const isSaved = await this.repository.saveSubscription(subscription,token);
        console.log(isSaved)
        if (!isSaved) {
           throw new AlreadySubscribedError("Email already subscribed to this repository")
        }
        const mailer = await this.mailer.sendMail(email,token,repo);
    }
    async confirmEmail(token:string){

    }
}