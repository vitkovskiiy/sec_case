import { transporter } from "./nodemailer";



export class Mailer{
  async sendMail(email: string,token:string) {
    const info = await transporter.sendMail({
      from: "flicks2006@gmail.com",
      to: email,
      subject: `Your token: ${token}`,
      text: `Your token: ${token}`,
      html: "<b>This is sign token use it on these api /confirm/{token}</b>",
    });
    return {message:info}
  }
}
