import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
export declare class SpaInfoService {
    private spaInfoRepository;
    constructor(spaInfoRepository: Repository<SpaInfo>);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions): Promise<SpaInfo[]>;
    standardCount(): Promise<number>;
}
