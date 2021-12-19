import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {jwtConstants} from "./constants";
import {AuthService} from "./auth.service";
import {log} from "util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        return {id: payload.sub, email: payload.email}
    }
}

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwtAdmin') {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        const {sub} = payload
        const user = await this.usersService.findUserById(sub)
        if (user.role === "Admin") {

            return user
        } else {
            throw new UnauthorizedException()
        }
    }
}
