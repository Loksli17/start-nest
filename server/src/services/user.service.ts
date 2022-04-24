import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User                                      from "src/models/User";
import { SHA512 }                                from "crypto-js";
import { where } from "sequelize/dist";

@Injectable()
export class UserService {

    public async getOneByLogin(login: string): Promise<User | undefined> {
        return await User.findOne({where: {login: login}});
    }


    // public async findForAuth(login: string, pass: string): Promise<User> {
    //     const user: User = await User.findOne({where: {login: login}});

    //     if(!user){
    //         throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    //     }

    //     if(user.password !== SHA512(pass).toString()) {
    //         throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    //     }

    //     return user;
    // }


    // public async findByPayload(payload: JwtPayload) {
    //     return await User.findOne({where: {
    //         id   : payload.id,
    //         login: payload.login, 
    //     }});
    // }
}