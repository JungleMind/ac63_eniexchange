import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { Request, Response } from 'express';
import { userFormDTO } from './dto/userForm.dto';
import { UserService } from './user.service';
import { confirmUserDTO } from './dto/userConfirm.dto';
import { LoginUserDTO } from './dto/userLogin.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    //DOCUMENTATION
    @ApiOperation({summary:'Get all users'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    //END DOCUMENTATION
    getAllUser() {
        return this.userService.getAllUsers()
    }

    @Get('/:id')
    //DOCUMENTATION
    @ApiOperation({summary: 'Get user by ID'})
    @ApiResponse({
        status: 200,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })     
    //END DOCUMENTATION
    getUSerByID(
        @Param('id') ID : ObjectID
    ){
        return this.userService.getUserByID(ID)
    }

    @Post('/register')
    //DOCUMENTATION
    @ApiOperation({summary: 'Create new un-activated account/ Require Email confirmation'}) 
    @ApiResponse({
        status: 201,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 400,
        description: 'Unauthorized action. Email already in use'
    }) 
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })   
    //END DOCUMENTATION
    async createUser(
        @Body() body : userFormDTO,
        @Res({ passthrough: true })
        response: Response
    ){
        const data : Object = await this.userService.createUSer(body)
        response.cookie(process.env.cookieSecret as string, data, {
            httpOnly: true,
            maxAge: 60*60*1000 // One hour 
        },) //IS Also an epxiration date for the confirmation code - cookie expired = code destroyed
        return data
    }


    @Post('/confirm')
    //DOCUMENTATION
    @ApiOperation({summary: 'Confirm and Activate user account'}) 
    @ApiResponse({
        status: 201,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 401,
        description: 'Confirmation code error (Expired/Not intialized)'
    })
    @ApiResponse({
        status: 402,
        description: 'Confirmation code error (Wrong code or expired code)'
    })
    @ApiResponse({
        status: 404,
        description: 'Not found. User has not registered yet.'
    })
    @ApiResponse({
        status: 302,
        description: 'Account Already Activated'
    })   
    //END DOCUMENTATION
    confirmUser(
        @Body() body : confirmUserDTO,
        @Req() request : Request
    ){
        const codeCookie = request.cookies[process.env.cookieSecret as string]
        if(!codeCookie){
            return this.userService.confirmUser(body.email, body.code);
        }
        const hashedCode : string = request.cookies[process.env.cookieSecret as string].code
        return this.userService.confirmUser(body.email, body.code, hashedCode)
    }

    @Post('/login')
    //DOCUMENTATION
    @ApiOperation({summary: 'Login user'}) 
    @ApiResponse({
        status: 201,
        description: 'Ok, no error'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid password or unactivated account.'
    }) 
    @ApiResponse({
        status: 404,
        description: 'Internal email/ User not found'
    })   
    //END DOCUMENTATION
    async loginUser(
        @Body() body : LoginUserDTO,
    ){
        return this.userService.loginUserFab(body);
    }
}
