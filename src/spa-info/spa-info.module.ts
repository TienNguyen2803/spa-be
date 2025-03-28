
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaInfoService } from './spa-info.service';
import { SpaInfoController } from './spa-info.controller';
import { SpaInfo } from './entities/spa-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaInfo])],
  controllers: [SpaInfoController],
  providers: [SpaInfoService],
  exports: [SpaInfoService],
})
export class SpaInfoModule {}
