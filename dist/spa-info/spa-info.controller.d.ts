import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
import { StandardPaginationResultType } from '../utils/types/standard-pagination-result.type';
export declare class SpaInfoController {
    private readonly spaInfoService;
    constructor(spaInfoService: SpaInfoService);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    findAll(page: number, limit: number, offset: number): Promise<StandardPaginationResultType<SpaInfo>>;
    findOne(id: string): Promise<import("../utils/types/nullable.type").NullableType<SpaInfo>>;
    update(id: string, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo>;
    remove(id: string): any;
}
