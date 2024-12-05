import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class OrderService{
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
      ) {}
    
      // Obtener todas las órdenes de un usuario
      async getOrdersByUserId(userId: string): Promise<Order[]> {
        const user = await this.userService.getUserById(userId);
        if (!user) throw new NotFoundException('User not found');
    
        return this.prisma.order.findMany({
          where: { userId: user.id },
          include: { items: true }, // Incluir los productos relacionados
        });
      }
    
      // Obtener una orden por su ID
      async getOrderById(orderId: string): Promise<Order> {
        const order = await this.prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });
        if (!order) throw new NotFoundException('Order not found');
        return order;
      }
    
      // Crear una nueva orden
      async createOrder(userId: string, total: number, items: { productId: string; quantity: number }[]): Promise<Order> {
        const user = await this.userService.getUserById(userId);
        if (!user) throw new NotFoundException('User not found');
    
        // Crear la orden
        const order = await this.prisma.order.create({
          data: {
            userId: user.id,
            total,
            status: 'pendiente', // Puedes definir un estado predeterminado como "pendiente"
          },
        });
    
        // Crear los items de la orden
        const orderItems = items.map(item => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: 100, // Aquí deberías obtener el precio actual del producto, para fines de ejemplo usamos 100
        }));
    
        await this.prisma.orderItem.createMany({
          data: orderItems,
        });
    
        return order;
      }
    
      // Actualizar el estado de una orden
      async updateOrderStatus(orderId: string, status: string): Promise<Order> {
        const order = await this.prisma.order.update({
          where: { id: orderId },
          data: { status },
        });
        return order;
      }
    
      // Eliminar una orden
      async deleteOrder(orderId: string): Promise<void> {
        // Primero, eliminamos los items asociados a la orden
        await this.prisma.orderItem.deleteMany({
          where: { orderId: orderId }, // Elimina todos los productos asociados a la orden
        });
      
        // Ahora, eliminamos la orden
        await this.prisma.order.delete({
          where: { id: orderId },
        });
      }
      
      
}