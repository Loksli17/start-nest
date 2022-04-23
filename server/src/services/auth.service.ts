import { Injectable }  from "@nestjs/common";
import User            from "src/models/User";
import { UserService } from "./user.service";
import { SHA512 }    from "crypto-js";


@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}


    public async validate(login: string, pass: string): Promise<User | null> {

        const user: User | undefined = await this.userService.getOne(login);

        if(user && user.password === SHA512(pass).toString()) {
            return user;
        }

        return null
    }
}