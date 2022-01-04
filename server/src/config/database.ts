import { SequelizeModule } from "@nestjs/sequelize"
import config              from ".";
import Task                from './../models/Task';

export default SequelizeModule.forRoot({
    dialect : 'mysql',
    host    : config.db.host,
    port    : config.db.port,
    password: config.db.password,
    database: config.db.name,
    username: config.db.user,
    models  : [Task],
});