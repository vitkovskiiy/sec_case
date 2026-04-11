import { RepositoryNotFoundError } from "../domain/error";
import { IGitHubChecker } from "../domain/interfaces/IGitHubChecker";

export class GitHubChecker implements IGitHubChecker {
     async check(repo: string){
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`)
      console.log(response);
      return true;
    } catch (error) {
        console.error(`Something happened while checking repo:`, error);
        throw new RepositoryNotFoundError("Error accuring verify repository")
    }
  }
}
