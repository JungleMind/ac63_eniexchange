import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ObjectID, Repository } from 'typeorm';
import { ObjectID as OBJECTID} from 'mongodb';
import { Answer } from './entity/answer.entity';
import { CreateAnswerDTO } from './dto/answer.create.dto';
import { QuestionService } from 'src/question/question.service';
import { UpdateAnswerDTO } from './dto/answer.update.dto';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,  
        private readonly userService: UserService,
        private readonly questionService: QuestionService,
    ) {}

    async getAllAnswersToQuestions(questionId: string) : Promise<Answer[]> {
        return await this.answerRepository.findBy({answerToQuestion: questionId});
      }

    async getAllUserAnswers(answerAuthorId : string) : Promise<Answer[]> {
        // questionAuthorId = new OBJECTID(questionAuthorId);        
        return await this.answerRepository.findBy({answerAuthorId});
    }

    async getAnswerById(answerId : ObjectID) : Promise<Answer | null>{
        answerId = new OBJECTID(answerId);
        return await this.answerRepository.findOneBy({_id : answerId});
    }

    async createAnswer(createAnswerDTO: CreateAnswerDTO){
        const newAnswer = this.answerRepository.create(createAnswerDTO);
        try {
            await this.answerRepository.save(newAnswer)
            var authorId = new OBJECTID(createAnswerDTO.answerAuthorId)
            await this.saveAnswerToUser(newAnswer._id, authorId)
            await this.saveAnswerToQuestion(newAnswer._id, new OBJECTID(newAnswer.answerToQuestion))
            if(newAnswer.answerToAnswer != null){
                await this.saveAnswerToAnswer(newAnswer._id, new OBJECTID(createAnswerDTO.answerToAnswer))
            }
        } catch (error) {
            await this.deleteAnswerFromUser(newAnswer._id, authorId)
            await this.deleteAnswerFromQuestions(newAnswer._id, new OBJECTID(newAnswer.answerToQuestion))
            await this.deleteAnswerFromAnswer(newAnswer._id, new OBJECTID(createAnswerDTO.answerToAnswer))
            await this.answerRepository.delete(newAnswer._id)
            throw new HttpException(`Error: ${error}`, 400) 
        }
        return newAnswer;
    }

    async saveAnswerToUser(answerId: ObjectID, userId: ObjectID){
        userId = new OBJECTID(userId);
        const user = await this.userService.getUserByID(userId);
        if(!user){
            throw new HttpException("Forbidden request: User: missing", 400)
        }
        if(user.answers == null){
            user.answers = [];
        }
        user.answers.push(answerId);
        await this.userService.updateUser(
            userId, 
            {answers: user.answers}
        )
    }

    async saveAnswerToQuestion(answerId: ObjectID, questionId: ObjectID){
        questionId = new OBJECTID(questionId);
        const question = await this.questionService.getQuestionById(questionId)
        if(!question){
            throw new HttpException("Forbidden request: Question: missing", 400)
        }
        if(question.answers == null){
            question.answers = [];
        }
        question.answers.push(answerId);
        await this.questionService.updateQuestion(
            questionId, 
            {answers: question.answers}
        )
    }

    async saveAnswerToAnswer(childAnswerId: ObjectID, parentAnswerId: ObjectID){
        parentAnswerId = new OBJECTID(parentAnswerId);
        const parentAnswer = await this.getAnswerById(parentAnswerId)
        if(!parentAnswer){
            throw new HttpException("Forbidden request: Parent Answer: missing", 400)
        }
        if(parentAnswer.answers == null){
            parentAnswer.answers = [];
        }
        parentAnswer.answers.push(childAnswerId);
        await this.updateAnswer(
            parentAnswerId, 
            {answers: parentAnswer.answers}
        )
    }


    async deleteAnswerFromUser(answerId: ObjectID, userId: ObjectID){
        const user = await this.userService.getUserByID(userId)
        if(!user){
            throw new HttpException("User not found", 404)
        }
        if(user.answers == null){
            throw new HttpException("Invalid action", 404)
        }
        let answers : ObjectID[] = []
        for(let i = 0; i <= user.answers.length - 1; i++){
            if(!user.answers[i].equals(answerId)){
                answers.push(user.answers[i])
            }
        }
        await this.userService.updateUser(
            userId, 
            {answers}
        )
    }

    async deleteAnswerFromQuestions(answerId: ObjectID, questId: ObjectID){
        const question = await this.questionService.getQuestionById(questId)
        if(!question){
            throw new HttpException("Question not found", 404)
        }
        if(question.answers == null){
            throw new HttpException("Invalid action", 404)
        }
        let answers : ObjectID[] = []
        for(let i = 0; i <= question.answers.length - 1; i++){
            if(!question.answers[i].equals(questId)){
                answers.push(question.answers[i])
            }
        }
        await this.questionService.updateQuestion(
            questId, 
            {answers}
        )
    }

    async deleteAnswerFromAnswer(childAnswerId: ObjectID, parentAnswerId: ObjectID){
        const answer = await this.getAnswerById(parentAnswerId)
        if(!answer){
            throw new HttpException("Answer not found", 404)
        }
        if(answer.answers == null){
            throw new HttpException("Invalid action", 404)
        }
        let parentAnswers : ObjectID[] = []
        for(let i = 0; i <= answer.answers.length - 1; i++){
            if(!answer.answers[i].equals(childAnswerId)){
                parentAnswers.push(answer.answers[i])
            }
        }
        await this.updateAnswer(
            parentAnswerId, 
            {answers: parentAnswers}
        )
    }

    async updateAnswer(answerId: ObjectID, updateAnswerDto: UpdateAnswerDTO): Promise<Answer> {        
        await this.answerRepository.update(answerId, {...updateAnswerDto});
        return this.getAnswerById(answerId);
    }

    async deleteAnswer(answerId: ObjectID) : Promise<null> {
        const answer = await this.getAnswerById(answerId);
        if(!answer){            
            throw new HttpException("Answer no longer exist", 404)
        }
        await this.updateAnswer(answerId, {isDeleted: true})
        return null;
    }
}
