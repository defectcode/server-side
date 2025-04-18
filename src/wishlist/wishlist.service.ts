import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WishlistDto } from './dto/WishlistDto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}
  
    async getByProductId(productId: string) {
      return this.prisma.wishlist.findMany({
        where: { productId },
      });
    }
  
    async getById(id: string) {
      const wishlist = await this.prisma.wishlist.findUnique({
        where: { id },
      });
  
      if (!wishlist) {
        throw new NotFoundException(`Wishlist with ID ${id} not found`);
      }
  
      return wishlist;
    }
  
    async create(productId: string, dto: WishlistDto) {
      return this.prisma.wishlist.create({
        data: {
          title: dto.title,
          description: dto.description,
          images: dto.images ?? [],
          productId,
        },
      });
    }
  
    async update(id: string, dto: WishlistDto) {
      await this.getById(id);
  
      return this.prisma.wishlist.update({
        where: { id },
        data: {
          title: dto.title,
          description: dto.description,
          images: dto.images ?? [],
        },
      });
    }
  
    async delete(id: string) {
      await this.getById(id);
  
      return this.prisma.wishlist.delete({
        where: { id },
      });
    }
}
