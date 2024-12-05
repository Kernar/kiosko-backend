import { Injectable, NotFoundException } from "@nestjs/common";
import { Cart } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class CartService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService, // Para interactuar con los usuarios
      ) {}
    
      // Obtener el carrito de un usuario
      async getCartByUserId(userId: string): Promise<Cart> {
        const user = await this.userService.getUserById(userId);
        if (!user) throw new NotFoundException('User not found');
        
        const cart = await this.prisma.cart.findUnique({
          where: { userId: user.id },
          include: { items: true }, // Incluye los elementos del carrito
        });
    
        if (!cart) throw new NotFoundException('Cart not found');
        return cart;
      }
    
      // Crear un carrito nuevo para un usuario
      async createCart(userId: string): Promise<Cart> {
        const user = await this.userService.getUserById(userId);
        if (!user){
            console.log('No user found with id:', userId); 
            throw new NotFoundException('User not found');
        } 
    
        const cart = await this.prisma.cart.create({
          data: {
            userId: user.id,
            isActive: true, // Por defecto, el carrito se crea como activo
          },
        });
        return cart;
      }
    
      // Actualizar un carrito (como activar o desactivar el carrito)
      async updateCart(userId: string, isActive: boolean): Promise<Cart> {
        const cart = await this.getCartByUserId(userId); // Verifica si el carrito existe
        return this.prisma.cart.update({
          where: { id: cart.id },
          data: { isActive },
        });
      }
    
      // Eliminar un carrito (si fuera necesario)
      async deleteCart(userId: string): Promise<void> {
        const cart = await this.getCartByUserId(userId); // Verifica si el carrito existe
        await this.prisma.cart.delete({
          where: { id: cart.id },
        });
      }
}