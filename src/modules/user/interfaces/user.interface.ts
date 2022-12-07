import { Document } from "mongoose";

export interface IUser extends Document {
    readonly login: string;
    readonly email: string;
    readonly age: number;
    readonly roles: string;
    readonly password: string;
}