import {IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { ObjectID } from 'typeorm';

export class UserUpdateDTO {
    @ApiPropertyOptional({
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

    @ApiPropertyOptional({
		example: 'Jhon.doe@gmail.com',
		description: 'Email. Unique (identifier) for every user',
	})
    
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
		example: '507f191e',
		description: 'Password of user, minimun of 8 char',
	})    
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;
    
    @ApiPropertyOptional({
		example: 'L1',
		description: 'Niveau of student',
	})    
    @IsOptional()
    @IsString()
    niveau?: string; 

    @ApiPropertyOptional({
      example: 'f2',
      description: 'picture name',
    })    
      @IsOptional()
      @IsString()
      image?: string; 

    @ApiPropertyOptional({
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

    @ApiPropertyOptional({
      example: ['idzezertryn'],
      description: 'Question ID for which the student has vote plus',
    })       
      @IsOptional()
      @IsArray()
      votePlus?: ObjectID[];

    @ApiPropertyOptional({
      example: ['idzezertryn'],
      description: 'Question ID for which the student has vote moins',
    })       
      @IsOptional()
      @IsArray()
      voteMoins?: ObjectID[];
}