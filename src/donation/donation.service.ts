import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { DonationDto } from './dto/donation.dto';

@Injectable()
export class DonationService {
  constructor(private prisma: PrismaService) {} 

  async getByProductId(productId: string) {
      return this.prisma.donation.findMany({
        where: { productId },
      });
    }
  
    async getById(id: string) {
      const reward = await this.prisma.donation.findUnique({
        where: { id },
      });
  
      if (!reward) {
        throw new NotFoundException(`Reward with ID ${id} not found`);
      }
  
      return reward;
    }
  
    async create(productId: string, dto: DonationDto) {
        return this.prisma.donation.create({
          data: {
            description: dto.description,
            amountGoal: dto.amountGoal,
            productId: productId,
          },
        });
      }
      
  
    async update(id: string, dto: DonationDto) {
      await this.getById(id);
  
      return this.prisma.donation.update({
        where: { id },
        data: {
          description: dto.description,
          amountGoal: dto.amountGoal,
        },
      });
    }
  
    async delete(id: string) {
      await this.getById(id);
  
      return this.prisma.donation.delete({
        where: { id },
      });
    }
}
