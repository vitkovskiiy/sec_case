import { SubscribeService } from "./application/services/subscribe.service";
import { GitHubChecker } from "./infrastructure/github.checker";
import { SubscribeController } from "./presentation/controllers/subscribe.controller";
import { SubscriptionRepository} from "./infrastructure/repository/subscribe.repository";
import { pool } from "./infrastructure/database";
import { Mailer } from "./infrastructure/mailer";
import { TokenRepository } from "./infrastructure/repository/token.repository";
import { TokenController } from "./presentation/controllers/token.controller";
import { TokenService } from "./application/services/token.service";

const checker = new GitHubChecker();
const mailer = new Mailer();

//token container
export const tokenRepository = new TokenRepository(pool);
const tokenService = new TokenService(tokenRepository);
export const tokenController = new TokenController(tokenService); 
//subscribe container
const subscribeRepository = new SubscriptionRepository(pool);
const subscribeService = new SubscribeService(subscribeRepository, checker, mailer);
export const subscribeController = new SubscribeController(subscribeService);


