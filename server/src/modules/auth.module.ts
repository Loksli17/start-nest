import { forwardRef, Module } from "@nestjs/common";
import { JwtModule }          from "@nestjs/jwt";
import { PassportModule }     from "@nestjs/passport";
import AuthController         from "src/controllers/auth.controller";
import authConst              from "src/services/auth/auth.const";
import { AuthService }        from "src/services/auth/auth.service";
import { JwtStrategy }        from "src/services/auth/jwt.strategy";
import { UserModule }         from "./user.module";


@Module({
    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtStrategy,
    ],

    imports: [
        forwardRef(() => UserModule),

        PassportModule,

        JwtModule.register({
            secret: authConst.secret,
            signOptions: {
                expiresIn: authConst.expiresIn,
            }
        })
    ],

    exports: [
        AuthService, 
        JwtModule,
    ]
})
export class AuthModule {

}