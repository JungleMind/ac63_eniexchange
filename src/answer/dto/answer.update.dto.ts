import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectID } from 'typeorm'

export class UpdateAnswerDTO {
    @ApiPropertyOptional({
        example: 'This is an answer',
        description: 'Content message/body of the answer',    
        type: 'string'
    })
    @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
  
  @ApiPropertyOptional({
    example: ["qovniroungotunerproyr"],
    description: 'Array of url containing link to the images',
    type: 'Array'
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  images?: string[];

  @ApiPropertyOptional({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the author of the answer: (userId)',
    type: 'ObjectID'
  })
  @IsOptional()
  @IsString()
  answerAuthorId?: string;

  @ApiPropertyOptional({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the question of the answer: (questionId)',
    type: 'ObjectID'
  })
  @IsOptional()
  @IsString()
  answerToQuestion?: string;
  
  @ApiPropertyOptional({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the parent answer of the answer: (answerId)',
    type: 'ObjectID'
  })
  @IsOptional()
  @IsString()
  answerToAnswer?: string;  
  
  @ApiPropertyOptional({
    example: ["635bd58ea1b20514ece3ed49"],
    description: 'Array of id of answers to this answer',
    type: 'ObjectID[]'
  })
  @IsOptional()
  @IsArray()
  answers?: ObjectID[];
  
  @ApiPropertyOptional({
    example: true,
    description: 'Status of answer',
    type: 'boolean'
  })
  @IsOptional()
  @IsBoolean()
  solution?: boolean;

  
  @ApiPropertyOptional({
    example: false,
    description: 'Delete Status of answer',
    type: 'boolean'
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}