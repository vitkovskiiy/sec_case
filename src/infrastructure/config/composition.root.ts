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

// Events & Notifications
import { InMemoryEventBus } from '../event-bus/InMemoryEventBus';
import { EmailNotificationService } from '../../application/notifications/EmailNotificationService';
import { SubscriptionConfirmedEvent } from '../../application/events/SubscriptionConfirmedEvent';
import { ReleaseDetectedEvent } from '../../application/events/ReleaseDetectedEvent';

// Commands (sync + async variants)
import { SubscribeCommandHandler } from '../../application/commands/subscribe/SubscribeCommandHandler';
import { SubscribeCommandHandlerAsync } from '../../application/commands/subscribe/SubscribeCommandHandlerAsync';
import { ConfirmSubscriptionCommandHandler } from '../../application/commands/confirm/ConfirmSubscriptionCommandHandler';
import { UnsubscribeCommandHandler } from '../../application/commands/unsubscribe/UnsubscribeCommandHandler';

// Queries
import { GetSubscriptionsByEmailQueryHandler } from '../../application/queries/GetSubscriptionsByEmailQueryHandler';

// Scanner
import { ScannerService } from '../../application/services/scanner.service';

// Controllers
import { SubscribeController } from '../../presentation/controllers/subscribe.controller';
import { TokenController } from '../../presentation/controllers/token.controller';
import { UnsubscribeController } from '../../presentation/controllers/unsubscribe.controller';
import { FindController } from '../../presentation/controllers/findSubscribe.controller';
import { MetricsController } from '../../presentation/controllers/metrics.controller';
import { TokenGenerator } from '../services/TokenGenerator';

// ── Infrastructure services ──────────────────────────────────────────────────
const checker = new GitHubChecker();
const mailer = new Mailer();
const metricsProvider = new MetricsProvider();
const tokenGenerator = new TokenGenerator();

// ── Event Bus (in-process) ───────────────────────────────────────────────────
const eventBus = new InMemoryEventBus();

// ── Notification component ───────────────────────────────────────────────────
const notificationService = new EmailNotificationService(mailer);

// Register async subscribers on the bus
eventBus.subscribe<SubscriptionConfirmedEvent>(
  'SubscriptionConfirmed',
  (event) => notificationService.onSubscriptionConfirmed(event),
);
eventBus.subscribe<ReleaseDetectedEvent>(
  'ReleaseDetected',
  (event) => notificationService.onReleaseDetected(event),
);

// ── Repositories ─────────────────────────────────────────────────────────────
const subscribeRepository = new PostgresSubscriptionRepository(pool);
const tokenRepository = new TokenRepository(pool);
const unsubscribeRepository = new UnsubscribeRepository(pool);
const subscriptionQueryRepository = new PostgresSubscriptionQueryRepository(pool);
export const scannerRepository = new ScannerRepository(pool);

// ── Domain factories ──────────────────────────────────────────────────────────
const subscriptionFactory = new SubscriptionFactory(subscribeRepository);

// ── Command Handlers ──────────────────────────────────────────────────────────
// Switch between sync and async by changing which handler is exported.
// SYNC variant (notification blocks response):
const subscribeHandlerSync = new SubscribeCommandHandler(
  subscriptionFactory,
  checker,
  subscribeRepository,
  tokenGenerator,
  notificationService,
);

// ASYNC variant (notification is fire-and-forget via event bus):
const subscribeHandlerAsync = new SubscribeCommandHandlerAsync(
  subscriptionFactory,
  checker,
  subscribeRepository,
  tokenGenerator,
  eventBus,
);

// Use async handler in production (swap to sync for comparison):
export const subscribeHandler = subscribeHandlerAsync;

const confirmHandler = new ConfirmSubscriptionCommandHandler(tokenRepository);
const unsubscribeHandler = new UnsubscribeCommandHandler(unsubscribeRepository);

// ── Query Handlers ────────────────────────────────────────────────────────────
const getSubscriptionsHandler = new GetSubscriptionsByEmailQueryHandler(subscriptionQueryRepository);

// ── Scanner ───────────────────────────────────────────────────────────────────
export const scannerService = new ScannerService(scannerRepository, checker, mailer);

// ── Controllers ───────────────────────────────────────────────────────────────
export const subscribeController = new SubscribeController(subscribeHandler);
export const tokenController = new TokenController(confirmHandler);
export const unsubscribeController = new UnsubscribeController(unsubscribeHandler);
export const findController = new FindController(getSubscriptionsHandler);
export const metricsController = new MetricsController(metricsProvider);
