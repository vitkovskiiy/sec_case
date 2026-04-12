import { SubscribeService } from "../../application/services/subscribe.service";
import { GitHubChecker } from "../github.checker";
import { SubscribeController } from "../../presentation/controllers/subscribe.controller";
import { SubscriptionRepository } from "../repository/subscribe.repository";
import { pool } from "./database.config";
import { Mailer } from "../mailer";
import { TokenRepository } from "../repository/token.repository";
import { TokenController } from "../../presentation/controllers/token.controller";
import { TokenService } from "../../application/services/token.service";
import { UnsubscribeController } from "../../presentation/controllers/unsubscribe.controller";
import { UnsubscribeRepository } from "../repository/unsubscribe.repository";
import { UnsubscribeService } from "../../application/services/unsubscribe.service";
import { ScannerRepository } from "../repository/scanner.repository";
import { ScannerService } from "../../application/services/scanner.service";
import { FindController } from "../../presentation/controllers/findSubscribe.controller";
import { FindRepository } from "../repository/findSubscribes.repository";
import { FindService } from "../../application/services/findSubscribe.service";

const checker = new GitHubChecker();
const mailer = new Mailer();
export const scannerRepository = new ScannerRepository(pool);
export const scannerService = new ScannerService(scannerRepository, checker, mailer);

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
const subscribeRepository = new SubscriptionRepository(pool);
const subscribeService = new SubscribeService(subscribeRepository, checker, mailer);
export const subscribeController = new SubscribeController(subscribeService);
