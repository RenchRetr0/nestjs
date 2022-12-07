import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { FilterQuery } from 'mongoose';

import { CreateUserDTO } from './dto/CreateUser.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './repository/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { Role } from './enums/role.enum';

@Injectable()
export class UserService {
    private readonly saltRounds = 10;

    constructor(private readonly usersRepository: UserRepository){}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({});
    }

    async create(createUserDto: CreateUserDTO): Promise<User> {
        const passwordHash = await this.hashPassword(createUserDto.password);
        const { login, email, age} = createUserDto;

        const roles = await this.setRole();

        return await this.usersRepository.create({
            login,
            email,
            age,
            roles: roles,
            password: passwordHash,
        })
    }

    private async setRole(): Promise<string> {
        const users = await this.getUsers();
        if (users.at(0)) {
            return Role.USER;
        }
        return Role.ADMIN;
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return await this.usersRepository.findOneAndUpdate(userId, userUpdates);
    }

    async findOne(userFilterQuery: FilterQuery<User>): Promise<IUser> {
        return await this.usersRepository.findOne(userFilterQuery) as IUser;
    }
}
