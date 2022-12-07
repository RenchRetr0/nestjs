import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { IPost } from "../interfaces/post.interfaces";
import { Post } from "../schemas/post.schema";

@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async findOne(postFilterQuery: FilterQuery<Post>): Promise<Post> {
        return this.postModel.findOne(postFilterQuery);
    }

    async find(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
        return this.postModel.find(postFilterQuery);
    }

    async create(post: Post): Promise<Post> {
        const newPost = new this.postModel(post);
        return newPost.save();
    }

    async findOneAndUpdate(postFilterQuery: string, post: Partial<Post>): Promise<Post> {
        return this.postModel.findByIdAndUpdate(postFilterQuery, post, { new: true });
    }
}