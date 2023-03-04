import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import * as brcypt from "bcryptjs";
// @ts-ignore
import { ObjectID as OBJECTID} from 'mongodb';
import { userFormDTO } from './dto/userForm.dto';

import { mailer } from '../utils/sendMail';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userFabRepository: Repository<User>,        
        // private jwtService: JwtService,
      ) {}

      getAllUsers(): Promise<User[]> {
        return this.userFabRepository.find();
      }

      async getUserByID(id: ObjectID): Promise<User | null> {
        const data : User | null = await this.userFabRepository.findOneBy({_id: new OBJECTID(id)});
        if (data){          
          return data
        } else {
            return null}
      }

      async getUserByMatricule(matricule: string): Promise<User | null> {
        const user = await this.userFabRepository.findOne({where: {matricule}})
        if (user){          
          return user
        }
        return null
      }

      async createUSer(body : userFormDTO): Promise<Object> {
        body.password = this.hash(body.password)
        try {
          const user = this.userFabRepository.create( {...body} as Object ); //casting body as an object because we otherwise get an array
          await this.userFabRepository.save(user);

          const code : string = await this.sendConfirmationMail(user.email);          
          console.log('creation confirmCode : ' + code)
          await this.userFabRepository.update({email: user.email}, {confirmationCode: code})
          user.password = 'xxx';
          return {user, code};

        } catch (error) {
          throw new HttpException("Request Email Error:" + error, 400);
        }
      }



      //UTILS FUNCTIONS
      
      hash(keyword: string): string {
        return brcypt.hashSync(keyword, 10)
      }

      async sendConfirmationMail(mail: string) : Promise<string> {
        const mailConfig = {
          subject: "SmartA Confirmation Mail",
          code: uuid(),
          link: "thenext.mg"
        }  
        console.log(mailConfig.code) 
        const code : string = this.hash(mailConfig.code)    
        mailer(mail, mailConfig.subject, mailConfig.code, mailConfig.link) 
        return code
      }
}
