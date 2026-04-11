export interface IGitHubChecker { 
   check(repo:string): Promise<boolean>
   checkReleases(repo: string):Promise<string>
}