import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
import { NullableType } from '../utils/types/nullable.type';
import { StandardPaginationResultType } from 'src/utils/types/standard-pagination-result.type';
export declare class SpaInfoService {
    private spaInfoRepository;
    constructor(spaInfoRepository: Repository<SpaInfo>);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    findManyWithPagination(paginationOptions: IPaginationOptions): Promise<StandardPaginationResultType<SpaInfo>>;
    standardCount(): Promise<number>;
    findOne(fields: EntityCondition<SpaInfo>): Promise<NullableType<SpaInfo>>;
    update(id: SpaInfo['id'], payload: DeepPartial<SpaInfo>): Promise<SpaInfo>;
    softDelete(id: SpaInfo['id']): Promise<void>;
}
