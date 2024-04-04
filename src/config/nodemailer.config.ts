import { MailerModule } from '@nestjs-modules/mailer';

console.log(process.env.NODEMAILER_HOST);
export default MailerModule.forRoot({
  transport: {
    // service: 'gmail',
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    logger: true,
    debug: true,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  },
});
