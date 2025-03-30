import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageResponse } from 'src/common/interfaces/page-reponse.interfaces';
import { FilterService } from 'src/common/services/filter.services';
import { DataSource, Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
export declare class SpaInfoService {
    private spaInfoRepository;
    private readonly filterService;
    private dataSource;
    constructor(spaInfoRepository: Repository<SpaInfo>, filterService: FilterService, dataSource: DataSource);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    update(id: number, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo>;
    findManyWithPagination(query: PageOptionsDto): Promise<PageResponse<SpaInfo>>;
    standardCount(): Promise<number>;
    findOne(id: number): Promise<SpaInfo>;
    softDelete(id: number): Promise<void>;
}
