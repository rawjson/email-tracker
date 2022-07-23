import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import RecipientsDto from 'src/recipients/dto/recipient.dto';
import CampaignDto from './dto/campaign.dto';
import UpdateCampaignDto from './dto/updateCampaign.dto';
import CampaignService from './__service';

@Controller('campaigns')
export default class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('/create')
  createCampaign(@Body() data: CampaignDto) {
    return this.campaignService.createCampaign(data);
  }

  @Get()
  getCampaigns(@Query() query: { page: string }) {
    return this.campaignService.getCampaigns(Number(query.page));
  }

  @Get('/:id')
  getCampaignById(@Param('id') id: string) {
    return this.campaignService.getCampaignById(id);
  }

  @Delete('/:id')
  deleteCampaign(@Param('id') id: string) {
    return this.campaignService.deleteCampaign(id);
  }

  @Patch('/:id')
  updateCampaign(@Param('id') id: string, @Body() data: UpdateCampaignDto) {
    return this.campaignService.updateCampaign(id, data);
  }

  @Post('/recipients/add/tagged')
  addRecipients(@Body() data: RecipientsDto) {
    return this.campaignService.addRecipientsByTag(data);
  }

  @Get('/recipients/:id')
  getAllCampaignRecipients(
    @Param('id') id: string,
    @Query() query: { page: string },
  ) {
    return this.campaignService.getAllCampaignRecipients(id, query.page);
  }

  @Delete('/recipients/:id')
  removeRecipient(@Param('id') id: string) {
    return this.campaignService.removeRecipient(id);
  }
}
