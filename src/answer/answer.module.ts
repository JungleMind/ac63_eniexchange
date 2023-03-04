import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Answer } from './entity/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),    
    UserModule,
    QuestionModule,
  ],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
