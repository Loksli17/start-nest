import { Body, Controller, HttpCode, Post, Request, Res, Response } from "@nestjs/common";
import Token from "src/models/Token";

import User from "src/models/User";
import { AuthService } from "src/services/auth/auth.service";



@Controller('auth')
export default class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('login')
    public async login(@Request() req, @Res() res){
        
        const tokens: { accessToken: string, refreshToken: string, token: Token } = 
        await this.authService.login(req.body.login, req.body.password, req.headers['user-agent']);

        console.log(res);
       
        // res.(
        //     'refreshToken', 
        //     tokens.refreshToken, 
        //     { 
        //         maxAge  : tokens.token.get('expiredIn'), 
        //         httpOnly: true, 
        //         sameSite: 'none', 
        //         secure  : true 
        //     } 
        // );

        res.code(200)
        .setCookie(
            'refreshToken', 
            tokens.refreshToken,
            { 
                maxAge  : tokens.token.get('expiredIn'), 
                httpOnly: true, 
                sameSite: 'none', 
                secure  : true 
            }
        )
        .send({
            accessToken: tokens.accessToken
        })

        // return {
        //     accessToken: tokens.accessToken
        // };
    }

    @HttpCode(200)
    @Post('create-tokens')
    public async createTokens(@Request() req): Promise<any>{

        console.log(req);

        await this.authService.updateToken(req.headers['user-agent'], req.cookies['refreshToken'])
        return
    }
}