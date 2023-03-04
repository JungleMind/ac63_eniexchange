import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
    secret: `${process.env.jwtSecret}`,
    signOptions: {expiresIn: 24*60*60*1000}, //1 day
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})


export class UserModule {}
