import SMTPPool from 'nodemailer/lib/smtp-pool';



export default interface INotificationService {
  sendObrigadoEmail(email: string): Promise<SMTPPool.SentMessageInfo>;
}
