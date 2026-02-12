import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; firstName: string; lastName: string }) {
    return this.accountsService.register(body.email, body.password, body.firstName, body.lastName);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.accountsService.login(body.email, body.password);
  }

  @Get('profile')
  getProfile() {
    return this.accountsService.getProfile();
  }

  @Get('orders')
  getOrders() {
    return this.accountsService.getOrderHistory();
  }
}
