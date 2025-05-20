import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async sendEmail(to: string, subject: string, text: string) {
        const info = await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text,
        });

        // ✅ Pokud používáš Ethereal → vypiš odkaz na náhled
        if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log(`📧 Náhled e-mailu: ${previewUrl}`);
        }
    }
}
