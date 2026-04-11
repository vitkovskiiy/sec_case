import { RepositoryNotFoundError } from "../domain/error";
import { IGitHubChecker } from "../domain/interfaces/IGitHubChecker";

export class GitHubChecker implements IGitHubChecker {
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
  }

  async check(repo: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 404) {
          return false;
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      throw new RepositoryNotFoundError("Error verifying repository");
    }
  }
  async checkReleases(repo: string): Promise<string | undefined> {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: this.getHeaders()
      });
      if (!response.ok) {
        if (response.status === 429 || response.status === 403) {
          console.warn(`[GitHubChecker] Rate limit exceeded для ${repo}.`);
          return undefined; 
        }
        if (response.status === 404) {
          return undefined; 
        }
        console.error(`[GitHubChecker] Ошибка API ${response.status} when req to ${repo}`);
        return undefined;
      }
      const data = await response.json();
      return data.tag_name;

    } catch (error) {
      console.error(`[GitHubChecker] Network error ${repo}:`, error);
      return undefined;
    }
  }
}