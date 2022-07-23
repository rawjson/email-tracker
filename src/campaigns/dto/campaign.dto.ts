import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CampaignDto {
  @IsNotEmpty()
  template: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  preview_text: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  from: string;

  @IsOptional()
  content?: string;
}
