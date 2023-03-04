import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { ObjectID } from 'typeorm';

export class UserUpdateDTO {
    @ApiProperty({
		example: 'Jhon',
		description: 'Name of the user',
	})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName?: string

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
    
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
		example: '507f191e',
		description: 'Password of user, minimun of 8 char',
	})    
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;
    
    @ApiProperty({
		example: 'L1',
		description: 'Niveau of student',
	})    
    @IsOptional()
    @IsString()
    niveau?: string; 

    @ApiProperty({
		example: '21',
		description: 'Reputation level of student',
	})       
    @IsOptional()
    @IsNumber()
    reputation?: number;

    @ApiPropertyOptional({
		example: ['21'],
		description: 'Questiol list of student',
	})       
    @IsOptional()
    @IsString()
    questions?: ObjectID[];

    
    @ApiPropertyOptional({
      example: ['22'],
      description: 'Answer list of student',
    })       
      @IsOptional()
      @IsString()
      answers?: ObjectID[];
}