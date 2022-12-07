import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserTokenDto } from './dto/CreateUserToken.dto';
import { IUserToken } from './interfaces/user-token.interface';

@Injectable()
export class TokenService {
    constructor(@InjectModel('Token') private readonly tokenModel: Model<IUserToken>,) {}

    async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
        const userToken = new this.tokenModel(createUserTokenDto);
        return await userToken.save()
    }

    async delete(userId: string): Promise<any> {
        return await this.tokenModel.deleteOne({ userId })
    }

    async deleteAll(userId: string): Promise<any> {
        return await this.tokenModel.deleteMany({ userId });
    }

    async exists(token: string): Promise<any> {
        return await this.tokenModel.exists({ token });
    }

    async searchExists(userId: string): Promise<any> {
        return await this.tokenModel.findOne({ userId }).exec();
    }
}
