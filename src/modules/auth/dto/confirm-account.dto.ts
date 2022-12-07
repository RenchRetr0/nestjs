import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class ConfirmAccountDTO {
    @IsNotEmpty()
    @ApiProperty()
    token: string;
}