import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
    controllers:[OrderController],
    providers:[OrderService],
    imports:[PrismaModule, UserModule],
})
export class OrderModule {

}