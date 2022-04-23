import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import User                                 from "src/models/User";
import { AuthService }                      from "src/services/auth.service";


@Controller('auth')
export default class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }


    @HttpCode(200)
    @Post('login')
    public async login(@Body() body): Promise<{accessToken: string} | {error: string}> {

        const user: User | undefined = await this.authService.validate(body.login, body.password);

        if(user == undefined) {
            //! change status
            return {
                error: 'Login or password are unexpected!'
            }
        }

        return {
            accessToken: this.authService.createJWT(user),
        }
    }

    @HttpCode(200)
    @Post('check-token')
    public async checkToken(): Promise<any> {

        return {

        }
    }
}