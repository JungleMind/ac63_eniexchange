import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { Request, Response } from 'express';
import { userFormDTO } from './dto/userForm.dto';
import { UserService } from './user.service';

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

}
