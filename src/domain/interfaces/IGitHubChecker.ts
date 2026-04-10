export interface IGitHubChecker { 
   check(repo:string): Promise<object>
}