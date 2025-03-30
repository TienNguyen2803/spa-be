import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
export declare class SpaInfoService {
    private spaInfoRepository;
    constructor(spaInfoRepository: Repository<SpaInfo>);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    update(id: number, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions): Promise<SpaInfo[]>;
    standardCount(): Promise<number>;
    findOne(id: number): Promise<SpaInfo>;
    softDelete(id: number): Promise<void>;
}
