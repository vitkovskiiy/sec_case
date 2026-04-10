export interface IMailer {
    sendMail(email:string,token:string):Promise<{message:object}>
}