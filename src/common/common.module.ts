import { Module } from '@nestjs/common';
import { FilterService } from './services/filter.services';

@Module({
  providers: [FilterService],
  exports: [FilterService],
})
export class CommonModule { }