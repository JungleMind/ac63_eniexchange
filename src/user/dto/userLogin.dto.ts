import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
    @ApiProperty({
		example: 'jhon.doe@gmail.com',
		description: 'Email of user who has created an account',
	})
    @IsEmail()
    email: string;

    @ApiProperty({
		example: '507f1918',
		description: 'User password',
	})
    @IsString()
    @IsNotEmpty()
    password: string;
}