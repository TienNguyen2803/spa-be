
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';

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
}
