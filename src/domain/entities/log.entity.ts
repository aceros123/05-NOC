export enum LogSeverityLevel{
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}
export interface LogEntityOptions{
    level:LogSeverityLevel;
    message:string;
    createdAt:Date;
    origin:string;
}

export class LogEntity{
    public level:LogSeverityLevel;
    public message:string;
    public createdAt:Date;
    public origin:string;

    constructor(options: LogEntityOptions){
        const {message, level,origin, createdAt=new Date() } = options
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json
       const { message, level, createdAt,origin } = JSON.parse(json);
       

       const log = new LogEntity({message:message, level:level, createdAt:createdAt, origin:origin});

       log.createdAt = new Date(createdAt);
       return log

    }

    static fromObjet = (object: {[key: string]: any}): LogEntity => {
        const {message, level, createdAt, origin} = object
        const log =  new LogEntity({message,level, createdAt, origin});
        return log
    }
}