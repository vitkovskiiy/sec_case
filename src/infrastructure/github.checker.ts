export class GitHubChecker {
  static async check(repo: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`)
      if(response.ok){
        return true;
      }
    } catch (error) {
        console.error(`Something happened while checking repo:`, error);
        return false;
    }
  }
}
