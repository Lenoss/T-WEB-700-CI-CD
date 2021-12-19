import {Controller, Delete, Get, HttpStatus, Param, Put, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtAdminAuthGuard, JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Request, Response} from "express";
import {SwaggerError, SwaggerSuccessfulResponseDelete, SwaggerSuccessfulResponseGet} from "../swagger/swagger.dto";
import {AuthService} from "../auth/auth.service";

import {
    ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse,
    ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ObjectId} from "mongodb";

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {
    }

    /*******************************************  ADMIN  ********************************************/

    @UseGuards(JwtAdminAuthGuard)
    @Get('/')
    @ApiTags('Admin')
    @ApiOperation({summary: 'Get users profile'})
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The user doesn\'t exist'})
    async getUsers(@Req() req: Request) {
        return await this.usersService.getUsers()
    }

    @UseGuards(JwtAdminAuthGuard)
    @Delete('/:id')
    @ApiTags('Admin')
    @ApiOperation({summary: 'Delete user profile'})
    @ApiParam({name: 'id', type: String, description: 'User ID'})
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The user doesn\'t exist'})
    async deleteUser(@Req() req: Request, @Param('id') id: string) {
        return await this.usersService.deleteUser(id)
    }

    @UseGuards(JwtAdminAuthGuard)
    @Put('/:id/set-admin')
    @ApiTags('Admin')
    @ApiOperation({summary: 'Set admin role'})
    @ApiParam({name: 'id', type: String, description: 'User ID'})
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The user doesn\'t exist'})
    async setAdmin(@Req() req: Request, @Param('id') id: string, @Res() res: Response, ) {
        let user =  await this.usersService.findUserById(id)
        user.role = "Admin"
        await user.save()
        if (user)
            return res.status(HttpStatus.CREATED).json({msg: "Role admin set"}).end()
        else
            return res.status(HttpStatus.NOT_FOUND).json({msg: "User not found"}).end()
    }

    /************************************************  USERS  **************************************************/

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    @ApiTags('Users')
    @ApiOperation({summary: 'Get user profile', description: 'Show the users profile with its information.'})
    @ApiResponse({ status: 200, type: SwaggerSuccessfulResponseGet, description: 'The request was successful' })
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The user doesn\'t exist'})
    async getProfile(@Req() req: Request) {
        const {id} = (req.user as any)
        return await this.usersService.findUserById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/profile')
    @ApiTags('Users')
    @ApiOperation({summary: 'Delete user profile', description: 'Delete a user in our platform'})
    @ApiResponse({ status: 204, type: SwaggerSuccessfulResponseDelete, description: 'The request was successful' })
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The user doesn\'t exist'})
    async deleteProfile(@Req() req: Request) {
        const {id} = (req.user as any)
        return await this.usersService.deleteUser(id)
    }

    @ApiTags('Users')
    @ApiOperation({summary: 'Update user profile'})
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The user doesn\'t exist'})
    @UseGuards(JwtAuthGuard)
    @Put('/profile')
    async setProfile(@Req() req: Request, @Res() res: Response,) {
        const {id} = (req.user as any)
        const params = req.body
        const profile = await this.usersService.setProfile(id, params)
        if (profile)
            return res.status(HttpStatus.CREATED).json({msg: {profile: profile, message: "USER_UPDATED"}}).end()
        else
            return res.status(HttpStatus.NOT_FOUND).json({msg: "User not found"}).end()
    }
}