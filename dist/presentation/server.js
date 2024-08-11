"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const envs_plugin_1 = require("../config/plugins/envs.plugin");
const file_system_datasource_1 = require("../infrastructure/datasources/file-system.datasource");
const log_impl_repository_1 = require("../infrastructure/repositories/log-impl.repository");
const email_services_1 = require("./email/email.services");
const fileSystemLogRepository = new log_impl_repository_1.LogRepositoryImpl(new file_system_datasource_1.FileSystemDatasource());
class Server {
    static start() {
        console.log("server started");
        const emailService = new email_services_1.EmailService();
        emailService.sendEmailWithFileSystemLogs(["daniel20001989@gmail.com", "daniel20001989@gmail.com"]);
        console.log(envs_plugin_1.envs.MAILER_SECRET_KEY, envs_plugin_1.envs.MAILER_EMAIL);
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
exports.Server = Server;
