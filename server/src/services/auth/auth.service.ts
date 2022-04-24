import { HttpException, HttpStatus, Injectable }  from "@nestjs/common";
import { JwtService }  from "@nestjs/jwt";
import { SHA512 } from "crypto-js";
import User from "src/models/User";
import { UserService } from "../user.service";
import authConst from "./auth.const";


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService : JwtService
    ) { }


    public async login(login: string, password: string): Promise<{accessToken: string}> {
        
        const user = await this.validateUser(login, password);

        return this.createJwt(user);
    }


    public async createJwt(user: User) {
        
        const payload: {login: string, id: number} = {
            login: user.get('login'),
            id   : user.id,
        }
        
        return {
            accessToken : this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {secret: authConst.secret, expiresIn: '1d'}),
        }
    }


    private async validateUser(login: string, password: string) {
        
        const user: User = await this.userService.getOneByLogin(login);
        
        if(!user){
            throw new HttpException('User was not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        if(user.get('password') !== SHA512(password).toString()) {
            throw new HttpException('Password is not correct', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return user;
    }
}