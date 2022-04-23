import { Body, Controller, Post } from "@nestjs/common";
import User from "src/models/User";
import { AuthService } from "src/services/auth.service";
import { UserService } from "src/services/user.service";


@Controller('auth')
export default class AuthController {

    private readonly authService: AuthService = new AuthService(new UserService());


    @Post('login')
    public async login(@Body() body): Promise<{token: string}> {

        const user: User | null = await this.authService.validate(body.login, body.password);
        
        

        return {
            token: ""
        }
    }
}