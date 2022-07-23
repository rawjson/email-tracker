import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CampaignModule from './campaigns/__module';
import EmailModule from './email/__module';
import SubscriberModule from './subscribers/__module';
import { AppController } from './__app.controller';
import { AppService } from './__app.service';
import { DatabaseModule } from './__db.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    SubscriberModule,
    DatabaseModule,
    EmailModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
