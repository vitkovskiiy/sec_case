export class DomainError extends Error {
   constructor(message:string){
    super(message);
    this.name = this.constructor.name;
   }
}
export class AlreadySubscribedError extends DomainError {}
export class RepositoryNotFoundError extends DomainError {}
export class SyntaxError extends DomainError {}
export class DatabaseError extends DomainError {}
