export interface ITokenRepository {
    validateToken(token:string):Promise<boolean>
}