import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Schema} from "mongoose";
import {genSalt, hash} from "bcrypt";
import {User, UserSchema} from "./users.schema";
import {CreateUserDTO} from "./DTO/create-user.dto";
import {ObjectId} from "mongodb";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        this.userModel = this.userModel.discriminator("user", UserSchema);
    }

    findUserByName(username: string): Promise<User | undefined> {
        return this.userModel.findOne({username: username}).exec();
    }

    findUserByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({email: email}).exec();
    }

    findUserById(id: string, populate?: any): Promise<User | undefined> {
        if (populate) {
            return this.userModel.findOne({_id: id}).populate(populate).exec()
        }
        return this.userModel.findOne({_id: id}).exec() // A query is not a fully-fledged promise, but it does have a `.then()`. `.exec()` gives you a fully-fledged promise.
    }

    async setProfile(id: string, {cryptofav, devise, firstname, lastname, password, email}): Promise<{ err: string }> {
        let user

        try {
            user = await this.findUserById(id)
        } catch (err) {
            throw err
        }

        if (user) {

            if (firstname)
                user.firstname = firstname

            if (lastname)
                user.lastname = lastname

            if (email)
                user.email = email

            if (devise)
                user.devise = devise

            if (cryptofav)
                user.cryptofav = cryptofav

            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt)

            if (password)
                user.password = hashedPassword

            await user.save()

            return user
        }
        return {
            err: 'USER_NOT_FOUND'
        }
    }

    findUserByGoogleId(id: string, populate?: any): Promise<User | undefined> {
        if (populate) {
            return this.userModel.findOne({ google_id: id }).populate(populate).exec()
        }
        return this.userModel.findOne({ google_id: id }).exec() // A query is not a fully-fledged promise, but it does have a `.then()`. `.exec()` gives you a fully-fledged promise.
    }

    async deleteUser(id: string): Promise<{ err: string }> {
        let user

        try {
            user = await this.findUserById(id)

            if (!user) {
                return {
                    err: 'USER_NOT_FOUND'
                }
            }
        } catch (err) {
            throw err
        }

        try {
            user = await user.deleteOne()
        } catch (err) {
            throw err
        }

        return {
            err: 'USER_ACCOUNT_DELETED'
        }
    }

    findUsers(query: any, populate?: any): Promise<User[] | undefined> {
        if (populate) {
            return this.userModel
                .find(query)
                .populate(populate)
                .exec()
        }

        return this.userModel.find(query).exec() // A query is not a fully-fledged promise, but it does have a `.then()`. `.exec()` gives you a fully-fledged promise.
    }

    async getUsers(): Promise<any | { err: string }> {
        let users
        try {
            users = this.findUsers({})
        } catch (err) {
            throw err
        }
        return users
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User | { err: string }> {
        const {err} = await this.validateUserParams(createUserDTO);

        if (err !== "VALID_USER_PARAMS")
            return {err};

        let {firstname, lastname, email, password} = createUserDTO;

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        let user = new this.userModel({
            ...createUserDTO,
            role: "User",
            password: hashedPassword,
            cryptofav: "btc",
            devise: "EUR",
            _id: new ObjectId(),
        });
        user.phone = "";
        return await user.save();
    }

    async validateUserParams(createUserDTO: CreateUserDTO): Promise<{ err: string }> {

        const {password, email, firstname, lastname, phone} = createUserDTO;

        if (!password)
            return {err: "INVALID_PASSWORD"};

        if (!email)
            return {err: "INVALID_EMAIL"};

        if (!firstname)
            return {err: "INVALID_FIRSTNAME"};

        if (!lastname)
            return {err: "INVALID_LASTNAME"};

        let user: User;

        try {
            user = await this.findUserByEmail(email);
        } catch (err) {
            throw err;
        }

        if (user)
            return {err: "USER_ALREADY_EXISTS"};

        return {err: "VALID_USER_PARAMS"};
    }

    async storeGoogleProfile(createUserDTO: CreateUserDTO): Promise<any> {
        console.log(createUserDTO);
        return await this.userModel.insertMany(createUserDTO);
    }

    async findGoogleProfile(email: string): Promise<any> {
        return await this.userModel.findOne({ email: { $eq: email  }}).exec();
    }
}
