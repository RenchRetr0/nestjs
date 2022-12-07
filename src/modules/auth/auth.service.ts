import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as lodash from 'lodash';
import moment = require('moment');

import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/dto/CreateUser.dto';
import { CreateUserTokenDto } from '../token/dto/CreateUserToken.dto';
import { IUser } from '../user/interfaces/user.interface';
import { SignInDTO } from './dto/signin.dto';
import { IReadableUser } from './interface/readable-user.interface';
import { userSensitiveFieldsEnum } from '../user/enums/protected-fields.enum';
import { IUserToken } from '../token/interfaces/user-token.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async signUp(createUserDto: CreateUserDTO): Promise<string> {
        await this.userService.create(createUserDto);
        return "You are registered";
    }

    async signIn({ email, password }: SignInDTO): Promise<IReadableUser> {
        const user = await this.userService.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await this.signUser(user);

            const readableUser = user.toObject() as IReadableUser;
            readableUser.accessToken = token;

            return lodash.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;
        }
        throw new BadRequestException('Invalid creadentials');
    }

    async signUser(user: IUser): Promise<string> {
        const getTokenBD: IUserToken = await this.tokenService.searchExists(user._id);
        const existsToken: string = await this.termToken(getTokenBD, user);
        
        if (existsToken) {
            return existsToken;
        }

        const tokenPayload = { _id: user._id, roles: user.roles };

        const token = await this.generateToken(tokenPayload);
        const expireAt = moment()
            .add(1, 'day')
            .toISOString();

        await this.saveToken({
            token,
            expireAt,
            userId: user._id,
        });

        return token;
    }

    async termToken(existsToken: IUserToken | null, user: IUser): Promise<string | null> {
        if (existsToken) {
            const nowDate: Date = new Date();
            const dataToken: Date = new Date(existsToken.expireAt);

            if (dataToken < nowDate){
                await this.tokenService.delete(user._id);
            }

            if(existsToken && dataToken >= nowDate) {
                return existsToken.token;
            }
        }

        return null;
    }

    private async generateToken(data, options?: SignOptions) : Promise<string>{
        return this.jwtService.sign(data, options);
    }

    private async saveToken(createUserTokenDto: CreateUserTokenDto) {
        return await this.tokenService.create(createUserTokenDto);
    }
}
