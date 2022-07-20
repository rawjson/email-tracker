import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EmailController from './__controller';
import EmailService from './__service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [EmailController],
})
export default class EmailModule {}
