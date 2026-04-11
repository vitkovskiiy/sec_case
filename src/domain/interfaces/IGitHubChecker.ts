export interface IGitHubChecker { 
   check(repo:string): Promise<boolean>
}