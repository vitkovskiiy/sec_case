export interface IMailer {
    sendMail(email:string,token:string,repo:string):Promise<{message:object}>
    sendNotify(email:string,repo:string,latestTag)
}