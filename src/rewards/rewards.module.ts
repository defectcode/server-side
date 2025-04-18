import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { PrismaService } from 'src/prisma.service';
import { RewardsController } from './rewards.controller';

@Module({
  controllers: [RewardsController],
  providers: [RewardsService, PrismaService],
})
export class RewardsModule {}
