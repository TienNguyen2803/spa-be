
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

    // Create spa info
    const spaInfo = await this.spaInfoRepository.save(
      this.spaInfoRepository.create(spaInfoData),
    );

    // Create banners if provided
    if (banners?.length) {
      await this.spaInfoRepository
        .createQueryBuilder()
        .relation(SpaInfo, 'banners')
        .of(spaInfo)
        .add(banners.map(banner => ({
          ...banner,
          spa_info_id: spaInfo.id
        })));
    }

    // Create working hours if provided
    if (workingHours?.length) {
      await this.spaInfoRepository
        .createQueryBuilder()
        .relation(SpaInfo, 'workingHours')
        .of(spaInfo)
        .add(workingHours.map(wh => ({
          ...wh,
          spa_info_id: spaInfo.id
        })));
    }

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
    });
  }

  standardCount(): Promise<number> {
    return this.spaInfoRepository.count();
  }

  findOne(id: number): Promise<SpaInfo> {
    return this.spaInfoRepository.findOneOrFail({
      where: { id },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.spaInfoRepository.softDelete(id);
  }
}
