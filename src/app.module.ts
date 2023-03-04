import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/dbConfig';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule, 
    QuestionModule, 
    AnswerModule,
    JwtModule.register({
      secret: `${process.env.jwtSecret}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .forRoutes('question', 'answer');
  }
}
