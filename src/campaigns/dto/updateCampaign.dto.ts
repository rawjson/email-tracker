import { IsOptional } from 'class-validator';

export default class UpdateCampaignDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  subject?: string;

  @IsOptional()
  preview_text?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  from?: string;

  @IsOptional()
  template?: string;
}
