import { HttpException, HttpStatus, Injectable }  from "@nestjs/common";
import { JwtService }  from "@nestjs/jwt";
import { SHA512 } from "crypto-js";
import Token from "src/models/Token";
import User from "src/models/User";
import { UserService } from "../user.service";
import authConst from "./auth.const";


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService : JwtService
    ) { }


    public async login(login: string, password: string, userAgent: string): Promise<{accessToken: string, refreshToken: string, token: Token}> {
        
        const user = await this.validateUser(login, password);

        const tokens: { accessToken: string, refreshToken: string } = await this.createJwt(user);
        
        let token: Token;

        try {
            token = await Token.findOne({where: {
                userId: user.id,
                client: userAgent,
            }});
        } catch (error) {
            console.error(error);
        }

        if(token == undefined) {
            token = Token.build({
                token    : tokens.refreshToken,
                client   : userAgent,
                userId   : user.id,
                expiredIn: 1000 * 60 * 60,
            });
        } else {
            token.set('token',     tokens.refreshToken);
            token.set('client',    userAgent);
            token.set('userdId',   user.id);
            token.set('expiredIn', 1000 * 60 * 60)
        } 

        try {
            await token.save();
        } catch (error) {
            console.error(error);   
        }

        return {
            accessToken : tokens.accessToken,
            refreshToken: tokens.refreshToken,
            token       : token,
        };
    }

    public async updateToken(userAgent: string, cookieToken: string) {

        const payload: {id: number, login: string} = this.jwtService.decode(cookieToken) as {id: number, login: string};

        console.log(payload);

        const token: Token = await Token.findOne({where: {
            userId: payload.id,
            client: userAgent,
        }});


        token.set('expiredIn', token.get('expiredIn') - 1000 * 60)
    }


    private async createJwt(user: User): Promise<{accessToken: string, refreshToken: string}> {
        
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