import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASS'),
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        const from = this.configService.get<string>('MAIL_FROM');
        await this.transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
        });
        console.log(`Email sent to ${to} with subject: ${subject}`);
    }
}
