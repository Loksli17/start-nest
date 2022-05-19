import { Controller, Post, Request, Res } from "@nestjs/common";
import Token from "src/models/Token";
import { AuthService } from "src/services/auth/auth.service";



@Controller('auth')
export default class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('login')
    public async login(@Request() req, @Res() res){
        
        const serviceResult: { accessToken: string, refreshToken: string, token: Token, userId: number } = 
        await this.authService.login(req.body.login, req.body.password, req.headers['user-agent']);
    
        res.setCookie(
            'refreshToken', 
            serviceResult.refreshToken,
            { 
                maxAge  : serviceResult.token.get('expiredIn'), 
                httpOnly: true, 
                sameSite: 'none', 
                secure  : true 
            }
        );
        
        res.code(200).send({
            accessToken: serviceResult.accessToken,
            userId     : serviceResult.userId,
        })
    }


    @Post('create-tokens')
    public async createTokens(@Request() req, @Res() res): Promise<any> {

        const result = await this.authService.updateToken(req.headers['user-agent'], req.cookies['refreshToken'])

        res.setCookie(
            'refreshToken', 
            result.refreshToken,
            { 
                maxAge  : result.refreshTokenExpiredIn, 
                httpOnly: true, 
                sameSite: 'none', 
                secure  : true 
            }
        )
        
        res.code(200).send({
            accessToken: result.accessToken,
            msg        : result.msg,
        });
    }
}