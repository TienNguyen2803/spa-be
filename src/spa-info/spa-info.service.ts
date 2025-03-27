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

  async create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo> {
    const { banners, workingHours, ...spaInfoData } = createSpaInfoDto;

    // Create spa info with relations
    const spaInfo = this.spaInfoRepository.create({
      ...spaInfoData,
      banners: banners?.map(banner => ({
        ...banner,
      })),
      workingHours: workingHours?.map(wh => ({
        ...wh,
      })),
    });

    // Save everything in one transaction
    await this.spaInfoRepository.save(spaInfo);

    return this.spaInfoRepository.findOneOrFail({
      where: { id: spaInfo.id },
      relations: ['banners', 'workingHours']
    });
  }

  findManyWithPagination({ page, limit, offset }: IPaginationOptions) {
    return this.spaInfoRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'DESC',
      },
      relations: ['banners', 'workingHours'],
    });
  }

  standardCount(): Promise<number> {
    return this.spaInfoRepository.count();
  }

  findOne(id: number): Promise<SpaInfo> {
    return this.spaInfoRepository.findOneOrFail({
      where: { id },
      relations: ['banners', 'workingHours'],
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.spaInfoRepository.softDelete(id);
  }
}