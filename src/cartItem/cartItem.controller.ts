import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CartItemService } from "./cartItem.service";

@Controller('cart-item')
export class CartItemController {
    constructor(private readonly cartItemService: CartItemService) {}

    // Obtener los productos de un carrito
    @Get(':cartId')
    async getCartItems(@Param('cartId') cartId: string) {
      const items = await this.cartItemService.getCartItems(cartId);
      return items;
    }
  
    // Agregar un producto al carrito
    @Post(':cartId')
    async addProductToCart(
      @Param('cartId') cartId: string,
      @Body() data: { productId: string; quantity: number },
    ) {
      const cartItem = await this.cartItemService.addProductToCart(
        cartId,
        data.productId,
        data.quantity,
      );
      return cartItem;
    }
  
    // Eliminar un producto del carrito
    @Delete(':cartId/:productId')
    async removeProductFromCart(
      @Param('cartId') cartId: string,
      @Param('productId') productId: string,
    ) {
      await this.cartItemService.removeProductFromCart(cartId, productId);
      return { message: 'Product removido del carrito satisfactoriamente' };
    }
}