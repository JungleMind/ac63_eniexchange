import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { ObjectID as OBJECTID} from 'mongodb';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { UserService } from 'src/user/user.service';
import { UpdateQuestionDTO } from './dto/updateQuestion.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,  
        private readonly userService: UserService
    ) {}

    getAllQuestions() : Promise<Question[]> {
        return this.questionRepository.find();
      }

    getAllUserQuestions(questionAuthorId : string) : Promise<Question[]>{
        // questionAuthorId = new OBJECTID(questionAuthorId);        
        return this.questionRepository.findBy({questionAuthorId});
    }

    getQuestionById(questionId : ObjectID) : Promise<Question | null>{
        questionId = new OBJECTID(questionId);
        return this.questionRepository.findOneBy({_id : questionId});
    }

    async createQuestion(createQuestionDTO: CreateQuestionDTO){
        const newQuestion = this.questionRepository.create(createQuestionDTO);
        try {
            await this.questionRepository.save(newQuestion)
            let authorId = new OBJECTID(createQuestionDTO.questionAuthorId)
            await this.saveQuestionToUser(newQuestion._id, authorId)
        } catch (error) {
            await this.questionRepository.delete(newQuestion._id)
            throw new HttpException(`Error: ${error}`, 400) 
        }
        return newQuestion;
    }

    async saveQuestionToUser(questionId: ObjectID, userId: ObjectID){
        userId = new OBJECTID(userId);
        const user = await this.userService.getUserByID(userId);
        if(!user){
            throw new HttpException("Forbidden request: User: missing", 400)
        }
        if(user.questions == null){
            user.questions = [];
        }
        user.questions.push(questionId);
        await this.userService.updateUser(
            userId, 
            {questions: user.questions}
        )
    }

    async deleteQuestionFromUser(questionId: ObjectID, userId: ObjectID){
        const user = await this.userService.getUserByID(userId)
        if(!user){
            throw new HttpException("User not found", 404)
        }
        if(user.questions == null){
            throw new HttpException("Invalid action", 404)
        }
        let questions : ObjectID[] = []
        for(let i = 0; i <= user.questions.length - 1; i++){
            if(!user.questions[i].equals(questionId)){
                questions.push(user.questions[i])
            }
        }
        await this.userService.updateUser(
            userId, 
            {questions}
        )
    }

    async updateQuestion(questionId: ObjectID, updateQuestionDto: UpdateQuestionDTO): Promise<Question> {        
        await this.questionRepository.update(questionId, {...updateQuestionDto});
        return this.getQuestionById(questionId);
    }

    async deleteQuestion(questionId: ObjectID) : Promise<null> {
        const question = await this.getQuestionById(questionId);
        if(!question){            
            throw new HttpException("Question no longer exist", 404)
        }
        await this.deleteQuestionFromUser(question._id, new OBJECTID(question.questionAuthorId));
        await this.questionRepository.delete(questionId);
        return null;
    }

    async votePlusQuestion(userId: ObjectID, questionId: ObjectID) : Promise<null> {
        const user = await this.userService.getUserByID(userId);
        const question = await this.getQuestionById(questionId);
        let minusOne = false;
        if(!user || !question){
            throw new HttpException("Subjects not found", 404);
        }
        if(question.voteMoins != null){
            var position = question.voteMoins.indexOf(userId);
            console.log(position);
            if (position >= 0) {
                await this.removeVote(userId, questionId)                           
                console.log('remove vote called') 
                minusOne = true;
                await this.removeVoteFromUser(userId, questionId);
            }
        }        
        if(question.votePlus!= null){
            if(!question.votePlus.includes(userId)){
                question.votePlus.push(userId);
                await this.updateQuestion(questionId, {
                    votePlus: question.votePlus,
                    voteTotal: minusOne? question.voteTotal + 2 : question.voteTotal + 1
                });
                await this.userService.votePlus(userId, questionId);
            }
            return null;
        }
        question.votePlus = [];
        question.votePlus.push(userId);
        await this.updateQuestion(questionId, {
            votePlus: question.votePlus,
            voteTotal: minusOne? question.voteTotal + 2 : question.voteTotal + 1
        });        
        await this.userService.votePlus(userId, questionId);
        return null;
    }

    async voteMoinsQuestion(userId: ObjectID, questionId: ObjectID) : Promise<null> {
        const user = await this.userService.getUserByID(userId);
        const question = await this.getQuestionById(questionId);
        let minusOne = false;
        if(!user || !question){
            throw new HttpException("Subjects not found", 404);
        }
        if(question.votePlus != null){
            var position = question.votePlus.indexOf(userId);
            if(position >= 0){
                minusOne = true;                  
                await this.removeVote(userId, questionId)                
                await this.removeVoteFromUser(userId, questionId);
            }
        }
        if(question.voteMoins!= null){
            if(!question.voteMoins.includes(userId)){
                question.voteMoins.push(userId);
                await this.updateQuestion(questionId, {
                    voteMoins: question.voteMoins,
                    voteTotal: minusOne? question.voteTotal - 2 : question.voteTotal - 1
                });                
                await this.userService.voteMoins(userId, questionId);
            }
            return null;
        }
        question.voteMoins = [];
        question.voteMoins.push(userId);
        await this.updateQuestion(questionId, {
            voteMoins: question.votePlus,
            voteTotal: minusOne? question.voteTotal - 2 : question.voteTotal - 1
        });
        await this.userService.voteMoins(userId, questionId);
        return null;
    }

    async removeVote(userId : ObjectID, questionId : ObjectID) : Promise<null>{
        const user = await this.userService.getUserByID(userId);
        const question = await this.getQuestionById(questionId);
        if(!user || !question){
            throw new HttpException("Subjects not found", 404);
        }
        if(question.votePlus != null && question.votePlus.includes(userId)){
            console.log('hita leka');
            const index = question.votePlus.indexOf(userId);
            question.votePlus.splice(index, 1)
            await this.questionRepository.update(questionId, {
                votePlus: question.votePlus,
                voteTotal: question.voteTotal - 1
            })            
            console.log('removing vote plus')
            return null;
        }
        if(question.voteMoins == null || question.voteMoins.includes(userId)){
            return null;
        }
        question.voteMoins.splice(question.voteMoins.indexOf((userId)), 1);
        
        console.log('removing vote moin')
        await this.questionRepository.update(questionId, {
            voteMoins: question.voteMoins,
            voteTotal: question.voteTotal - 1
        })
        return null;
    }

    async removeVoteFromUser(userId: ObjectID, questionId: ObjectID) : Promise<null>{
        const user = await this.userService.getUserByID(userId);
        const question = await this.getQuestionById(questionId);
        if(!user || !question){
            throw new HttpException("Subjects not found", 404);
        }
        if(user.votePlus != null && user.votePlus.includes(questionId)){
            const index = question.votePlus.indexOf(userId);
            question.votePlus.splice(index, 1)
            await this.userService.updateUser(userId, {
                votePlus: question.votePlus
            })
            return null;
        }
        if(user.voteMoins == null || user.voteMoins.includes(userId)){
            return null;
        }
        user.voteMoins.splice(question.voteMoins.indexOf((userId)), 1);
        await this.userService.updateUser(userId, {
            voteMoins: question.voteMoins
        })
        return null
    }

}
