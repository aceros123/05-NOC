"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronServices = void 0;
const cron_1 = require("cron");
class CronServices {
    static createJob(cronTime, onTick) {
        const job = new cron_1.CronJob(cronTime, onTick);
        job.start();
        return job;
    }
}
exports.CronServices = CronServices;
