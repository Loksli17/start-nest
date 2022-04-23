import { Body, Controller, Post } from "@nestjs/common";
import User                       from "src/models/User";
import { AuthService }            from "src/services/auth.service";


@Controller('auth')
export default class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('login')
    public async login(@Body() body): Promise<{token: string} | {error: string}> {

        const user: User | undefined = await this.authService.validate(body.login, body.password);

        if(user == undefined) {
            return {
                error: 'Login or password are unexpected!'
            }
        }

        this.authService.createJWT(user);

        return {
            token: "token"
        }
    }
}