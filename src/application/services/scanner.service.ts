import { IGitHubChecker } from "../../domain/interfaces/IGitHubChecker";
import {IMailer} from "../../domain/interfaces/IMailer"
import { IScannerRepository } from "../../domain/interfaces/IScannerRepository";

export class ScannerService {
  constructor(
    private readonly repository: IScannerRepository,
    private readonly githubChecker: IGitHubChecker,
    private readonly mailer : IMailer,
  ) {}

  async checker() {
    console.log("⏳ Запрашиваю список репозиториев из базы...");
    const findAllSignedRepo = await this.repository.returnListOfRepositories();
    console.log(`🧐 Найдено репозиториев: ${findAllSignedRepo.length}`, findAllSignedRepo);
    if (findAllSignedRepo.length === 0) {
        return true;
    }
    
    for (const repo of findAllSignedRepo) {
      
        const latestTag = await this.githubChecker.checkReleases(repo.name);
        console.log(`[ScannerService] Репозиторий ${repo.name} -> Current releases:`, latestTag);
        const oldTag = await this.repository.getOldTag(repo.name);
        console.log(`[ScannerService] Старый тег в базе:`, oldTag);
        if(latestTag !== oldTag){
            const updateTag = await this.repository.updateTag(repo.name,latestTag);
            const getAllSubscribers = await this.repository.getAllSubscribers(repo.name)
            for(const user of getAllSubscribers){
              const notify = await this.mailer.sendNotify(user.email,repo.name,latestTag);
              console.log(notify);
            }
            console.log(updateTag);
        }
    }
    return true;
  }
}