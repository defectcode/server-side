import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @HttpCode(200)
  @Get('products/:productId')
  async getSalesForProduct(@Param('productId') productId: string) {
    return this.orderService.getSalesForProduct(productId);
  }

  @Get('total-donations')
  async getTotalDonations() {
    return this.orderService.getTotalDonations();
  }

  @HttpCode(201)
  @Post('place')  // ✅ Acest endpoint trebuie să fie definit
  async placeOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrderAndPay(orderDto, 'user_id_placeholder');
  }

  @Get('product-donations/:productId')
  async getDonationsByProduct(@Param('productId') productId: string) {
    return this.orderService.getDonationsByProduct(productId);
  }

  @Get('transactions/product/:productId')
  async getDonationsFromTransactions(@Param('productId') productId: string) {
    return this.orderService.getProductDonationsFromTransactions(productId);
  }


}
