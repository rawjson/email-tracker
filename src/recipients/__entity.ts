import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import CampaignEntity from 'src/campaigns/__entity';

@Entity('recipients')
export default class RecipientEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.recipients, {
    onDelete: 'CASCADE',
  })
  campaign: CampaignEntity;

  @Column({ default: 0 })
  opens: number;

  @Column({ nullable: true })
  lastseen: string;

  @Column({ nullable: true })
  lastseen_milsec: number;

  @Column({ default: false })
  email_sent: boolean;

  @Column({ nullable: true })
  sbs_id: string;

  @Column({ default: false })
  unsubscribed: boolean;

  @Column({ nullable: true })
  link_clicked: number;

  @Column({ nullable: true })
  ip: string;
}
