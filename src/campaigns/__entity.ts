import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import RecipientEntity from 'src/recipients/__entity';

@Entity('campaigns')
export default class CampaignEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  preview_text: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  from: string;

  @Column()
  template: string;

  @OneToMany(() => RecipientEntity, (recipients) => recipients.campaign)
  recipients: RecipientEntity[];

  @Column({ nullable: true })
  last_sent: string;
}
