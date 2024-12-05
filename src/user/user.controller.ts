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

    @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const { username, password } = loginData;
    // Llama a tu servicio para verificar las credenciales
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }
    // Aquí puedes generar un JWT u otro token
    return { message: 'Login exitoso', user };  // O puedes devolver un JWT
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
