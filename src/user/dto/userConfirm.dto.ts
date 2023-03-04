import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class confirmUserDTO {
    @ApiProperty({
		example: 'jhon.doe@gmail.com',
		description: 'Email of user who has created an unactivated account',
	})
    @IsEmail()
    email: string;

    @ApiProperty({
		example: '507f191e810c19729de860ea',
		description: 'Confirmation code of user sent via Email',
	})
    @IsString()
    @IsNotEmpty()
    code: string;
}