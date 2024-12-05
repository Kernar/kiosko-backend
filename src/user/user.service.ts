import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';  // Para comparar contraseñas

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers(): Promise<User[]> {
      return this.prisma.user.findMany();
    }
  
    async getUserById(id: string): Promise<User> {
      return this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    }

    // En user.service.ts
    async getUserByEmail(email: string): Promise<User> {
      return this.prisma.user.findUnique({
        where: { email },
      });
    }

  
    async createUser(data: User): Promise<User> {
      return this.prisma.user.create({
        data,
      });
    }
  
    async updateUser(id: string, data: User): Promise<User> {
      return this.prisma.user.update({
        where: {
          id: id,
        },
        data,
      });
    }
  
    async deleteUser(id: string): Promise<User> {
      return this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    }

    async validateUser(username: string, password: string): Promise<User | null> {
      try {
        const user = await this.prisma.user.findUnique({
          where: { username },
        });
        if (!user) {
          return null;  // Usuario no encontrado
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;  // Contraseña incorrecta
        }
    
        return user;
      } catch (error) {
        console.error('Error al validar usuario:', error);  // Log de error
        throw new InternalServerErrorException('Error interno al validar usuario');
      }
    }
    
}
