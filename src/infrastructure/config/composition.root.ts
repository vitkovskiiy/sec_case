import { pool } from './database.config';
import { GitHubChecker } from '../services/github.checker';
import { Mailer } from '../services/mailer';
import { MetricsProvider } from '../services/metrics.provider';

// Repositories
import { PostgresSubscriptionRepository } from '../repositories/subscribe.repository';
import { TokenRepository } from '../repositories/token.repository';
import { UnsubscribeRepository } from '../repositories/unsubscribe.repository';
import { ScannerRepository } from '../repositories/scanner.repository';
import { PostgresSubscriptionQueryRepository } from '../repositories/subscriptionQuery.repository';

// Domain
import { SubscriptionFactory } from '../../domain/factories/SubscriptionFactory';

// Commands
import { SubscribeCommandHandler } from '../../application/commands/subscribe/SubscribeCommandHandler';
import { ConfirmSubscriptionCommandHandler } from '../../application/commands/confirm/ConfirmSubscriptionCommandHandler';
import { UnsubscribeCommandHandler } from '../../application/commands/unsubscribe/UnsubscribeCommandHandler';

// Queries
import { GetSubscriptionsByEmailQueryHandler } from '../../application/queries/GetSubscriptionsByEmailQueryHandler';

// Scanner (kept as service — internal scheduler, not HTTP-driven)
import { ScannerService } from '../../application/services/scanner.service';

// Controllers
import { SubscribeController } from '../../presentation/controllers/subscribe.controller';
import { TokenController } from '../../presentation/controllers/token.controller';
import { UnsubscribeController } from '../../presentation/controllers/unsubscribe.controller';
import { FindController } from '../../presentation/controllers/findSubscribe.controller';
import { MetricsController } from '../../presentation/controllers/metrics.controller';

// Infrastructure services
const checker = new GitHubChecker();
const mailer = new Mailer();
const metricsProvider = new MetricsProvider();

// Repositories
const subscribeRepository = new PostgresSubscriptionRepository(pool);
const tokenRepository = new TokenRepository(pool);
const unsubscribeRepository = new UnsubscribeRepository(pool);
const subscriptionQueryRepository = new PostgresSubscriptionQueryRepository(pool);
export const scannerRepository = new ScannerRepository(pool);

// Domain factories
const subscriptionFactory = new SubscriptionFactory(subscribeRepository);

// Command Handlers
const subscribeHandler = new SubscribeCommandHandler(
  subscriptionFactory,
  checker,
  mailer,
  subscribeRepository,
);
const confirmHandler = new ConfirmSubscriptionCommandHandler(tokenRepository);
const unsubscribeHandler = new UnsubscribeCommandHandler(unsubscribeRepository);

// Query Handlers
const getSubscriptionsHandler = new GetSubscriptionsByEmailQueryHandler(subscriptionQueryRepository);

// Scanner (internal service, not HTTP — CQS does not apply to cron workers)
export const scannerService = new ScannerService(scannerRepository, checker, mailer);

// Controllers
export const subscribeController = new SubscribeController(subscribeHandler);
export const tokenController = new TokenController(confirmHandler);
export const unsubscribeController = new UnsubscribeController(unsubscribeHandler);
export const findController = new FindController(getSubscriptionsHandler);
export const metricsController = new MetricsController(metricsProvider);
