import { DomainError,RepositoryNotFoundError} from "../../domain/error";


export class SubscribeService {
    constructor(
        private readonly repository: SubscriptionRepository,
        private readonly validator: RepoValidate,
        private readonly mailer: Mailer,
    ){}


    async createSubscribe (email:string,repo:string){
        const validateRepo = this.validator.validate(repo);
        const mailer = this.mailer.sendMail(email);
        const repoInDb = this.repository(repo);
        if (!repoInDb){
            throw new RepositoryNotFoundError("Repo already exists")
        }
        const subscribeUser = this.repository.save(email,repo);
         
    }
}