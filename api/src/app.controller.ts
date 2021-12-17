import {Body, Controller, Get, HttpStatus, Post, Redirect, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from './users/users.service'
import {
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {SwaggerError, SwaggerSuccessfulResponsePost} from "./swagger/swagger.dto";
import {Request, Response} from "express";
import {CreateUserDTO} from "./users/DTO/create-user.dto"
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
    }

    @Get('/')
    @Redirect('/api')
    @ApiTags('Documentation')
    @ApiOperation({
        summary: 'TCM-API documentation.',
        description: 'Redirect to the API documentation.'
    })
    async getCrypto(@Req() req: Request) {
    }

    @ApiTags('Users')
    @ApiOperation({
        summary: 'sign up a new user.',
        description: 'Create a new user with his info.'
    })
    @ApiResponse({ status: 201, type: SwaggerSuccessfulResponsePost, description: 'The request was successful' })
    @Post('/users/register')
    async signUp(@Req() req: Request, @Body() createUserDTO: CreateUserDTO, @Res() res: Response) {

        const resp: any = await this.usersService.createUser(createUserDTO)
        const {id, email} = resp
        if (id && email) { // User has been successfully created. Return a JWT
            const user = await this.usersService.findUserById(id)
            const {access_token} = this.authService.generateJWT({id, email})
            const response = {
                access_token,
                user
            }
            res.status(HttpStatus.CREATED).send(response).end()
        } else
            res.status(HttpStatus.CREATED).send(resp).end()
    }
}
