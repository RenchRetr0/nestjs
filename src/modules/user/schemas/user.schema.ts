import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({type: String, unique: true, allowNull: false})
    login: string;

    @Prop({type: String, unique: true, allowNull: false})
    email: string;

    @Prop({type: Number, allowNull: false})
    age: number;

    @Prop({type: String, allowNull: false})
    roles: string;

    @Prop({type: String, allowNull: false})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);