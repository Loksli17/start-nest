import { Injectable }           from "@nestjs/common";
import { PassportStrategy }     from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import AuthConst                from "./auth.const";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey     : AuthConst,
        })
    }

    public async validate(payload: {id: number, login: string}) {
        console.log('strategy:', payload);
        return {id: payload.id, login: payload.login};
    }
}