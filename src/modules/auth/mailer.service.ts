import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,  
        pass: process.env.MAIL_PASS,  
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: `"Course Platform" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
  }
}
