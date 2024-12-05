import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    // Obtener todas las órdenes de un usuario
    @Get('user/:userId')
    async getOrdersByUserId(@Param('userId') userId: string) {
      const orders = await this.orderService.getOrdersByUserId(userId);
      return orders;
    }
  
    // Obtener una orden por su ID
    @Get(':orderId')
    async getOrderById(@Param('orderId') orderId: string) {
      const order = await this.orderService.getOrderById(orderId);
      return order;
    }
  
    // Crear una nueva orden
    @Post('user/:userId')
    async createOrder(
      @Param('userId') userId: string,
      @Body() data: { total: number; items: { productId: string; quantity: number }[] }
    ) {
      const order = await this.orderService.createOrder(userId, data.total, data.items);
      return order;
    }
  
    // Actualizar el estado de una orden
    @Put(':orderId')
    async updateOrderStatus(
      @Param('orderId') orderId: string,
      @Body() data: { status: string }
    ) {
      const order = await this.orderService.updateOrderStatus(orderId, data.status);
      return order;
    }
  
    // Eliminar una orden
    @Delete(':orderId')
    async deleteOrder(@Param('orderId') orderId: string) {
      await this.orderService.deleteOrder(orderId);
      return { message: 'Order borrada satisfactoriamente' };
    }
}