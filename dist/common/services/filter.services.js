"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let FilterService = exports.FilterService = class FilterService {
    parseSortParams(query) {
        const sort = {};
        if (query.sort) {
            for (const sortItem of query.sort) {
                sort[sortItem.field] = sortItem.order;
            }
        }
        else {
            const keys = Object.keys(query).filter(key => key.startsWith('sort['));
            for (const key of keys) {
                const value = query[key];
                if (value) {
                    const [field, order] = value.split(',');
                    sort[field] = ((order === null || order === void 0 ? void 0 : order.toUpperCase()) === 'DESC') ? 'DESC' : 'ASC';
                }
            }
        }
        return Object.keys(sort).length ? sort : { createdAt: 'DESC' };
    }
    transformFilterToTypeORM(query) {
        if (!query || typeof query !== 'object') {
            return query;
        }
        if (Array.isArray(query)) {
            return query.map(item => this.transformFilterToTypeORM(item));
        }
        const result = {};
        if ('$and' in query) {
            const conditions = query['$and'].map((condition) => this.transformFilterToTypeORM(condition));
            return conditions.reduce((merged, current) => {
                return Object.assign(Object.assign({}, merged), current);
            }, {});
        }
        if ('$or' in query) {
            console.log('Complex $or condition detected. Converting to PostgreSQL compatible format');
            if (query['$or'].length > 0) {
                return this.transformFilterToTypeORM(query['$or'][0]);
            }
            return {};
        }
        for (const key in query) {
            const value = query[key];
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if ('$contL' in value) {
                    result[key] = (0, typeorm_1.ILike)(`%${value['$contL']}%`);
                }
                else if ('$eq' in value) {
                    result[key] = (0, typeorm_1.Equal)(value['$eq']);
                }
                else if ('$ne' in value) {
                    result[key] = (0, typeorm_1.Not)(value['$ne']);
                }
                else if ('$gt' in value) {
                    result[key] = (0, typeorm_1.MoreThan)(value['$gt']);
                }
                else if ('$gte' in value) {
                    result[key] = (0, typeorm_1.MoreThanOrEqual)(value['$gte']);
                }
                else if ('$lt' in value) {
                    result[key] = (0, typeorm_1.LessThan)(value['$lt']);
                }
                else if ('$lte' in value) {
                    result[key] = (0, typeorm_1.LessThanOrEqual)(value['$lte']);
                }
                else if ('$in' in value) {
                    result[key] = (0, typeorm_1.In)(Array.isArray(value['$in']) ? value['$in'] : [value['$in']]);
                }
                else {
                    result[key] = this.transformFilterToTypeORM(value);
                }
            }
            else {
                result[key] = value;
            }
        }
        return result;
    }
    async applyFilter(repository, query, additionalFilters = {}, relations = []) {
        const limit = query.limit || 10;
        const page = query.page || 1;
        const offset = query.offset || (page - 1) * limit;
        const order = this.parseSortParams(query);
        let where = additionalFilters;
        if (query.s) {
            try {
                const searchObject = JSON.parse(query.s);
                const typeormQuery = this.transformFilterToTypeORM(searchObject);
                where = Object.assign(Object.assign({}, typeormQuery), additionalFilters);
                console.log('TypeORM PostgreSQL query:', JSON.stringify(where, null, 2));
            }
            catch (error) {
                console.error('Error parsing search filter:', error);
                where = additionalFilters;
            }
        }
        const [data, itemCount] = await repository.findAndCount({
            where,
            order,
            skip: offset,
            take: limit,
            relations,
        });
        const pageCount = Math.ceil(itemCount / limit);
        return {
            data,
            meta: {
                page,
                limit,
                itemCount,
                pageCount,
                hasPreviousPage: page > 1,
                hasNextPage: page < pageCount,
            },
        };
    }
};
exports.FilterService = FilterService = __decorate([
    (0, common_1.Injectable)()
], FilterService);
//# sourceMappingURL=filter.services.js.map