import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DonationController],
  providers: [DonationService, PrismaService],
})
export class DonationModule {}
