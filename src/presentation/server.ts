import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronServices } from "./cron/cron-services"
import { EmailService } from "./email/email.services";

const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
);
const emailService = new EmailService();

export class Server{
    public static async start(){  
        console.log("server started")
        //TODO: Enviar correos
        // new SendEmailLogs(
        // emailService, 
        // fileSystemLogRepository
        // ).execute(
        //     ["daniel20001989@gmail.com","daniel20001989@hotmail.com"
        //     ])
        

const logs = await logRepository.getLogs(LogSeverityLevel.Low)
console.log(logs)
        
        // CronServices.createJob('*/5 * * * * *', () => {
        //     const url = 'https://www.google.com.co'
        //     new CheckService(
        //         logRepository,
        //         () => console.log(`${ url } is ok `),
        //         (error) => console.log(error)
        //     ).execute( url )
        // });
    }  
 }