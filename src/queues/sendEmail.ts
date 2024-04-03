import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import transporter from 'src/config/nodemailer.config';

@Processor('email')
export class Email {
  @Process()
  async sendEmail(job: Job) {
    const { email, name } = job.data;

    await transporter.sendMail({
      from: '"Hildo Neto" <hildo.pro.developer@gmail.com>',
      to: email,
      subject: 'Bem Vindo!',
      text: `Bem Vindo ao nosso Sistema De Agendamento, ${name}`,
      html: `<p>Bem Vindo ao nosso Sistema De Agendamento, ${name}</p>`,
    });
  }
}

export default {
  processor: Email,
  name: 'email',
};
