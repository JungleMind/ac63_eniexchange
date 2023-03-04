import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectID } from "typeorm";

export class VoteQuestionDTO {
    @ApiProperty({
        example: '640352f227e0cc41245ac36e',
        description: 'User Id',    
        type: 'string'
    })
  @IsString()
  @IsNotEmpty()
  userId?: ObjectID;

    @ApiProperty({
        example: '640352f227e0cc41245ac36e',
        description: 'Question Id',    
        type: 'string'
    })
  @IsString()
  @IsNotEmpty()
  questionId?: ObjectID;

}