import { SequelizeModule } from "@nestjs/sequelize"
import Article             from "src/models/Article";
import Tag                 from "src/models/Tag";
import config              from ".";
import Task                from './../models/Task';
import TaskType            from "./../models/TaskType";


export default SequelizeModule.forRoot({
    dialect : 'mysql',
    host    : config.db.host,
    port    : config.db.port,
    password: config.db.password,
    database: config.db.name,
    username: config.db.user,
    models  : [Task, TaskType, Tag, Article],
    logging : false,
});