
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { SpaInfo } from '../../spa-info/entities/spa-info.entity';

@Entity()
export class WorkingHour extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day_of_week: string;

  @Column('time')
  opening_time: string;

  @Column('time')
  closing_time: string;

  @Column()
  is_closed: boolean;

  @ManyToOne(() => SpaInfo, (spaInfo) => spaInfo.workingHours)
  spaInfo: SpaInfo;

  @Column()
  spa_info_id: number;
}
