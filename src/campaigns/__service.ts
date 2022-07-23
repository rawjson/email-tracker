import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CampaignDto from './dto/campaign.dto';
import CampaignEntity from './__entity';
import { nanoid } from 'src/nanoid/nanoid';
import UpdateCampaignDto from './dto/updateCampaign.dto';
import RecipientEntity from 'src/recipients/__entity';
import RecipientsDto from 'src/recipients/dto/recipient.dto';
import SubscriberService from 'src/subscribers/__service';
import RecipientService from 'src/recipients/__service';
import SubscriberEntity from 'src/subscribers/__entity';

@Injectable()
export default class CampaignService {
  private logger = new Logger('CampaignService');
  constructor(
    @InjectRepository(CampaignEntity)
    private campaignRepository: Repository<CampaignEntity>,
    private recipientService: RecipientService,
    private subscriberService: SubscriberService,
  ) {}

  async createCampaign(data: CampaignDto) {
    const campaign = this.campaignRepository.create({
      id: `cam_${nanoid()}`,
      name: data.name,
      template: data.template,
      subject: data.subject,
      from: data.from,
      content: data.content,
      preview_text: data.preview_text,
    });
    try {
      return await this.campaignRepository.save(campaign);
    } catch (error) {
      this.logger.error(error.code, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getCampaigns(page: number) {
    const pageSize = 20;
    const [campaigns, count] = await this.campaignRepository.findAndCount({
      skip: ((page ? page : 1) - 1) * 20,
      take: pageSize,
    });
    return {
      object: 'campaigns',
      data: campaigns,
      total: count,
      limit: pageSize,
      page,
    };
  }

  async getCampaignById(id: string) {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign)
      throw new NotFoundException({ message: 'No campaign found' });
    return campaign;
  }

  async updateCampaign(campaign_id: string, data: UpdateCampaignDto) {
    Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
    const campaign = new CampaignEntity();
    campaign.id = campaign_id;
    Object.assign(campaign, data);
    await this.campaignRepository.save(campaign);
    return { message: 'Campaign updated!' };
  }

  async deleteCampaign(id: string) {
    return this.campaignRepository.delete(id);
  }

  async addRecipientsByTag(data: RecipientsDto): Promise<{
    message: string;
    skipped: number;
    added: number;
    recipients: RecipientEntity[];
  }> {
    const { recipient_tag, campaign_id } = data;
    const subscribers = await this.subscriberService.getSubscribersByTag(
      recipient_tag,
    );

    const recipients: RecipientEntity[] =
      await this.recipientService.getRecipientsByCampaignId(campaign_id);

    let skipped: number = 0;
    const newRecipients: RecipientEntity[] = [];

    await Promise.all(
      subscribers.map(async (subscriber: SubscriberEntity) => {
        const alreadyAdded = recipients.find(
          (rec: RecipientEntity) => rec.email == subscriber.email,
        );
        if (alreadyAdded) {
          return skipped++;
        } else {
          const recipient: RecipientEntity =
            await this.recipientService.createRecipients(
              subscriber,
              campaign_id,
            );
          newRecipients.push(recipient);
          return recipient;
        }
      }),
    );

    return {
      message: 'Recipients added',
      skipped,
      added: newRecipients.length,
      recipients: newRecipients,
    };
  }

  async getAllCampaignRecipients(id: string, page: string) {
    return this.recipientService.getRecipients(id, Number(page));
  }

  async removeRecipient(id: string) {
    return this.recipientService.removeRecipient(id);
  }
}
