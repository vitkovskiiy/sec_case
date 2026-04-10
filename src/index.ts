import { SubscribeService } from "./application/services/subscribe.service";
import { GitHubChecker } from "./infrastructure/github.checker";
import { SubscribeController } from "./presentation/controllers/subscribe.controller";
import { SubscriptionRepository} from "./infrastructure/repository/subscribe.repository";
import { pool } from "./infrastructure/database";
import { Mailer } from "./infrastructure/mailer";
const checker = new GitHubChecker();
const mailer = new Mailer();

const subscribeRepository = new SubscriptionRepository(pool);
//subscribe container
const subscribeService = new SubscribeService(subscribeRepository, checker, mailer);
export const subscribeController = new SubscribeController(subscribeService);


