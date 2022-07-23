import { IsNotEmpty } from 'class-validator';

export default class RecipientsDto {
  @IsNotEmpty()
  recipient_tag: string;

  @IsNotEmpty()
  campaign_id: string;
}
