import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    // Obtener el carrito de un usuario por su ID
    @Get('user/:userId')
    async getCartByUserId(@Param('userId') userId: string) {
      const cart = await this.cartService.getCartByUserId(userId);
      return cart;
    }
  
    // Crear un carrito para un usuario (si no tiene uno)
    @Post('user/:userId')
    async createCart(@Param('userId') userId: string) {
      const cart = await this.cartService.createCart(userId);
      return cart;
    }
  
    // Actualizar el estado de un carrito (activo/desactivado)
    @Put('user/:userId')
    async updateCart(@Param('userId') userId: string, @Body() data: { isActive: boolean }) {
      const updatedCart = await this.cartService.updateCart(userId, data.isActive);
      return updatedCart;
    }
  
    // Eliminar un carrito de un usuario
    @Delete('user/:userId')
    async deleteCart(@Param('userId') userId: string) {
      await this.cartService.deleteCart(userId);
      return { message: 'Cart deleted successfully' };
    }
}