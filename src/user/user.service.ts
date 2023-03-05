import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import * as brcypt from "bcryptjs";
// @ts-ignore
import { ObjectID as OBJECTID} from 'mongodb';
import { userFormDTO } from './dto/userForm.dto';

import { mailer } from '../utils/sendMail';
import { LoginUserDTO } from './dto/userLogin.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userFabRepository: MongoRepository<User>,          
        private jwtService: JwtService,  
      ) {}

      getAllUsers(): Promise<User[]> {
        return this.userFabRepository.find();
      }

      async getUserByName(name: string): Promise<User[]>{
        const user = await this.userFabRepository.find({where: {
                  $or: [
                  {firstName: {'$regex': name, '$options': 'i'}},
                  {lastName: {'$regex': name, '$options': 'i'}}
              ]
            }
          })
        return user;
      }

      async getUserByMatriculate(matriculate: string): Promise<User[]>{
        const user = await this.userFabRepository.find({where: {                  
                  matricule: {'$regex': matriculate, '$options': 'i'}               
              }
          })
        return user;
      }

      async getUserByNiveau(niveau: string): Promise<User[]>{
        const user = await this.userFabRepository.find({where: {                  
                  niveau: {'$regex': niveau, '$options': 'i'}               
              }
          })
        return user;
      }

      async getUserByID(id: ObjectID): Promise<User | null> {
        const data : User | null = await this.userFabRepository.findOneBy({_id: new OBJECTID(id)});
        if (data){          
          return data
        } else {
            return null}
      }

      async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userFabRepository.findOne({where: {email}})
        if (user){          
          return user
        }
        return null
      }

      async createUSer(body : userFormDTO): Promise<Object> {
        body.password = this.hash(body.password)
        try {
          const user = this.userFabRepository.create( {...body, reputation: 0} as Object ); //casting body as an object because we otherwise get an array
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

      async confirmUser(mail: string, code: string, hashedCode?: string) : Promise<User | null> {
        if(hashedCode){
        var validCode : Boolean = await brcypt.compare(code, hashedCode)
        }  else {
          const user = await this.getUserByEmail(mail);
          console.log('confimation function: '+ user?.confirmationCode)          
          validCode = await brcypt.compare(code, user?.confirmationCode as string)
        }      
        const user : User | null = await this.getUserByEmail(mail)
          if(!user){
            throw new HttpException("Please register first", 404) 
          }
          if(user.activatedAccount){
            throw new HttpException("(A.A.A) Account Already Activated", 302) 
          }
          if (!validCode) {
            throw new HttpException("Invalid Credentials", 402)
          }
        await this.userFabRepository.update({email: mail}, {activatedAccount: true, confirmationCode: null})            
        const updatedUser : User | null = await this.getUserByEmail(mail)
        if(updatedUser){
            updatedUser.password = 'xxx';
        }
        return updatedUser;
      }


      async loginUserFab(userInfo: LoginUserDTO) : Promise<Object | null>{
        const user = await this.getUserByEmail(userInfo.email);
        if(!user){
          throw new HttpException("User account not found. Please register first", 404);
        }
        if(!await brcypt.compare(userInfo.password, user.password)){          
          throw new HttpException("Invalid credential", 400);
        }
        if(!user.activatedAccount){
          throw new HttpException("Please activate your account first", 400);
        }
        const {password, ...payload} = user;
        console.log(user);
        return { 
          access_token: this.jwtService.sign(payload),
          user
        };
      }

      async updateUser(userId: ObjectID, userUpdateDto: UserUpdateDTO) : Promise<User | null> {
        await this.userFabRepository.update(userId, {...userUpdateDto})
        return this.getUserByID(userId);
      }

      //VOTE 
      async votePlus(userId: ObjectID, elementId: ObjectID) {
        const user = await this.getUserByID(userId);
        if(!user){
          throw new HttpException("User not found.", 404);
        }
        if(user.votePlus != null && !user.votePlus.includes(elementId)){
          user.votePlus.push(elementId)
          await this.updateUser(userId, {
            votePlus: user.votePlus,
          })
          return null;
        }
        user.votePlus = [elementId];
        await this.updateUser(userId, {
          votePlus: user.votePlus,
        })
        return null;
      }

      async voteMoins(userId: ObjectID, elementId: ObjectID) {
        const user = await this.getUserByID(userId);
        if(!user){
          throw new HttpException("User not found.", 404);
        }
        if(user.voteMoins != null && !user.voteMoins.includes(elementId)){
          user.voteMoins.push(elementId)
          await this.updateUser(userId, {
            voteMoins: user.voteMoins,
          })
          return null;
        }
        user.voteMoins = [elementId];
        await this.updateUser(userId, {
          voteMoins: user.voteMoins,
        })
        return null;
      }
  

      //UTILS FUNCTIONS
      
      hash(keyword: string): string {
        return brcypt.hashSync(keyword, 10)
      }

      async sendConfirmationMail(mail: string) : Promise<string> {
        const mailConfig = {
          subject: "ENI_Exchange Confirmation Mail",
          code: uuid(),
          link: "eni.mg"
        }  
        console.log(mailConfig.code) 
        const code : string = this.hash(mailConfig.code)    
        mailer(mail, mailConfig.subject, mailConfig.code, mailConfig.link) 
        return code
      }
}
