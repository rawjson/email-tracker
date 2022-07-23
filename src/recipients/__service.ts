import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RecipientEntity from './__entity';
import { getRepository, Repository } from 'typeorm';
import { nanoid } from 'src/nanoid/nanoid';
import SubscriberEntity from 'src/subscribers/__entity';

@Injectable()
export default class RecipientService {
  private logger = new Logger('RecipientService');
  constructor(
    @InjectRepository(RecipientEntity)
    private recipientRepository: Repository<RecipientEntity>,
  ) {}

  async getRecipientsByCampaignId(campaign_id: string) {
    const recipients = await this.recipientRepository.find({
      where: { campaign: { id: campaign_id } },
    });
    return recipients;
  }

  async createRecipients(
    subscriber: SubscriberEntity,
    campaign_id: string,
  ): Promise<RecipientEntity> {
    const recipient: RecipientEntity = this.recipientRepository.create({
      id: `rec_${nanoid()}`,
      email: subscriber.email,
      name: subscriber.name,
      sbs_id: subscriber.id,
      campaign: { id: campaign_id },
    });

    try {
      return this.recipientRepository.save(recipient);
    } catch (error) {
      this.logger.error(error.code, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getRecipients(id: string, page: number) {
    const pageSize = 20;

    const [recipients, count] = await this.recipientRepository.findAndCount({
      where: { campaign: { id } },
      skip: ((page ? page : 1) - 1) * pageSize,
      take: pageSize,
    });

    return {
      object: 'recipients',
      data: recipients,
      total: count,
      limit: pageSize,
      page: !page ? 1 : page,
    };
  }

  async removeRecipient(id: string) {
    return this.recipientRepository.delete(id);
  }
}
