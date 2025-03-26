import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
export declare class SpaInfoController {
    private readonly spaInfoService;
    constructor(spaInfoService: SpaInfoService);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    findAll(page: number, limit: number): Promise<Readonly<{
        data: SpaInfo[];
        total: number;
    }>>;
    findOne(id: number): Promise<SpaInfo>;
    remove(id: number): Promise<void>;
}
