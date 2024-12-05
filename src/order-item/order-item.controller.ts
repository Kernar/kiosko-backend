import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { OrderItemService } from "./order-item.service";

@Controller('order-item')
export class OrderItemController {
    
    constructor(private readonly orderItemService: OrderItemService) {}

    // Obtener los items de una orden
    @Get(':orderId')
    async getOrderItems(@Param('orderId') orderId: string) {
      const items = await this.orderItemService.getOrderItems(orderId);
      return items;
    }
  
    // Crear un item en una orden
    @Post(':orderId')
    async addProductToOrder(
      @Param('orderId') orderId: string,
      @Body() data: { productId: string; quantity: number },
    ) {
      const orderItem = await this.orderItemService.addProductToOrder(
        orderId,
        data.productId,
        data.quantity,
      );
      
      return{
        message: 'Product added successfully to order',
        orderItem,
      };
    }
  
    // Eliminar un item de la orden
    @Delete(':orderId/:productId')
    async removeOrderItem(
      @Param('orderId') orderId: string,
      @Param('productId') productId: string,
    ) {
      await this.orderItemService.removeOrderItem(orderId, productId);
      return { message: 'Producto removido de order' };
    }

}