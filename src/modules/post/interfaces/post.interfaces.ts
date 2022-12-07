import { Document, ObjectId } from "mongoose";


export interface IPost extends Document {
    readonly title: string;
    readonly description: string;
    readonly userId: ObjectId;
    readonly created_at: number;
}