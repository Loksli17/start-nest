import { Injectable } from "@nestjs/common";
import User           from "src/models/User";


@Injectable()
export class UserService {

    public async getOne(login: string): Promise<User | undefined> {
        return await User.findOne({where: {login: login}});
    }
}