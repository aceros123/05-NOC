import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource{
    async saveLog(log: LogEntity):Promise<void>{
        const newLog = await LogModel.create(log);
        // await newLog.save();
        console.log("Mongo Log created", newLog.id)

    }
    async getLogs(Severitylevel: LogSeverityLevel):Promise<LogEntity[]>{
        
        const logs = await LogModel.find({level: Severitylevel});

        return logs.map( LogEntity.fromObjet);
    }
}