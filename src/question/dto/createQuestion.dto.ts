import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuestionDTO {
    @ApiProperty({
        example: 'Hello World',
        description: 'Title of the question',    
        type: 'string'
    })
  @IsString()
  @IsNotEmpty()
  questionTitle: string;

    @ApiProperty({
        example: 'This is a question',
        description: 'Content message/body of the post',    
        type: 'string'
    })
  @IsString()
  @IsNotEmpty()
  content: string;
  
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
    example: ['nestJs', 'reactJs'],
    description: 'Array of techno used in the question',
    type: 'Array'
  })
  @IsArray()
  @IsNotEmpty()
  technology: string[];

  @ApiPropertyOptional({
    example: "635bd58ea1b20514ece3ed49",
    description: 'Id of the author of the post: (userId)',
    type: 'ObjectID'
  })
  @IsString()
  questionAuthorId: string;
}