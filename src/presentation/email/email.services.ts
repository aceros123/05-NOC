import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailerOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement [];

    //TODO: add attachments
}

interface Attachement{
    filename: string;
    path: string; 
}
//TODO add attachments

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICES,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    }); 
    // contructor es igual a inyectar dependencias
    constructor(){}

    async sendEmail(options:SendMailerOptions):Promise<boolean>{

        const { to, subject, htmlBody, attachements = [] } = options;

        try {
            const sentinformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            })
            const log = new LogEntity({
                level: LogSeverityLevel.Low,
                message: `Email sent to ${to} with subject ${subject}`,
                origin: "email.services.ts",
                createdAt: new Date
            })


            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.High,
                message: `Email not sent to ${to} with subject ${subject}`,
                origin: "email.services.ts",
                createdAt: new Date
            })
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to:string | string[]){
        const subject = 'Logs del servidor'
        const htmlBody = 
        
        '<h3>Logs del servidor</h3><p>Occaecat dolor commodo cupidatat esse veniam tempor. Ipsum ipsum non cillum quis reprehenderit excepteur laborum id cupidatat. Labore anim eiusmod eiusmod et esse ea nisi. Nostrud cillum et amet laborum. Eu aliquip mollit aliquip duis qui. </p>';
        const attachements: Attachement[] = [
            {filename: 'log-all.log', path: './logs/log-all.log'},
            {filename: 'log-high.log', path: './logs/log-high.log'},
        ]
       
        return this.sendEmail({to, subject: subject, htmlBody, attachements});
    }
}