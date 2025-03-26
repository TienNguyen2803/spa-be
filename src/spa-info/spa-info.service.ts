
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class SpaInfoService {
  constructor(
    @InjectRepository(SpaInfo)
    private spaInfoRepository: Repository<SpaInfo>,
  ) {}

  create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo> {
    return this.spaInfoRepository.save(
      this.spaInfoRepository.create(createSpaInfoDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<SpaInfo[]> {
    return this.spaInfoRepository.find({
      skip: paginationOptions.offset,
      take: paginationOptions.limit,
    });
  }

  standardCount(): Promise<number> {
    return this.spaInfoRepository.count();
  }
}
