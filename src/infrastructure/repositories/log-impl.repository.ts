
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource
    ){}
    
    saveLog(Log:LogEntity): Promise<void> {
       return this.logDatasource.saveLog(Log)
    }
    getLogs(Severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
       return this.logDatasource.getLogs(Severitylevel)
    }
}