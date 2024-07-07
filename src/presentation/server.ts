import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronServices } from "./cron/cron-services"

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);


export class Server{
    public static start(){  
        console.log("server started")

        CronServices.createJob('*/5 * * * * *', () => {
            const url = 'https://www.google.com'
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`${ url } is ok `),
                (error) => console.log(error)
            ).execute( url )
        });
    }  
 }