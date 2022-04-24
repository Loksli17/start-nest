import { Injectable }  from "@nestjs/common";
import User            from "src/models/User";
import { UserService } from "../user.service";
import { SHA512 }      from "crypto-js";
import { JwtService }  from '@nestjs/jwt';
import AuthConst       from "./auth.const";


@Injectable()
export class AuthService {

    private readonly userService: UserService = new UserService();

    private readonly jwtService: JwtService = new JwtService({
        secret     : AuthConst.secret,
        signOptions: { expiresIn: AuthConst.expiresIn },
    });


    public async validate(login: string, pass: string): Promise<User | null> {

        const user: User | undefined = await this.userService.getOne(login);

        if(user && user.password === SHA512(pass).toString()) {
            return user;
        }

        return null
    }


    public createJWT(user: User): string {
        
        const payload = {
            login: user.get('login'),
            id   : user.get('id'), 
        }
        
        return this.jwtService.sign(payload);
    }

}