import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { WishlistDto } from './dto/WishlistDto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  
    @Auth()
    @HttpCode(200)
    @Post('create/:productId') 
    async createReward(
      @Param('productId') productId: string, 
      @Body() dto: WishlistDto
    ) {
      console.log(`Creating reward for productId: ${productId}`);
      return this.wishlistService.create(productId, dto);
    }
  
    @Auth()
    @HttpCode(200)
    @Put('update/:rewardId') 
    async updateReward(
      @Param('rewardId') rewardId: string, 
      @Body() dto: WishlistDto
    ) {
      console.log(`Updating reward with ID: ${rewardId}`);
      return this.wishlistService.update(rewardId, dto);
    }
  
    @Auth()
    @HttpCode(200)
    @Delete('delete/:rewardId') 
    async deleteReward(
      @Param('rewardId') rewardId: string
    ) {
      console.log(`Deleting reward with ID: ${rewardId}`);
      return this.wishlistService.delete(rewardId);
    }
  
    @Auth()
    @HttpCode(200)
    @Get('product/:productId') 
    async getRewardsByProduct(
      @Param('productId') productId: string
    ) {
      console.log(`Fetching rewards for productId: ${productId}`);
      return this.wishlistService.getByProductId(productId);
    }
}
