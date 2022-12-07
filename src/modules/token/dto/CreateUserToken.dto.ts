import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateUserTokenDto {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  userId: mongoose.Types.ObjectId;

  @IsDateString()
  @ApiProperty()
  expireAt: string;
}