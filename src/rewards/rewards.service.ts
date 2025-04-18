import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RewardsDto } from './dto/rewards.dto';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async getByProductId(productId: string) {
    return this.prisma.rewards.findMany({
      where: { productId },
    });
  }

  async getById(id: string) {
    const reward = await this.prisma.rewards.findUnique({
      where: { id },
    });

    if (!reward) {
      throw new NotFoundException(`Reward with ID ${id} not found`);
    }

    return reward;
  }

  async create(productId: string, dto: RewardsDto) {
    return this.prisma.rewards.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        productId,
      },
    });
  }

  async update(id: string, dto: RewardsDto) {
    await this.getById(id);

    return this.prisma.rewards.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prisma.rewards.delete({
      where: { id },
    });
  }
}
