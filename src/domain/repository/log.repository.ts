import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository{
    
   abstract saveLog(Log:LogEntity): Promise<void>;
   abstract getLogs(Severitylevel: LogSeverityLevel):Promise<LogEntity[]>

;}  