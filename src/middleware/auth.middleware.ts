import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(           
    private jwtService: JwtService,  
  ){}
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('req...' , req.header("token"));
    // const token = req.header("token");
    // if(!token){
    //   throw new HttpException("Token Expired", 401);
    // }
    // const user = this.jwtService.verify(token)
    // if(!user || user.exp < Date.now() / 1000 || !user.activatedAccount){
    //   throw new HttpException("Token Expired", 401);
    // }
    // req["user"] = user;
    next();
  }
}
