import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    controllers:[ProductController],
    providers:[ProductService],
    imports:[PrismaModule],
})
export class ProductModule {

}