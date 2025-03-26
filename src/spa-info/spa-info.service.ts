
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
import { NullableType } from '../utils/types/nullable.type';

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

  findOne(fields: EntityCondition<SpaInfo>): Promise<NullableType<SpaInfo>> {
    return this.spaInfoRepository.findOne({
      where: fields,
    });
  }

  update(id: SpaInfo['id'], payload: DeepPartial<SpaInfo>): Promise<SpaInfo> {
    return this.spaInfoRepository.save(
      this.spaInfoRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: SpaInfo['id']): Promise<void> {
    await this.spaInfoRepository.softDelete(id);
  }
}
