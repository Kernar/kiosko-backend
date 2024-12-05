import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { PasswordReset } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import * as crypto from 'crypto';  // Usaremos crypto para generar un token único
import { PassResetService } from "./pass-reset.service";

@Controller('pass-reset')
export class PassResetController {
    constructor(private readonly passwordResetService: PassResetService) {}

    // Solicitar un token de restablecimiento de contraseña
    @Post()
    async createPasswordResetToken(@Body() data: { email: string }) {
      const reset = await this.passwordResetService.createPasswordResetToken(data.email);
      return { message: 'Password reset token created successfully', token: reset.token };
    }
  
    // Verificar un token de restablecimiento de contraseña
    @Get(':token')
    async verifyToken(@Param('token') token: string) {
      const resetRequest = await this.passwordResetService.verifyToken(token);
      return {
        message: 'Token is valid',
        userId: resetRequest.userId,
        expiresAt: resetRequest.expiresAt,
      };
    }
  
    // Eliminar un token después de usarlo (por ejemplo, cuando se restablece la contraseña)
    @Delete(':token')
    async deletePasswordResetToken(@Param('token') token: string) {
      await this.passwordResetService.deletePasswordResetToken(token);
      return { message: 'Password reset token deleted successfully' };
    }
}