import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageResponse } from 'src/common/interfaces/page-reponse.interfaces';
export declare class SpaInfoController {
    private readonly spaInfoService;
    constructor(spaInfoService: SpaInfoService);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    findAll(query: PageOptionsDto): Promise<PageResponse<SpaInfo>>;
    findOne(id: number): Promise<SpaInfo>;
    update(id: number, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo>;
    remove(id: number): Promise<void>;
}
