import { BadRequestException, Body, Delete, Get, Injectable, NotFoundException, Param, Post } from "@nestjs/common";
import { PasswordReset } from "@prisma/client";
import * as crypto from 'crypto';  // Usaremos crypto para generar un token único
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class PassResetService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
      ) {}
    
      // Crear un token de restablecimiento de contraseña
      async createPasswordResetToken(email: string): Promise<PasswordReset> {
        // Verifica si el usuario existe
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        // Genera un token único
        const token = crypto.randomBytes(32).toString('hex');
    
        // Calcula la fecha de expiración (por ejemplo, 1 hora)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);  // Token válido por 1 hora
    
        // Crea el registro de password reset en la base de datos
        return this.prisma.passwordReset.create({
          data: {
            userId: user.id,
            token,
            expiresAt,
          },
        });
      }
    
      // Verificar un token de restablecimiento de contraseña
      async verifyToken(token: string): Promise<PasswordReset> {
        // Busca el token en la base de datos
        const resetRequest = await this.prisma.passwordReset.findUnique({
          where: { token },
          include: { user: true },
        });
    
        if (!resetRequest) {
          throw new NotFoundException('Token not found');
        }
    
        // Verifica si el token ha expirado
        if (resetRequest.expiresAt < new Date()) {
          throw new BadRequestException('Token has expired');
        }
    
        return resetRequest;
      }
    
      // Eliminar un token (después de que el usuario haya restablecido su contraseña)
      async deletePasswordResetToken(token: string): Promise<void> {
        await this.prisma.passwordReset.delete({
          where: { token },
        });
      }
}