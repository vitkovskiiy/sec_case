import { transporter } from "./nodemailer";
export class Mailer {
  async sendMail(email: string) {
    const info = await transporter.sendMail({
      from: "flicks2006@gmail.com",
      to: email,
      subject: "Hello",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    return info
  }
}
