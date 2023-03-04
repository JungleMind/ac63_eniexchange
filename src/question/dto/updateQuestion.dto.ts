import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    @IsString()
    answers?: ObjectID[];
}