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
    constructor() {
        this.operatorMap = {
            $eq: (value) => value,
            $ne: (value) => (0, typeorm_1.Not)(value),
            $lt: (value) => (0, typeorm_1.LessThan)(value),
            $gt: (value) => (0, typeorm_1.MoreThan)(value),
            $lte: (value) => (0, typeorm_1.LessThanOrEqual)(value),
            $gte: (value) => (0, typeorm_1.MoreThanOrEqual)(value),
            $in: (value) => (0, typeorm_1.In)(value),
            $null: (value) => (0, typeorm_1.IsNull)(),
            $cont: (value) => (0, typeorm_1.Like)(`%${value}%`),
            $contL: (value) => (0, typeorm_1.ILike)(`%${value}%`),
            $start: (value) => (0, typeorm_1.Like)(`${value}%`),
            $end: (value) => (0, typeorm_1.Like)(`%${value}`),
        };
    }
    transformFilterToTypeORM(filter) {
        if (!filter)
            return {};
        if (Array.isArray(filter)) {
            return filter.map(item => this.transformFilterToTypeORM(item));
        }
        if (typeof filter === 'object') {
            const result = {};
            for (const [key, value] of Object.entries(filter)) {
                if (key === '$and') {
                    result.$and = this.transformFilterToTypeORM(value);
                }
                else if (key === '$or') {
                    result.$or = this.transformFilterToTypeORM(value);
                }
                else if (this.operatorMap[key]) {
                    return this.operatorMap[key](value);
                }
                else if (typeof value === 'object') {
                    result[key] = this.transformFilterToTypeORM(value);
                }
                else {
                    result[key] = value;
                }
            }
            return result;
        }
        return filter;
    }
    parseSearchQuery(query) {
        try {
            return JSON.parse(query);
        }
        catch (error) {
            return {};
        }
    }
    buildFilter(query, additionalFilters = {}) {
        let where = Object.assign({}, additionalFilters);
        if (query.s) {
            try {
                const searchObject = this.parseSearchQuery(query.s);
                const typeormQuery = this.transformFilterToTypeORM(searchObject);
                where = Object.assign(Object.assign({}, where), typeormQuery);
            }
            catch (error) {
                console.error('Error parsing search filter:', error);
            }
        }
        return where;
    }
};
exports.FilterService = FilterService = __decorate([
    (0, common_1.Injectable)()
], FilterService);
//# sourceMappingURL=filter.service.js.map