import { Module } from "@nestjs/common";
import { OrderItemController } from "./order-item.controller";
import { OrderItemService } from "./order-item.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    controllers:[OrderItemController],
    providers:[OrderItemService],
    imports:[PrismaModule],
})
export class OrderItemModule {

}