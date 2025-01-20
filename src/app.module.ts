import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      autoLoadEntities: true, // Carrega automaticamente as entidades dos módulos
      synchronize: true, // Use apenas em desenvolvimento
    }),
    UserModule,
    CategoryModule,
    TransactionModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}