import {  Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
      return this.userService.getAllUsers();
    }
  
    @Get(':id')
    async getUserById(@Param('id') id: string) {
      const userFound = await this.userService.getUserById(id);
      if (!userFound) throw new NotFoundException('User no encontrado');
      return userFound;
    }
  
    @Post()
    async createUser(@Body() data: User) {
      return this.userService.createUser(data);
    }
  
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: User) {
      try {
        return await this.userService.updateUser(id, data);
      } catch (error) {
        throw new NotFoundException('User no existe');
      }
    }
  
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
      try {
        return await this.userService.deleteUser(id);
      } catch (error) {
        throw new NotFoundException('User no existe');
      }
    }
}
