import { Injectable }  from "@nestjs/common";
import User            from "src/models/User";
import { UserService } from "./user.service";
import { SHA512 }      from "crypto-js";
import { JwtService }  from '@nestjs/jwt';


@Injectable()
export class AuthService {

    private readonly userService: UserService = new UserService();

    private readonly jwtService: JwtService = new JwtService({
        secret     : 'Rukav kakashka',
        signOptions: { expiresIn: '60s' },
    });

    public async validate(login: string, pass: string): Promise<User | null> {

        const user: User | undefined = await this.userService.getOne(login);

        if(user && user.password === SHA512(pass).toString()) {
            return user;
        }

        return null
    }


    public createJWT(user: User){
        
        const payload = {
            login: user.get('login'),
            id   : user.get('id'), 
        }
        
        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}