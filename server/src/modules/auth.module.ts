import { Module }      from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import AuthController  from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth/auth.service";
import { JwtStrategy } from "src/services/auth/jwt.strategy";
import { UserService } from "src/services/user.service";
import AuthConst       from "./../services/auth/auth.const";


@Module({

    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property       : 'user',
            session        : false,
        }),
        JwtModule.register({
            secret     : AuthConst.secret,
            signOptions: { expiresIn: AuthConst.expiresIn },
        })
    ],
    
    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtStrategy,
    ],

    exports: [
        PassportModule,
        JwtModule,
    ]
})
export class AuthModule {}