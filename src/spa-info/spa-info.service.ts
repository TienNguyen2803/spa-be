
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';

@Injectable()
export class SpaInfoService {
  constructor(
    @InjectRepository(SpaInfo)
    private spaInfoRepository: Repository<SpaInfo>,
  ) { }

  create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo> {
    return this.spaInfoRepository.save(
      this.spaInfoRepository.create(createSpaInfoDto),
    );
  }

  findManyWithPagination({ page, limit, offset }: IPaginationOptions) {
    return this.spaInfoRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
  }

  standardCount(): Promise<number> {
    return this.spaInfoRepository.count();
  }

  findOne(id: number): Promise<SpaInfo> {
    return this.spaInfoRepository.findOne({
      where: { id },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.spaInfoRepository.softDelete(id);
  }
}
