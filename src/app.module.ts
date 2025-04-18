import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ColorModule } from './color/color.module'
import { FileModule } from './file/file.module'
import { OrderModule } from './order/order.module'
import { StatisticsModule } from './statistics/statistics.module'
import { StoreModule } from './store/store.module'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { EmailModule } from './email/email.module'
import { RewardsModule } from './rewards/rewards.module'
import { WishlistModule } from './wishlist/wishlist.module';
import { DonationModule } from './donation/donation.module';
import { VideoModule } from './video/video.module';
@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ColorModule,
		CategoryModule,
		FileModule,
		StoreModule,
		OrderModule,
		StatisticsModule,
		ProductModule,
		ReviewModule,
		EmailModule,
		RewardsModule,
		WishlistModule,
		DonationModule,
		VideoModule,
	]
})
export class AppModule {}
