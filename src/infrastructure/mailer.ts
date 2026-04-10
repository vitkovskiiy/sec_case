import { transporter } from "./nodemailer";
import { generateToken } from "./tools/tokenGenerator";


export class Mailer{
  async sendMail(email: string) {
    const token = generateToken();
    const info = await transporter.sendMail({
      from: "flicks2006@gmail.com",
      to: email,
      subject: "Hello",
      text: `Your token: ${token}`,
      html: "<b>Hello world?</b>",
    });
    return {mail:info,token:token}
  }
}
