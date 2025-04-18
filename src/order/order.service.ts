import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { EnumOrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService, private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'));
  }

  async getTotalDonations() {
    const total = await this.prisma.transaction.aggregate({
      _sum: { amount: true }, // Se calculează suma totală din tabelul Transaction
    });
  
    return { totalDonations: total._sum.amount || 0 };
  }

  async getProductDonationsFromTransactions(productId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        productId,
      },
      select: {
        amount: true,
        paymentIntentId: true,
      },
    });
  
    const totalRaised = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalGifters = new Set(transactions.map(tx => tx.paymentIntentId)).size;
  
    return {
      productId,
      totalRaised,
      totalGifters,
    };
  }
  
  
  async getDonationsByProduct(productId: string) {
    const items = await this.prisma.orderItem.findMany({
      where: {
        productId: productId,
        order: {
          paymentStatus: 'succeeded'
        }
      },
      select: {
        price: true,
        quantity: true
      }
    });
  
    const totalRaised = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  
    return {
      productId,
      totalRaised,
      totalOrders: items.length // sau un `Set` cu orderId dacă vrei doar comenzi unice
    };
  }
  
  
  

  async createOrderAndPay(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map(item => ({
      quantity: item.quantity,
      price: item.price,
      product: { connect: { id: item.productId } },
      store: { connect: { id: item.storeId } },
    }));

    

    const total = dto.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await this.prisma.order.create({
      data: {
        status: EnumOrderStatus.PENDING,
        items: { create: orderItems },
        total,
        user: { connect: { id: userId } },
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { orderId: order.id },
    });

    if (!paymentIntent.id) {
      throw new Error('PaymentIntent creation failed: Missing ID');
    }

    await this.prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return { clientSecret: paymentIntent.client_secret, orderId: order.id };
  }

  async saveTransaction(dto: PaymentStatusDto) {
    if (!dto.object.id || typeof dto.object.id !== 'string') {
      throw new Error('Invalid paymentIntentId');
    }
    
    const paymentIntent = await this.stripe.paymentIntents.retrieve(dto.object.id);
    
    if (paymentIntent.status === 'succeeded') {
      const order = await this.prisma.order.findUnique({
        where: { paymentIntentId: dto.object.id },
        include: { items: true }, 
      });
    
      if (!order) {
        throw new Error('Order not found for this paymentIntentId');
      }
    
      for (const item of order.items) {
      if (!item.productId) continue;
    
      await this.prisma.transaction.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          amount: item.price * item.quantity,
          paymentIntentId: paymentIntent.id,
          paymentMethod: paymentIntent.payment_method_types?.[0] || null,
        },
      });
    }
    
    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status: EnumOrderStatus.PAYED,
        paymentStatus: 'succeeded',
      },
	  });
  
	  return { success: true };
	}
  
	return { success: false, status: paymentIntent.status };
  }
  
  async getSalesForProduct(productId: string) {
    const sales = await this.prisma.transaction.aggregate({
      where: { productId },
      _sum: { amount: true },
    });
    
    return { productId, totalRevenue: sales._sum.amount || 0 };
  }
  
}
