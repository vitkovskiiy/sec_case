export interface IMailer {
    sendMail(email:string):Promise<boolean>
}