import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { DonationService } from './donation.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { DonationDto } from './dto/donation.dto';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Auth()
    @HttpCode(200)
    @Post('create/:productId') 
    async createReward(
      @Param('productId') productId: string, 
      @Body() dto: DonationDto
    ) {
      console.log(`Creating reward for productId: ${productId}`);
      return this.donationService.create(productId, dto);
    }

    @HttpCode(200)
    @Get('product/:productId')
    async getByProductId(@Param('productId') productId: string) {
      console.log('[Backend] Fetching donations for product:', productId);
      return this.donationService.getByProductId(productId);
    }

  
    @Auth()
    @HttpCode(200)
    @Put('update/:rewardId') 
    async updateReward(
      @Param('rewardId') rewardId: string, 
      @Body() dto: DonationDto
    ) {
      console.log(`Updating reward with ID: ${rewardId}`);
      return this.donationService.update(rewardId, dto);
    }
  
    @Auth()
    @HttpCode(200)
    @Delete('delete/:rewardId') 
    async deleteReward(
      @Param('rewardId') rewardId: string
    ) {
      console.log(`Deleting reward with ID: ${rewardId}`);
      return this.donationService.delete(rewardId);
    }
  
    @Auth()
    @HttpCode(200)
    @Get('product/:productId') 
    async getRewardsByProduct(
      @Param('productId') productId: string
    ) {
      console.log(`Fetching rewards for productId: ${productId}`);
      return this.donationService.getByProductId(productId);
    }
}
