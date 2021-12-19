import {Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Request, Response} from "express";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./jwt-auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { SwaggerLogin } from '../swagger/swagger.dto';
import { AuthGuard } from "@nestjs/passport";
import { GoogleOauthGuard } from "./google-oauth.guard";

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService) {
    }

    @UseGuards(LocalAuthGuard)
    @ApiTags('Auth')
    @Post("/users/login")
    @ApiOperation({
        summary: 'Sign up a user.',
        description: 'Send a token if user credentials are correct.'
    })
    @ApiResponse({ status:200, type: SwaggerLogin, description: 'The request was successful' })
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

    @Get('/users/auth/google')
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Req() req) { }

    @Get('/users/auth/google/callback')
    @UseGuards(GoogleOauthGuard)
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req)
    }
}
