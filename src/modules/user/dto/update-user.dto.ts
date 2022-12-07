import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    
    @IsNotEmpty({ message: 'Age cannot be empty' })
    @ApiProperty({example: 20, description: 'Изменить возраст'})
    age: number;
}