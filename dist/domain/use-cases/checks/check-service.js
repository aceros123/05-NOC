"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
const log_entity_1 = require("../../entities/log.entity");
class CheckService {
    constructor(logRepository, successCallback, errorCallback) {
        this.logRepository = logRepository;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }
    execute(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const req = yield fetch(url);
                if (!req.ok) {
                    throw new Error(`Error en check services ${url}`);
                }
                const log = new log_entity_1.LogEntity({
                    message: `Services ${url} working`,
                    level: log_entity_1.LogSeverityLevel.Low,
                    origin: 'CheckService',
                    createdAt: new Date
                });
                this.logRepository.saveLog(log);
                this.successCallback && this.successCallback();
                return true;
            }
            catch (error) {
                const errorMessage = `${url} is not ok. ${error}`;
                const log = new log_entity_1.LogEntity({
                    message: errorMessage,
                    level: log_entity_1.LogSeverityLevel.High,
                    origin: 'CheckService',
                    createdAt: new Date
                });
                this.logRepository.saveLog(log);
                this.errorCallback && this.errorCallback(`${error}`);
                return false;
            }
        });
    }
}
exports.CheckService = CheckService;
