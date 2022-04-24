import { Module }      from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthController  from "src/controllers/auth.controller";
import authConst from "src/services/auth/auth.const";
import { AuthService } from "src/services/auth/auth.service";
import { UserModule } from "./user.module";

@Module({
    controllers: [
        AuthController,
    ],

    providers: [
        AuthService
    ],

    imports: [
        UserModule,
        JwtModule.register({
            secret: authConst.secret,
            signOptions: {
                expiresIn: authConst.expiresIn,
            }
        })
    ]
})
export class AuthModule {

}