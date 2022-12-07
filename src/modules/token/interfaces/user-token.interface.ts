import { Document } from 'mongoose';
import { ObjectID } from 'typeorm';

export interface IUserToken extends Document {
  readonly token: string;
  readonly userId: ObjectID;
  readonly expireAt: string;
}