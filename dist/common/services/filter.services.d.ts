import { PageOptionsDto } from '../dto/page-options.dto';
import { PageResponse } from '../interfaces/page-reponse.interfaces';
export declare class FilterService {
    parseSortParams(query: PageOptionsDto): {
        [key: string]: 'ASC' | 'DESC';
    };
    transformFilterToTypeORM(query: any): any;
    applyFilter<T>(repository: any, query: PageOptionsDto, additionalFilters?: any, relations?: string[]): Promise<PageResponse<T>>;
}
