import { Injectable, NotFoundException } from "@nestjs/common";
import { CartItem } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartItemService {
    constructor(private prisma: PrismaService) {}

    // Agregar un producto al carrito
    async addProductToCart(cartId: string, productId: string, quantity: number): Promise<CartItem> {
      // Verifica si el producto existe
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new NotFoundException('Product not found');
  
      // Verifica si el carrito existe
      const cart = await this.prisma.cart.findUnique({
        where: { id: cartId },
      });
      if (!cart) throw new NotFoundException('Cart not found');
  
      // Verifica si el producto ya está en el carrito
      const existingCartItem = await this.prisma.cartItem.findUnique({
        where: { cartId_productId: { cartId, productId } },
      });
  
      if (existingCartItem) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        return this.prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
      } else {
        // Si el producto no está en el carrito, lo agrega
        return this.prisma.cartItem.create({
          data: {
            cartId,
            productId,
            quantity,
            currentPrice: product.price,
          },
        });
      }
    }
  
    // Eliminar un producto del carrito
    async removeProductFromCart(cartId: string, productId: string): Promise<void> {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: { cartId_productId: { cartId, productId } },
      });
  
      if (!cartItem) throw new NotFoundException('Product not found in cart');
  
      await this.prisma.cartItem.delete({
        where: { id: cartItem.id },
      });
    }
  
    // Obtener todos los productos de un carrito
    async getCartItems(cartId: string): Promise<CartItem[]> {
      return this.prisma.cartItem.findMany({
        where: { cartId },
        include: { product: true }, // Incluye los detalles del producto
      });
    }
}