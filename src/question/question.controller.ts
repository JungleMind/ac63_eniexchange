import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { UpdateQuestionDTO } from './dto/updateQuestion.dto';
import { VoteQuestionDTO } from './dto/voteQuestion.dto';
import { QuestionService } from './question.service';

@Controller('question')
@ApiTags('Question')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ){}

    @Get('/')
    // DOCUMENTATION
    @ApiOperation({summary:'Get all Questions'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    // END DOCUMENTATION
    getAllQuestions(){
        return this.questionService.getAllQuestions();
    }

    @Get('/myQuestions/:id')
    // DOCUMENTATION
    @ApiOperation({summary:'Get all Questions'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    // END DOCUMENTATION
    getUserQuestions(
        @Param('id') userId : string
    ){
        return this.questionService.getAllUserQuestions(userId)
    }

    @Get('/:id')
    // DOCUMENTATION
    @ApiOperation({summary:'Get Single question By id'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    // FUNCTION
    getQuestionById(
        @Param('id') questionId : ObjectID
    ){
        return this.questionService.getQuestionById(questionId);
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
    createQuestion(
        @Body() createQuestionDTO: CreateQuestionDTO
    ){
        return this.questionService.createQuestion(createQuestionDTO);
    }

    @Put('/votePlus/')
    // DOCUMENTATION
    @ApiOperation({summary: 'Update Question details'}) 
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
    votePLusQuestion(
        @Body() votePlusQuestionDTO: VoteQuestionDTO,
    ){
        return this.questionService.votePlusQuestion(votePlusQuestionDTO.userId, votePlusQuestionDTO.questionId)
    }

    @Put('/voteMoins/')
    // DOCUMENTATION
    @ApiOperation({summary: 'Vote moin 1 Question'}) 
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
    voteMoinsQuestion(
        @Body() voteMoinsQuestionDTO: VoteQuestionDTO,
    ){
        return this.questionService.voteMoinsQuestion(voteMoinsQuestionDTO.userId, voteMoinsQuestionDTO.questionId)
    }

    @Put('/retirerVote/')
    // DOCUMENTATION
    @ApiOperation({summary: 'Vote moin 1 Question'}) 
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
        @Body() voteQuestionDTO: VoteQuestionDTO,
    ){
        return this.questionService.removeVote(voteQuestionDTO.userId, voteQuestionDTO.questionId)
    }

    @Put('/:id')
    // DOCUMENTATION
    @ApiOperation({summary: 'Update Question details'}) 
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
    updateQuestion(
        @Body() updateQuestionDTO: UpdateQuestionDTO,
        @Param('id') questionId: ObjectID
    ){
        return this.questionService.updateQuestion(questionId, updateQuestionDTO);
    }

    @Delete('/:id')
    // DOCUMENTATION
    @ApiOperation({summary: 'HARD Delete a question'}) 
    @ApiResponse({
        status: 200,
        description: 'Ok, no error.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error.'
    })
    // FUNCTION
    deleteQuestion(
        @Param('id') questionId: ObjectID
    ){
        return this.questionService.deleteQuestion(questionId);
    }
}
