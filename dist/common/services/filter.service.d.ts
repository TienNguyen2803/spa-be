export declare class FilterService {
    private readonly operatorMap;
    transformFilterToTypeORM(filter: any): any;
    parseSearchQuery(query: string): any;
    buildFilter(query: any, additionalFilters?: any): any;
    private transformFilter;
}
