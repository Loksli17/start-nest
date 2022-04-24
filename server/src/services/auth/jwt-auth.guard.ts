import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const req = context.switchToHttp().getRequest();
        
        try {
            const authHeader: string = req.headers.authorization;
            const bearer: string = authHeader.split(' ')[0];
            const token : string = authHeader.split(' ')[1];

            console.log(bearer, token);

            if(bearer !== "Bearer" || !token){
                throw new UnauthorizedException("User has not been authorized!");
            }

            const payload: {id: number, login: string} = this.jwtService.verify(token);
            req.payload = payload;

            return true;
        } catch (error) {
            throw new UnauthorizedException("User has not been authorized!");
        }
    }

}