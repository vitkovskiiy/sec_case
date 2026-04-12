import { IMailer } from "../../domain/interfaces/IMailer";
import { transporter } from "./nodemailer";
export class Mailer implements IMailer{
  async sendMail(email: string,token:string,repo:string) {
    const info = await transporter.sendMail({
      from: "flicks2006@gmail.com",
      to: email,
      subject: `Verify your subscription for ${repo}Your token: ${token}`,
      text: `Your token: ${token}`,
      html: "<b>This is sign token use it on these api /confirm/{token}</b>",
    });
    return {message:info}
  }
  async sendNotify(email:string,repo:string,latestTag){
    const info = await transporter.sendMail({
      from: "flicks2006@gmail.com",
      to: email,
      subject: `New update on repository ${repo}`,
      text: `Repository ${repo} has new update version ${latestTag}`,
      html: "",
    });
    return {message:info}
  } 
}

