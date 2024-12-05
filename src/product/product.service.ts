import { Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getAllProducts(): Promise<Product[]> {
      return this.prisma.product.findMany();
    }
  
    async getProductById(id: string): Promise<Product> {
      return this.prisma.product.findUnique({
        where: {
          id: id,
        },
      });
    }
  
    async createProduct(data: Product): Promise<Product> {
      return this.prisma.product.create({
        data,
      });
    }

    async createMultipleProducts(products: any[]): Promise<Product[]> {
        // Solo pasa las propiedades que Prisma necesita para crear los productos
        const data = products.map(product => ({
          name: product.name,
          description: product.description,
          price: product.price,
          brand: product.brand,
          imageUrl: product.imageUrl,
          availableStock: product.availableStock,
        }));
    
        // Crear múltiples productos con createMany
        await this.prisma.product.createMany({
          data, // Se pasa el array con solo los datos relevantes
          skipDuplicates: true, // Para evitar duplicados si ya existen productos con el mismo ID
        });
    
        // Obtener y devolver los productos que fueron creados
        return this.prisma.product.findMany({
          where: {
            id: {
              in: products.map(product => product.id), // Filtramos por los nombres de los productos
            },
          },
        });
      } catch (error) {
        console.error("Error al crear productos:", error); // Esto ayudará a ver el error en los logs
        throw new Error("Error al crear productos");
      }
  
    async updateProduct(id: string, data: Product): Promise<Product> {
      return this.prisma.product.update({
        where: {
          id: id,
        },
        data,
      });
    }
  
    async deleteProduct(id: string): Promise<Product> {
      return this.prisma.product.delete({
        where: {
          id: id,
        },
      });
    }
}
