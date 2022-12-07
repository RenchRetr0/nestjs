import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenSchema = HydratedDocument<Token>

@Schema()
export class Token {
    @Prop({ type: String, required: true })
    token: string;

    @Prop({ type: String, required: true, ref: 'User' })
    userId: string;
    
    @Prop({ type: Date, required: true })
    expireAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token).index({ token: 1, userId: 1 }, { unique: true });