import { Module }      from "@nestjs/common";
import AuthController  from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth/auth.service";
import { UserService } from "src/services/user.service";
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
    ]
})
export class AuthModule {

}