import {Injectable, HttpException, HttpStatus} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {CreateUserDTO} from "../users/DTO/create-user.dto";
import {compare} from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, pw: string): Promise<any> {

        const user = await this.usersService.findUserByEmail(email);
        if (user && user.password && await compare(pw, user.password)) {
            return user;
        }
        return null;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<any> {
        const resp = await this.usersService.createUser(createUserDTO);

        if (resp === null) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Unable to create user '${createUserDTO.email}'`
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return resp;
    }

    generateJWT(user: any): any {
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
