import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule global
      envFilePath: '.env', // Especifica o caminho do arquivo .env
    }),
    UserModule,
    CategoryModule,
    TransactionModule,
    DashboardModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
