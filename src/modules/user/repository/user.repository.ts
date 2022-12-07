import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from 'mongoose';

import { User } from "../schemas/user.schema";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(userFilterQuery);
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(userFilterQuery: string, user: Partial<User>): Promise<User> {
        return this.userModel.findByIdAndUpdate(userFilterQuery, user, { new: true });
    }
}