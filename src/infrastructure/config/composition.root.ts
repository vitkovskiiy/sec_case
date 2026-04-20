import { SubscribeService } from "../../application/services/subscribe.service";
import { GitHubChecker } from "../services/github.checker";
import { SubscribeController } from "../../presentation/controllers/subscribe.controller";
import { PostgresSubscriptionRepository } from "../repositories/subscribe.repository";
import { pool } from "./database.config";
import { Mailer } from "../services/mailer";
import { TokenRepository } from "../repositories/token.repository";
import { TokenController } from "../../presentation/controllers/token.controller";
import { TokenService } from "../../application/services/token.service";
import { UnsubscribeController } from "../../presentation/controllers/unsubscribe.controller";
import { UnsubscribeRepository } from "../repositories/unsubscribe.repository";
import { UnsubscribeService } from "../../application/services/unsubscribe.service";
import { ScannerRepository } from "../repositories/scanner.repository";
import { ScannerService } from "../../application/services/scanner.service";
import { FindController } from "../../presentation/controllers/findSubscribe.controller";
import { FindRepository } from "../repositories/findSubscribes.repository";
import { FindService } from "../../application/services/findSubscribe.service";
import { MetricsProvider } from "../services/metrics.provider";
import { MetricsController } from "../../presentation/controllers/metrics.controller";
import {SubscriptionFactory} from "../../domain/factories/SubscriptionFactory";

const checker = new GitHubChecker();
const mailer = new Mailer();
const metricsProvider = new MetricsProvider();

export const scannerRepository = new ScannerRepository(pool);
export const scannerService = new ScannerService(scannerRepository, checker, mailer);
export const metricsController = new MetricsController(metricsProvider);
//find repo container
const findRepository = new FindRepository(pool);
const findService = new FindService(findRepository);
export const findController = new FindController(findService);
//unsubscribe container
const unsubscribeRepository = new UnsubscribeRepository(pool);
const unsubscribeService = new UnsubscribeService(unsubscribeRepository);
export const unsubscribeController = new UnsubscribeController(unsubscribeService);
//token container
export const tokenRepository = new TokenRepository(pool);
const tokenService = new TokenService(tokenRepository);
export const tokenController = new TokenController(tokenService);
//subscribe container
const subscribeRepository = new PostgresSubscriptionRepository(pool);
const subscribeFactory = new SubscriptionFactory(subscribeRepository)
const subscribeService = new SubscribeService(subscribeFactory, checker, mailer,subscribeRepository);
export const subscribeController = new SubscribeController(subscribeService);
