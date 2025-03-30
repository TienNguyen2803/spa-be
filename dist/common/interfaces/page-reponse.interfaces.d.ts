export interface PageMetaData {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface PageResponse<T> {
    data: T[];
    meta: PageMetaData;
}
