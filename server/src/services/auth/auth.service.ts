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

        const result: Record<string, any> = {};

        const payload: {id: number, login: string} = this.jwtService.decode(cookieToken) as {id: number, login: string};
        
        const token: Token | undefined = await Token.findOne({where: {
            userId: payload.id,
            client: userAgent,
        }});

        if(token == undefined){
            result.msg = "refreshToken expired";
            return result;
        }

        if(token.get('token') !== cookieToken){
            result.msg = "refreshToken expired";
            return result;
        }

        try {
            this.jwtService.verify(cookieToken);
        } catch (error) {
            result.msg = "refreshToken expired";
            return result;    
        }

        let user: User;
        try {
            user = await User.findOne({where: {id: payload.id}});
        } catch (error) {
            console.error(error);
        }
        
        const newTokens = await this.createJwt(user);

        console.log(newTokens);

        token.set('expiredIn', token.get('expiredIn') - 1000 * 60);
        token.set('token', newTokens.refreshToken);

        try {
            await token.save();
        } catch (error) {
            console.error(error);
        }
        
        result.msg = "success";
        result.accessToken  = newTokens.accessToken;
        result.refreshToken = newTokens.refreshToken;
        
        result.refreshTokenExpiredIn = token.get('expiredIn') - 1000 * 60;
        
        return result;
    }


    private async createJwt(user: User): Promise<{accessToken: string, refreshToken: string}> {

        console.log(user);
        
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