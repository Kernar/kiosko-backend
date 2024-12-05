import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "@prisma/client";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts() {
      return this.productService.getAllProducts();
    }
  
    @Get(':id')
    async getProductById(@Param('id') id: string) {
      const productFound = await this.productService.getProductById(id);
      if (!productFound) throw new NotFoundException('Producto no encontrado');
      return productFound;
    }
  
    @Post()
    async createProduct(@Body() data: Product) {
      return this.productService.createProduct(data);
    }

    @Post('bulk')
    async createMultipleProducts(@Body() products: Product[]) {
      return this.productService.createMultipleProducts(products);
    }
    
  
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() data: Product) {
      try {
        return await this.productService.updateProduct(id, data);
      } catch (error) {
        throw new NotFoundException('product no existe');
      }
    }
  
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
      try {
        return await this.productService.deleteProduct(id);
      } catch (error) {
        throw new NotFoundException('product no existe');
      }
    }
}
