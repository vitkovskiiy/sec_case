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
    const findAllSignedRepo = await this.repository.returnListOfRepositories();
    if (findAllSignedRepo.length === 0) {
        return true;
    }
    for (const repo of findAllSignedRepo) {
        const latestTag = await this.githubChecker.checkReleases(repo.name);
        const oldTag = await this.repository.getOldTag(repo.name);
        if(latestTag !== oldTag){
            await this.repository.updateTag(repo.name,latestTag);
            const getAllSubscribers = await this.repository.getAllSubscribers(repo.name)
            for(const user of getAllSubscribers){
              await this.mailer.sendNotify(user.email,repo.name,latestTag);
            }
            console.log(`[ScannerService] Репозиторий ${repo.name} -> Current releases:`, latestTag);
            console.log(`[ScannerService] Старый тег в базе:`, oldTag);
        }
    }
    return true;
  }
}