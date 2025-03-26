
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Banner } from '../../banners/entities/banner.entity';
import { WorkingHour } from '../../working-hours/entities/working-hour.entity';

@Entity()
export class SpaInfo extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo_url: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column('text')
  description: string;

  @Column()
  seo_title: string;

  @Column('text')
  seo_description: string;

  @Column()
  facebook_url: string;

  @Column()
  instagram_url: string;

  @Column()
  updated_at: Date;

  @OneToMany(() => Banner, (banner) => banner.spaInfo)
  banners: Banner[];

  @OneToMany(() => WorkingHour, (workingHour) => workingHour.spaInfo)
  workingHours: WorkingHour[];
}
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SpaInfo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
