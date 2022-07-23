import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecipientModule from 'src/recipients/__module';
import SubscriberModule from 'src/subscribers/__module';
import CampaignController from './__controller';
import CampaignEntity from './__entity';
import CampaignService from './__service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignEntity]),
    RecipientModule,
    SubscriberModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export default class CampaignModule {}
