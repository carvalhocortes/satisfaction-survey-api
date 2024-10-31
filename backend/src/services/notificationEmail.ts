
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import SMTPPool from 'nodemailer/lib/smtp-pool';

dotenv.config();

export default class NotificationService {
  private transporter

  constructor(transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST_URL,
    port: process.env.MAIL_HOST_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASSWORD,
    },
  } as any)) {
    this.transporter = transporter
  }

  async sendObrigadoEmail(to: string): Promise<SMTPPool.SentMessageInfo> {
    const info = await this.transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to, // list of receivers
      subject: "Obrigado por responder o survey", // Subject line
      text: "Obrigado por responder o survey", // plain text body
      html: "<b>Obrigado por responder o survey</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return info
  }

}

