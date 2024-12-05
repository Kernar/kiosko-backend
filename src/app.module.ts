import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CartItemModule } from './cartItem/cartItem.module';
import { CartModule } from './cart/cart.module';
import { PassResetModule } from './password-reset/pass-reset.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    UserModule, PrismaModule, ProductModule, CartItemModule, CartModule, PassResetModule, OrderModule, OrderItemModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
