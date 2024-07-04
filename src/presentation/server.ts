import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronServices } from "./cron/cron-services"


export class Server{
    public static start(){  
        console.log("server started")

        CronServices.createJob('*/5 * * * * *', () => {
            const url = 'https://www.amanecer.org.co'
            new CheckService(
                () => console.log(`${ url } is ok `),
                (error) => console.log(error)
            ).execute( url )
        });
    }  
 }