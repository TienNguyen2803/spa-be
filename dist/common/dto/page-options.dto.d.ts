export declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SortDto {
    field: string;
    order: Order;
}
export declare class PageOptionsDto {
    s?: string;
    page?: number;
    offset?: number;
    limit?: number;
    sort?: SortDto[];
}
