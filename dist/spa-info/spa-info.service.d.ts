import { FilterService } from 'src/common/services/filter.service';
import { DataSource, Repository } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
export declare class SpaInfoService {
    private spaInfoRepository;
    private dataSource;
    private filterService;
    constructor(spaInfoRepository: Repository<SpaInfo>, dataSource: DataSource, filterService: FilterService);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    update(id: number, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo>;
    findManyWithPagination(query: any): Promise<SpaInfo[]>;
    standardCount(): Promise<number>;
    findOne(id: number): Promise<SpaInfo>;
    softDelete(id: number): Promise<void>;
}
