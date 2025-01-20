import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '60m' }
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}