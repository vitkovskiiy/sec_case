import { Pool } from "pg";

export class Scanner {
    constructor(private readonly db: IScannerRepository){}
   
    async checker(){
        const findAllSignedRepo = this.db.
    }
}