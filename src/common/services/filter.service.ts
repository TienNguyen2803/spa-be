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
    if (!query || !query.s) return additionalFilters;

    try {
      const searchCriteria = typeof query.s === 'string' ? JSON.parse(query.s) : query.s;
      if (searchCriteria.$and) {
        const conditions = searchCriteria.$and.map((condition: any) => {
          const [field, fieldConditions] = Object.entries(condition)[0];
          if (fieldConditions.$contL) {
            return { [field]: ILike(`%${fieldConditions.$contL}%`) };
          }
          return condition;
        });
        return conditions.length === 1 ? conditions[0] : { $and: conditions };
      }
      return searchCriteria;
    } catch (error) {
      console.error('Error parsing search criteria:', error);
      return additionalFilters;
    }
  }
}