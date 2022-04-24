import { Body, Controller, HttpCode, Post, Request } from "@nestjs/common";

import User from "src/models/User";
import { AuthService } from "src/services/auth/auth.service";



@Controller('auth')
export default class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }


    @HttpCode(200)
    @Post('login')
    public async login(@Body() body): Promise<{accessToken: string}> {
        return this.authService.login(body.login, body.password);
    }
}