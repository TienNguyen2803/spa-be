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
    const spaInfo = await this.spaInfoRepository.save({
      ...spaInfoData,
    });

    if (banners?.length) {
      spaInfo.banners = await Promise.all(
        banners.map(banner =>
          this.spaInfoRepository.manager.save('Banner', {
            image_url: banner.image_url,
            title: banner.title,
            subtitle: banner.subtitle,
            order: banner.order,
            is_active: banner.is_active,
            type: banner.type,
            spa_info_id: spaInfo.id
          })
        )
      );
    }

    if (workingHours?.length) {
      spaInfo.workingHours = await Promise.all(
        workingHours.map(wh =>
          this.spaInfoRepository.manager.save('WorkingHour', {
            day_of_week: wh.day,
            opening_time: wh.open_time,
            closing_time: wh.close_time,
            is_closed: false,
            spa_info_id: spaInfo.id
          })
        )
      );
    }

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