import { Controller, Post, Put, Delete, Body, Param, Get, HttpCode } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsDto } from './dto/rewards.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Auth()
  @HttpCode(200)
  @Post('create/:productId') 
  async createReward(
    @Param('productId') productId: string, 
    @Body() dto: RewardsDto
  ) {
    console.log(`Creating reward for productId: ${productId}`);
    return this.rewardsService.create(productId, dto);
  }

  @Auth()
  @HttpCode(200)
  @Put('update/:rewardId') 
  async updateReward(
    @Param('rewardId') rewardId: string, 
    @Body() dto: RewardsDto
  ) {
    console.log(`Updating reward with ID: ${rewardId}`);
    return this.rewardsService.update(rewardId, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete('delete/:rewardId') 
  async deleteReward(
    @Param('rewardId') rewardId: string
  ) {
    console.log(`Deleting reward with ID: ${rewardId}`);
    return this.rewardsService.delete(rewardId);
  }

  @Auth()
  @HttpCode(200)
  @Get('product/:productId') 
  async getRewardsByProduct(
    @Param('productId') productId: string
  ) {
    console.log(`Fetching rewards for productId: ${productId}`);
    return this.rewardsService.getByProductId(productId);
  }
}
