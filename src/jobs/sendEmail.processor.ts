import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send-email')
export class SendEmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async sendEmail(job: Job) {
    const { email, name } = job.data;

    console.log('Enviando email para: ' + name);

    await this.mailerService.sendMail({
      from: '"Hildo Neto" <hildo.pro.developer@gmail.com>',
      to: email,
      subject: 'Bem Vindo!',
      text: `Bem Vindo ao nosso Sistema De Agendamento, ${name}`,
      html: `<p>Bem Vindo ao nosso Sistema De Agendamento, ${name}</p>`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Email enviado para ${job.data.email}`);
  }
}
