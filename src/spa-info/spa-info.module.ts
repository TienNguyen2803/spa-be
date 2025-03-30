
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaInfoService } from './spa-info.service';
import { SpaInfoController } from './spa-info.controller';
import { SpaInfo } from './entities/spa-info.entity';
import { Banner } from 'src/banners/entities/banner.entity';
import { WorkingHour } from 'src/working-hours/entities/working-hour.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([SpaInfo, Banner, WorkingHour]), CommonModule],
  controllers: [SpaInfoController],
  providers: [SpaInfoService],
  exports: [SpaInfoService],
})
export class SpaInfoModule { }
