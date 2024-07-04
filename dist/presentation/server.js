"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const check_service_1 = require("../domain/use-cases/checks/check-service");
const cron_services_1 = require("./cron/cron-services");
class Server {
    static start() {
        console.log("server started");
        cron_services_1.CronServices.createJob('*/5 * * * * *', () => {
            const url = 'https://www.amanecer.org.co';
            new check_service_1.CheckService(() => console.log('success'), (error) => console.log(error)).execute(url);
        });
    }
}
exports.Server = Server;
