import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './modules/catalog/catalog.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [CatalogModule, AccountsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
