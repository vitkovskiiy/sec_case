import { IGitHubChecker } from '../../../domain/interfaces/IGitHubChecker';
import { ISubscriptionFactory } from '../../../domain/interfaces/ISubscriptionFactory';
import { ITokenGenerator } from '../../../domain/interfaces/ITokenGenerator';
import { ISubscriptionRepository } from '../../../domain/repositories/ISubscriptionRepository';
import { IEventBus } from '../../../infrastructure/event-bus/IEventBus';
import { SubscriptionConfirmedEvent } from '../../events/SubscriptionConfirmedEvent';
import { SubscribeCommand } from './SubscribeCommand';

/**
 * ASYNC variant: after saving subscription, publishes an event to the bus.
 * The handler returns immediately — notification happens out-of-band.
 * If notification fails — subscriber logs the error, core op is unaffected.
 */
export class SubscribeCommandHandlerAsync {
  constructor(
    private readonly subscriptionFactory: ISubscriptionFactory,
    private readonly githubChecker: IGitHubChecker,
    private readonly repository: ISubscriptionRepository,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly eventBus: IEventBus,
  ) {}

  async execute(command: SubscribeCommand): Promise<void> {
    await this.githubChecker.check(command.repo);

    const subscription = await this.subscriptionFactory.createSubscription(
      command.email,
      command.repo,
    );

    const token = this.tokenGenerator.generate();
    await this.repository.newRepo(command.repo);
    await this.repository.saveSubscription(subscription, token);

    // ASYNC: publish event and return immediately — notification is fire-and-forget
    const event = new SubscriptionConfirmedEvent(subscription.email, subscription.repo, token);
    await this.eventBus.publish('SubscriptionConfirmed', event);
  }
}
