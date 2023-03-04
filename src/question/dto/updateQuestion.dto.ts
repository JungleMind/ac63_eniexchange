import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString } from "class-validator";
import { ObjectID } from 'typeorm';

export class UpdateQuestionDTO {
    @ApiProperty({
        example: 'Hello World',
        description: 'Title of the question',    
        type: 'string'
    })
    @IsOptional()
  @IsString()
  @IsNotEmpty()
  questionTitle?: string;

    @ApiProperty({
        example: 'This is a question',
        description: 'Content message/body of the post',    
        type: 'string'
    })
    @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
  
  @ApiPropertyOptional({
    example: [{url: "qovniroungotunerproyr"}],
    description: 'Array of url containing link to the images',
    type: 'Array'
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  images?: string[];

  @ApiPropertyOptional({
    example: ['nestJs', 'reactJs'],
    description: 'Array of techno used in the question',
    type: 'Array'
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  technology?: string[];

  @ApiPropertyOptional({
    example: 'true',
    description: 'Status of question resolution',
    type: 'boolean'
  })
  @IsOptional()
  @IsBoolean()
  resolu?: boolean;

  @ApiPropertyOptional({
    example: ['22'],
    description: 'Answer list for question',
  })       
    @IsOptional()
    @IsArray()
    answers?: ObjectID[];

  
  @ApiPropertyOptional({
    example: ['odinrgo22'],
    description: 'List of userId who vote plus for question',
  })       
    @IsOptional()
    @IsArray()
    votePlus?: ObjectID[];


  @ApiPropertyOptional({
    example: ['odinrgo22'],
    description: 'List of userId who vote moins for question',
  })       
    @IsOptional()
    @IsArray()
    voteMoins?: ObjectID[];
    
    
  
  @ApiPropertyOptional({
    example: 2,
    description: 'Total vote for the question',
  })       
    @IsOptional()
    @IsNumber()
    voteTotal?: number;
}