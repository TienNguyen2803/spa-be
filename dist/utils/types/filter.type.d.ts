export interface FilterOperator {
    $eq?: any;
    $ne?: any;
    $gt?: any;
    $lt?: any;
    $gte?: any;
    $lte?: any;
    $contL?: any;
    $contR?: any;
    $cont?: any;
    $in?: any[];
    $btw?: [any, any];
}
export interface FilterCondition {
    [key: string]: FilterOperator | {
        $or: FilterCondition[];
    } | {
        $and: FilterCondition[];
    };
}
