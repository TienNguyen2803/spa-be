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

    if (filter.$and) {
      const andConditions = filter.$and.map((condition: any) => this.transformFilter(condition));
      return { where: andConditions };
    }

    if (filter.$or) {
      const orConditions = filter.$or.map((condition: any) => this.transformFilter(condition));
      return { where: orConditions };
    }

    const result: any = {};

    for (const [field, conditions] of Object.entries(filter)) {
      if (typeof conditions === 'object') {
        for (const [operator, value] of Object.entries(conditions as any)) {
          switch (operator) {
            case '$contL':
              result[field] = ILike(`%${value}%`);
              break;
            case '$eq':
              result[field] = value;
              break;
            case '$ne':
              result[field] = Not(value);
              break;
            case '$gt':
              result[field] = MoreThan(value);
              break;
            case '$gte':
              result[field] = MoreThanOrEqual(value);
              break;
            case '$lt':
              result[field] = LessThan(value);
              break;
            case '$lte':
              result[field] = LessThanOrEqual(value);
              break;
          }
        }
      } else {
        result[field] = conditions;
      }
    }

    return result;
  }
}