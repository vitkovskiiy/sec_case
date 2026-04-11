import { RepositoryNotFoundError } from "../domain/error";
import { IGitHubChecker } from "../domain/interfaces/IGitHubChecker";

export class GitHubChecker implements IGitHubChecker {
     async check(repo: string){
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`)
      return true;
    } catch (error) {
        console.error(`Something happened while checking repo:`, error);
        throw new RepositoryNotFoundError("Error accuring verify repository")
    }
  }

  async checkReleases(repo: string){
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      const data = await response.json();
      return data.tag_name;
    } catch (error) {
        console.error(`Something happened while checking repo:`, error);
        throw new RepositoryNotFoundError("Error accuring verify repository")
    }
  }
}
