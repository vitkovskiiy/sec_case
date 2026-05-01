import { IGitHubChecker } from '../../../domain/interfaces/IGitHubChecker';
import { IMailer } from '../../../domain/interfaces/IMailer';
import { ISubscriptionFactory } from '../../../domain/interfaces/ISubscriptionFactory';
import { ISubscriptionRepository } from '../../../domain/repositories/ISubscriptionRepository';
import { generateToken } from '../../../infrastructure/tools/tokenGenerator';
import { SubscribeCommand } from './SubscribeCommand';

export class SubscribeCommandHandler {
  constructor(
    private readonly subscriptionFactory: ISubscriptionFactory,
    private readonly githubChecker: IGitHubChecker,
    private readonly mailer: IMailer,
    private readonly repository: ISubscriptionRepository,
  ) {}

  async execute(command: SubscribeCommand): Promise<void> {
    await this.githubChecker.check(command.repo);

    const subscription = await this.subscriptionFactory.createSubscription(
      command.email,
      command.repo,
    );

    const token = generateToken();
    await this.repository.newRepo(command.repo);
    await this.repository.saveSubscription(subscription, token);
    await this.mailer.sendMail(subscription.email, subscription.repo, token);
  }
}
