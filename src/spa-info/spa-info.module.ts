
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaInfo } from './entities/spa-info.entity';
import { SpaInfoController } from './spa-info.controller';
import { SpaInfoService } from './spa-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpaInfo])],
  controllers: [SpaInfoController],
  providers: [SpaInfoService],
  exports: [SpaInfoService],
})
export class SpaInfoModule {}
