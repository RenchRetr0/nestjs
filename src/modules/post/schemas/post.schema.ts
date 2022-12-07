import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";


export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({type: String, allowNull: false})
    title: string;

    @Prop({type: String, allowNull: false})
    description: string;

    @Prop({type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    author: Types.ObjectId;
    
    @Prop({ type: Date, required: true, allowNull: false })
    created_at: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);