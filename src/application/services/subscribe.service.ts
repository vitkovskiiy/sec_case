import { IGitHubChecker } from "../../domain/interfaces/IGitHubChecker";
import { IMailer } from "../../domain/interfaces/IMailer";
import { generateToken } from "../../infrastructure/tools/tokenGenerator";
import {ISubscriptionFactory} from "../../domain/interfaces/ISubscriptionFactory";
import {ISubscriptionRepository} from "../../domain/repositories/ISubscriptionRepository";

export class SubscribeService {
  constructor(
    private readonly subscriptionFactory: ISubscriptionFactory,
    private readonly validator: IGitHubChecker,
    private readonly mailer: IMailer,
    private readonly db: ISubscriptionRepository,
  ) {}

  async createSubscribe(email: string, repo: string) {
    await this.validator.check(repo);
    const token = generateToken();
    await this.db.newRepo(repo);
    const subscription = await this.subscriptionFactory.createSubscription(email, repo);
    await this.db.saveSubscription(subscription, token);
    await this.mailer.sendMail(subscription.email, subscription.repo, token);
    return true
  }
}
