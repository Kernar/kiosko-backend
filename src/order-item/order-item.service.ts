import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderItem } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderItemService {

    constructor(private prisma: PrismaService) {}

    // Obtener los items de una orden
    async getOrderItems(orderId: string): Promise<OrderItem[]> {
      const orderItems = await this.prisma.orderItem.findMany({
        where: { orderId },
        include: { product: true }, // Incluir el producto relacionado
      });
      if (!orderItems) throw new NotFoundException('Order items not found');
      return orderItems;
    }
  
    // Crear un item en la orden
    async addProductToOrder(orderId: string, productId: string, quantity: number): Promise<OrderItem> {
      const order = await this.prisma.order.findUnique({ where: { id: orderId } });
      if (!order) throw new NotFoundException('Order not found');
  
      const product = await this.prisma.product.findUnique({ where: { id: productId } });
      if (!product) throw new NotFoundException('Product not found');
  
      const orderItem = await this.prisma.orderItem.create({
        data: {
          orderId,
          productId,
          quantity,
          unitPrice: product.price,
        },
      });
  
      return orderItem;
    }
  
    // Eliminar un item de la orden
    async removeOrderItem(orderId: string, productId: string): Promise<void> {
      const orderItem = await this.prisma.orderItem.findUnique({
        where: { orderId_productId: { orderId, productId } },
      });
  
      if (!orderItem) throw new NotFoundException('Order item not found');
  
      await this.prisma.orderItem.delete({
        where: { id: orderItem.id },
      });
    }

}