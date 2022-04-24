import { Module }      from "@nestjs/common";
import AuthController  from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth/auth.service";
import { JwtStrategy } from "src/services/auth/jwt.strategy";



@Module({
    
    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule {}