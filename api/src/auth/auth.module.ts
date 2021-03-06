import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtAdminStrategy, JwtStrategy} from "./jwt.strategy";
import {LocalStrategy} from "./local.strategy"
import {jwtConstants} from "./constants";
import {AuthController} from "./auth.controller";
import { GoogleStrategy } from "./google.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '604800s'}
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtAdminStrategy,
        GoogleStrategy,
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
