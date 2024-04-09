import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('validation-email')
export class ValidationEmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async sendEmail(job: Job) {
    const { email, name, validationCode } = job.data;

    await this.mailerService.sendMail({
      from: `"Hildo Neto" <hildo.pro.developer@gmail.com>`,
      to: email,
      subject: 'Bem Vindo!',
      text: `Bem Vindo ao nosso Sistema De Agendamento, ${name}`,
      html: `<h1>Bem Vindo ao nosso Sistema De Agendamento, ${name}</h1><p>Segue seu código de validação de email: <strong>${validationCode}</strong></p><br><br><br><p>Atenciosamente Hildo.</p>`,
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Email enviado para ${job.data.email}`);
  }
}
