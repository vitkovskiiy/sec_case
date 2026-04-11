import { DomainError, RepositoryNotFoundError } from "../../domain/error";
import { ITokenRepository } from "../../domain/interfaces/ITokenRepository";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { Token } from "../../domain/entities/Token";
export class TokenService implements ITokenService {
    constructor(
        private readonly repository: ITokenRepository,
    ){}

    async validateToken(token:string){
       try {
        const tokenEntity = new Token(token)
        const validator = await this.repository.validateToken(tokenEntity.token);
        if(!validator){throw new RepositoryNotFoundError("Token not found")}
        return true;
       } catch (error) {
        console.log(error)
        throw new DomainError("Error")
       }        
    }
}