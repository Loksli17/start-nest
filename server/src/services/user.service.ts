import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import User           from "src/models/User";


@Injectable()
export class UserService {

    public async getOneByLogin(login: string): Promise<User | undefined> {
        return await User.findOne({where: {login: login}});
    }


    public async getOneBySearchLogin(login: string): Promise<Array<User>> {
        return await User.findAll({
            where: {
                login: { 
                    [Op.startsWith]: login
                } 
            },
            attributes: ['id', 'login'],
        });
    }

}