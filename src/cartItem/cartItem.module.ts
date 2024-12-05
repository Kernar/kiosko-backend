import { Module } from "@nestjs/common";
import { CartItemController } from "./cartItem.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { CartItemService } from "./cartItem.service";

@Module({
    controllers:[CartItemController],
    providers:[CartItemService],
    imports:[PrismaModule],
})
export class CartItemModule {

}