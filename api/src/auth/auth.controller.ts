import {Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Request, Response} from "express";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./jwt-auth.guard";
import {ApiTags} from "@nestjs/swagger";

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService) {
    }

    @UseGuards(LocalAuthGuard)
    @ApiTags('Auth')
    @Post("/users/login")
    async signIn(@Req() req: Request, @Res() res: Response) {
        const {id} = (req.user as any);

        const account = await this.usersService.findUserById(id);
        if (!account) {
            return res.status(HttpStatus.FORBIDDEN).json({
                Error: "Forbidden, please create your account"
            }).end();
        }
        const {access_token} = await this.authService.generateJWT(account);
        return res.status(HttpStatus.CREATED).json({
            access_token,
            account
        }).end();
    }
}
