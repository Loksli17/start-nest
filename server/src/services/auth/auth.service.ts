import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";


@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

    public async login(login: string, password: string): Promise<{accessToken: string}> {
        
        return {
            accessToken: 'kek',
        }
    }
}