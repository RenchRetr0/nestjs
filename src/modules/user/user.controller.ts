import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../components/decorators/get-user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/update')
      async updateUser(@Body() updateUserDto: UpdateUserDto, @GetUser() user): Promise<User> {
      return this.userService.updateUser(user._id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user')
    async findOne(@GetUser() user): Promise<User> {
      const userId = user._id;
      return this.userService.findOne({userId});
    }
}
