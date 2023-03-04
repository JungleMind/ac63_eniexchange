import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAnswerDTO {
    @ApiProperty({
        example: 'This is an answer',
        description: 'Content message/body of the answer',    
        type: 'string'
    })
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @ApiProperty({
    example: ["qovniroungotunerproyr"],
    description: 'Array of url containing link to the images',
    type: 'Array'
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  images?: string[];

  @ApiProperty({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the author of the answer: (userId)',
    type: 'ObjectID'
  })
  @IsString()
  answerAuthorId: string;

  @ApiProperty({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the question of the answer: (questionId)',
    type: 'ObjectID'
  })
  @IsString()
  answerToQuestion: string;
  
  @ApiPropertyOptional({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the parent answer of the answer: (answerId)',
    type: 'ObjectID'
  })
  @IsOptional()
  @IsString()
  answerToAnswer?: string;
}