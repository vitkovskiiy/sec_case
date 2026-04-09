export class checkRepoExists {
  static async check(repoPath: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.github.com/repos/${repoPath}`)
      if(response.ok){
        return true;
      }
    } catch (error) {
        console.error(`Something happened while checking repo:`, error);
        return false;
    }
  }
}
