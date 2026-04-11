export interface IMailer {
    sendMail(email:string,token:string):Promise<{message:object}>
    sendNotify(email:string,repo:string,latestTag)
}