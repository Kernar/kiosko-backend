import { Module } from "@nestjs/common";
import { PassResetController } from "./pass-controller";
import { PassResetService } from "./pass-reset.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers:[PassResetController],
    providers:[PassResetService, ],
    imports:[PrismaModule, UserModule],
})
export class PassResetModule {

}