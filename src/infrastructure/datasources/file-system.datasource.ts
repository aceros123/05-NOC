import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{
    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/log-all.log'
    private readonly mediumLogsPath = 'logs/log-medium.log'
    private readonly highLogsPath = 'logs/log-high.log'

    constructor() {
        this.createLogsFile();
    }


    private createLogsFile = () => {
        if( !fs.existsSync(this.logPath ) ){
            fs.mkdirSync( this.logPath )
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ]
        .forEach( path => {
            if( !fs.existsSync(path) ) return ;

               //fs.writeFileSync(path, '')
            
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync( this.allLogsPath,logAsJson );
        if(newLog.level === LogSeverityLevel.Low)return
        if(newLog.level === LogSeverityLevel.Medium){
            fs.appendFileSync(this.mediumLogsPath , logAsJson );
        }
        {
            fs.appendFileSync(this.highLogsPath , logAsJson );
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
           log => LogEntity.fromJson(log)
        );
        return logs;
    }
    async getLogs(Severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (Severitylevel) {
            case LogSeverityLevel.Low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.Medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.High:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${Severitylevel} no implementado`);
        }
    }

}