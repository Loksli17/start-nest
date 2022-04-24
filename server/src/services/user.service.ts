import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User                                      from "src/models/User";
import { SHA512 }                                from "crypto-js";
import { where } from "sequelize/dist";


@Injectable()
export class UserService {

    public async getOneByLogin(login: string): Promise<User | undefined> {
        return await User.findOne({where: {login: login}});
    }

}