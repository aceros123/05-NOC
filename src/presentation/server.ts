import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronServices } from "./cron/cron-services"
import { EmailService } from "./email/email.services";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server{
    public static start(){  
        console.log("server started")
        //TODO: Enviar correos
        // new SendEmailLogs(
        // emailService, 
        // fileSystemLogRepository
        // ).execute(
        //     ["daniel20001989@gmail.com","daniel20001989@hotmail.com"
        //     ])
        


        
        // CronServices.createJob('*/5 * * * * *', () => {
        //     const url = 'https://www.google.com.co'
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${ url } is ok `),
        //         (error) => console.log(error)
        //     ).execute( url )
        // });
    }  
 }