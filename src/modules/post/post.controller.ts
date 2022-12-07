import { Body, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../components/decorators/get-user.decorator';
import { Role } from '../user/enums/role.enum';
import { IUser } from '../user/interfaces/user.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('admin', Role.ADMIN)
    @Post('/create')
    async createPost(@Body() createPostDto: CreatePostDTO, @GetUser() user: IUser) {
        return this.postService.create(createPostDto, user);
    }
}
