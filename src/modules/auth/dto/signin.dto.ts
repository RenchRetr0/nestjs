import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDTO {
    @IsEmail()
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @ApiProperty({example: 'test@mail.ru', description: 'Уникальная электронная почта.'})
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @ApiProperty({example: 'Jackson6!', description: 'Сложный пароль.'})
    password: string
}