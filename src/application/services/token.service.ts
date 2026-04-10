import { DomainError, RepositoryNotFoundError } from "../../domain/error";
import { ITokenRepository } from "../../domain/interfaces/ITokenRepository";
import { ITokenService } from "../../domain/interfaces/ITokenService";
export class TokenService implements ITokenService {
    constructor(
        private readonly repository: ITokenRepository,
    ){}

    async validateToken(token:string){
       try {
        console.log(token + "validate")
        const validator = await this.repository.validateToken(token);
        if(!validator){throw new RepositoryNotFoundError("Token not found")}
        return true;
       } catch (error) {
        console.log(error)
        throw new DomainError("Error")
       }        
    }
}