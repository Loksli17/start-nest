import { Body, Controller, HttpCode, Post, Request } from "@nestjs/common";

import User from "src/models/User";



@Controller('auth')
export default class AuthController {


    // constructor(
    //     private readonly authService: AuthService
    // ) { }


    @HttpCode(200)
    @Post('login')
    public async login(@Body() body): Promise<{accessToken: string}> {
        

        return {
            accessToken: 'kek'
        };
    }
}