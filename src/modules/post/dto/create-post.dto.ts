import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreatePostDTO {
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @ApiProperty({example: 'Новый сайт.', description: 'Название статьи.'})
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @ApiProperty({example: 'Сегодня в 14:20 был создан новый сайт, где были добавлены крутые возможности!', description: 'Полное описание статья.'})
    description: string;

    @IsString()
    @ApiProperty()
    author: Types.ObjectId;

    @IsDateString()
    @ApiProperty()
    created_at: number;
}