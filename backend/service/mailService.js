import nodemailer from 'nodemailer';

import ApiError from '../exceptions/apiErrors.js';

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async senActivationMail(to, link) {
    await this.transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + process.env.API_URL,
        text: '',
        html: `
              <div>
                  <h1>Для активации перейдите по ссылке</h1>
                  <a href="${link}">${link}</a>
              </div>
          `,
      },
      (error, info) => {
        if (error) {
          console.log('error is ', error);
          ApiError.badRequest(`Ошибка при отправке письма`);
        } else {
          console.log(info.accepted);
        }
      },
    );
  }
}

export default new mailService();
