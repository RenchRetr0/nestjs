import { Injectable } from '@nestjs/common';
import moment = require('moment');
import { FilterQuery, ObjectId, Types } from 'mongoose';

import { IUser } from '../user/interfaces/user.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostRepository } from './repository/post.repository';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    async getPosts(): Promise<Post[]> {
        return await this.postRepository.find({});
    }

    async create(createPostDto: CreatePostDTO, user: IUser): Promise<Post> {
        const { title, description } = createPostDto;
        const author: Types.ObjectId = user._id
        const created_at = Date.now();
        const createPost: Post = { title, description, author, created_at}
        // const post: IPost = { title, description, userId, created_at}

        return await this.postRepository.create(createPost);

        // return await this.postRepository.create({
        //     title,
        //     description,
        //     author: user._id,
        //     created_at: Date.now()
        // })
    }

    // async updatePost(postId: string, postUpdates: ): Promise<Post> {
    //     return await this.postRepository.findOneAndUpdate(postId, postUpdates);
    // }

    async findOne(postFilterQuery: FilterQuery<Post>): Promise<Post> {
        return await this.postRepository.findOne(postFilterQuery);
    }
}
