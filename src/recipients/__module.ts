import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecipientEntity from './__entity';
import RecipientService from './__service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipientEntity])],
  providers: [RecipientService],
  exports: [RecipientService],
})
export default class RecipientModule {}
