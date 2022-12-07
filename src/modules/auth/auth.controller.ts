import { Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../user/dto/CreateUser.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { IReadableUser } from './interface/readable-user.interface';

@ApiTags('user')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signUp')
    async signUp(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO): Promise<string> {
        return this.authService.signUp(createUserDTO);
    }

    @Post('/signIn')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDTO) : Promise<IReadableUser> {
        return await this.authService.signIn(signInDto);
    }

}
