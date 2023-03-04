import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { AnswerService } from './answer.service';
import { CreateAnswerDTO } from './dto/answer.create.dto';
import { UpdateAnswerDTO } from './dto/answer.update.dto';
import { VoteAnswerDTO } from './dto/answer.vote.dto';

@Controller('answer')
@ApiTags('Answer')
export class AnswerController {
    constructor(
        private readonly answerService: AnswerService
    ){}

    @Get('/user/:id')
    // DOCUMENTATION
    @ApiOperation({summary:'Get all answers related to a user'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    // END DOCUMENTATION
    getAllUserAnswers(
        @Param('id') userId: string
    ){
        return this.answerService.getAllUserAnswers(userId);
    }

    @Get('/question/:id')
    // DOCUMENTATION
    @ApiOperation({summary:'Get all answers related to a Questions'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    // END DOCUMENTATION
    getAllQuestionAnswers(
        @Param('id') questionId: string
    ){
        return this.answerService.getAllAnswersToQuestions(questionId);
    }

    @Get('/:id')
    // DOCUMENTATION
    @ApiOperation({summary:'Get Answer by id'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    // END DOCUMENTATION
    getAllAnswerByID(
        @Param('id') answerId: ObjectID
    ){
        return this.answerService.getAnswerById(answerId);
    }

    @Post()
    // DOCUMENTATION
    @ApiOperation({summary: 'Create new question'}) 
    @ApiResponse({
        status: 201,
        description: 'Question Created successfully'
    })
    @ApiResponse({
        status: 400,
        description: 'Unauthorized action'
    }) 
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })   
    // FUNCTION
    createAnswer(
        @Body() createAnswerDTO: CreateAnswerDTO
    ){
        return this.answerService.createAnswer(createAnswerDTO)
    }

    @Put('/votePlus/')
    // DOCUMENTATION
    @ApiOperation({summary: 'Vote plus 1 answer'}) 
    @ApiResponse({
        status: 200,
        description: 'Ok, no error.'
    })
    @ApiResponse({
        status: 400,
        description: 'Unauthorized action.'
    }) 
    @ApiResponse({
        status: 500,
        description: 'Internal server error.'
    })   
    // FUNCTION
    votePLusAnswer(
        @Body() votePlusAnswerDTO: VoteAnswerDTO,
    ){
        return this.answerService.votePlusAnswer(votePlusAnswerDTO.userId, votePlusAnswerDTO.answerId)
    }

    @Put('/voteMoins/')
    // DOCUMENTATION
    @ApiOperation({summary: 'Vote moin 1 Answer'}) 
    @ApiResponse({
        status: 200,
        description: 'Ok, no error.'
    })
    @ApiResponse({
        status: 400,
        description: 'Unauthorized action.'
    }) 
    @ApiResponse({
        status: 500,
        description: 'Internal server error.'
    })   
    // FUNCTION
    voteMoinsAnswer(
        @Body() voteMoinsAnswerDTO: VoteAnswerDTO,
    ){
        return this.answerService.voteMoinsAnswer(voteMoinsAnswerDTO.userId, voteMoinsAnswerDTO.answerId)
    }

    @Put('/retirerVote/')
    // DOCUMENTATION
    @ApiOperation({summary: 'Remove Answer Vote'}) 
    @ApiResponse({
        status: 200,
        description: 'Ok, no error.'
    })
    @ApiResponse({
        status: 400,
        description: 'Unauthorized action.'
    }) 
    @ApiResponse({
        status: 500,
        description: 'Internal server error.'
    })   
    // FUNCTION
    removeVoteQuestion(
        @Body() voteAnswerDTO: VoteAnswerDTO,
    ){
        return this.answerService.removeVote(voteAnswerDTO.userId, voteAnswerDTO.answerId)
    }

    @Put('/:id')
    // DOCUMENTATION
    @ApiOperation({summary: 'Update answer details'}) 
    @ApiResponse({
        status: 200,
        description: 'Ok, no error.'
    })
    @ApiResponse({
        status: 400,
        description: 'Unauthorized action.'
    }) 
    @ApiResponse({
        status: 500,
        description: 'Internal server error.'
    })   
    // FUNCTION
    updateAnswer(
        @Body() updateAnswerDTO: UpdateAnswerDTO,
        @Param('id') answerId: ObjectID
    ){
        return this.answerService.updateAnswer(answerId, updateAnswerDTO);
    }

    @Delete('/:id')
    // DOCUMENTATION
    @ApiOperation({summary: 'Soft Delete an answer'}) 
    @ApiResponse({
        status: 200,
        description: 'Ok, no error.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error.'
    })
    // FUNCTION
    deleteAnswer(
        @Param('id') answerId: ObjectID
    ){
        return this.answerService.deleteAnswer(answerId);
    }
}
