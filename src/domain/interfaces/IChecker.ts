export interface IChecker { 
    check(repo: string): Promise<boolean>
}