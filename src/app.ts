import 'dotenv/config'; //permite ver variables de entorno (env)
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import {  MongoDatabase } from './data/mongo';

(async() => {
    main();
})();

async function main() {
await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
})

   
     Server.start();

}