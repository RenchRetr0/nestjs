import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"

export class CreateUserDTO {

    @IsNotEmpty({ message: 'Login cannot be shorter than five characters' })
    @ApiProperty({example: 'Aleks228', description: 'Уникальный логин.'})
    @Length(5)
    readonly login: string

    @IsEmail()
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @ApiProperty({example: 'test@mail.ru', description: 'Уникальная электронная почта.'})
    readonly email: string

    @IsNotEmpty({ message: 'Age cannot be empty' })
    @ApiProperty({example: '25', description: 'Возраст.'})
    readonly age: number

    @IsNotEmpty({ message: 'Password must be at least 6 characters, must contain 1 special character and number.' })
    @Length(6)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\(\)\[\]\{\}\~?<>;:\\_\/`+=\-\|!@#\$%\^&\*\.])(?=.{8,})/,
        { message: 'Password must be at least 6 characters, must contain 1 special character and number.'},
    )
    @ApiProperty({example: 'Jackson6!', description: 'Сложный пароль.'})
    readonly password: string
}