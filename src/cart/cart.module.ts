import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers:[CartController],
    providers:[CartService, ],
    imports:[PrismaModule, UserModule],
})
export class CartModule {

}