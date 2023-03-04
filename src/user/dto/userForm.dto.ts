import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export class userFormDTO {
    @ApiProperty({
		example: 'Jhon',
		description: 'Name of the user',
	})
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiPropertyOptional({
		example: 'Doe',
		description: 'Optional. Last name of the user',
	})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string;

    @ApiProperty({
		example: 'Jhon.doe@gmail.com',
		description: 'Email. Unique (identifier) for every user',
	})
    @IsEmail()
    email: string;

    @ApiProperty({
		example: '507f191e',
		description: 'Password of user, minimun of 8 char',
	})
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({
		example: '2185',
		description: 'Matriculate number of the student, minimum of 4 char, max 6',
	})
    @IsString()
    @MinLength(4)
    @MaxLength(6)
    matricule: string;
    
    @ApiProperty({
		example: 'L1',
		description: 'Niveau of student',
	})
    @IsString()
    niveau?: string;    
    
    @ApiProperty({
		example: '10',
		description: 'Reputation level of student',
	})
    @IsNumber()
    reputation?: number;

}