import { Injectable } from '@nestjs/common';
import { Like, Not, LessThan, MoreThan, LessThanOrEqual, MoreThanOrEqual, In, IsNull, ILike } from 'typeorm';

@Injectable()
export class FilterService {
  private readonly operatorMap = {
    $eq: (value: any) => value,
    $ne: (value: any) => Not(value),
    $lt: (value: any) => LessThan(value),
    $gt: (value: any) => MoreThan(value),
    $lte: (value: any) => LessThanOrEqual(value),
    $gte: (value: any) => MoreThanOrEqual(value),
    $in: (value: any) => In(value),
    $null: (value: any) => IsNull(),
    $cont: (value: string) => Like(`%${value}%`),
    $contL: (value: string) => ILike(`%${value}%`),
    $start: (value: string) => Like(`${value}%`),
    $end: (value: string) => Like(`%${value}`),
  };

  transformFilterToTypeORM(filter: any): any {
    if (!filter) return {};

    if (Array.isArray(filter)) {
      return filter.map(item => this.transformFilterToTypeORM(item));
    }

    if (typeof filter === 'object') {
      const result: any = {};

      for (const [key, value] of Object.entries(filter)) {
        if (key === '$and') {
          result.$and = this.transformFilterToTypeORM(value);
        } else if (key === '$or') {
          result.$or = this.transformFilterToTypeORM(value);
        } else if (this.operatorMap[key]) {
          return this.operatorMap[key](value);
        } else if (typeof value === 'object') {
          result[key] = this.transformFilterToTypeORM(value);
        } else {
          result[key] = value;
        }
      }

      return result;
    }

    return filter;
  }

  parseSearchQuery(query: string): any {
    try {
      return JSON.parse(query);
    } catch (error) {
      return {};
    }
  }

  buildFilter(query: any, additionalFilters: any = {}) {
    if (!query) return {};
    if (!query.s) return {};

    try {
      const searchCriteria = typeof query.s === 'string' ? JSON.parse(query.s) : query.s;
      return this.transformFilter(searchCriteria);
    } catch (error) {
      console.error('Error parsing search criteria:', error);
      return {};
    }
  }

  private transformFilter(filter: any): any {
    if (!filter) return {};

    // Handle AND operator
    if (filter.$and) {
      return {
        $and: filter.$and.map((condition: any) => this.transformFilter(condition))
      };
    }

    // Handle OR operator  
    if (filter.$or) {
      return {
        $or: filter.$or.map((condition: any) => this.transformFilter(condition))
      };
    }

    const transformedFilter: any = {};

    // Handle field conditions
    for (const [field, conditions] of Object.entries(filter)) {
      if (typeof conditions === 'object') {
        const fieldFilters: any = {};

        for (const [operator, value] of Object.entries(conditions as any)) {
          switch (operator) {
            case '$contL':
              fieldFilters.ilike = `%${value}%`;
              break;
            case '$eq':
              fieldFilters.equals = value;
              break;
            case '$ne':
              fieldFilters.not = value;
              break;
            case '$gt':
              fieldFilters.gt = value;
              break;
            case '$gte':
              fieldFilters.gte = value;
              break;
            case '$lt':
              fieldFilters.lt = value;
              break;
            case '$lte':
              fieldFilters.lte = value;
              break;
          }
        }

        transformedFilter[field] = fieldFilters;
      } else {
        transformedFilter[field] = conditions;
      }
    }

    return transformedFilter;
  }
}