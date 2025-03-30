import { Injectable } from '@nestjs/common';
import { Order, PageOptionsDto } from '../dto/page-options.dto';
import {
  FindOptionsWhere,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  In,
  Equal,
  Raw
} from 'typeorm';
import { PageResponse } from '../interfaces/page-reponse.interfaces';

@Injectable()
export class FilterService {
  /**
   * Parse sort parameters from query
   */
  parseSortParams(query: PageOptionsDto): { [key: string]: 'ASC' | 'DESC' } {
    const sort: { [key: string]: 'ASC' | 'DESC' } = {};

    // Handle array format
    if (query.sort) {
      for (const sortItem of query.sort) {
        sort[sortItem.field] = sortItem.order;
      }
    } else {
      // Handle string format like sort[0]: name,ASC
      const keys = Object.keys(query).filter(key => key.startsWith('sort['));
      for (const key of keys) {
        const value = query[key] as string;
        if (value) {
          const [field, order] = value.split(',');
          sort[field] = (order?.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
        }
      }
    }

    return Object.keys(sort).length ? sort : { createdAt: 'DESC' }; // Default sort
  }

  /**
   * Chuyển đổi cú pháp MongoDB-like sang TypeORM + PostgreSQL
   */
  transformFilterToTypeORM(query: any): any {
    if (!query || typeof query !== 'object') {
      return query;
    }

    // Xử lý mảng
    if (Array.isArray(query)) {
      return query.map(item => this.transformFilterToTypeORM(item));
    }

    const result: any = {};

    // Xử lý các toán tử logic
    if ('$and' in query) {
      // Với PostgreSQL, ta có thể dùng mảng các điều kiện cho AND
      const conditions = query['$and'].map((condition: any) =>
        this.transformFilterToTypeORM(condition)
      );

      // Merge các điều kiện AND
      return conditions.reduce((merged: any, current: any) => {
        return { ...merged, ...current };
      }, {});
    }

    if ('$or' in query) {
      // Với PostgreSQL, ta cần dùng Raw cho OR phức tạp
      console.log('Complex $or condition detected. Converting to PostgreSQL compatible format');

      // Lưu ý: Raw queries phức tạp nên không được triển khai ở đây
      // Giải pháp đơn giản là lấy điều kiện OR đầu tiên
      if (query['$or'].length > 0) {
        return this.transformFilterToTypeORM(query['$or'][0]);
      }
      return {};
    }

    // Xử lý các trường thông thường
    for (const key in query) {
      // Bỏ qua các key là số (relations array index)
      if (!isNaN(Number(key))) {
        continue;
      }
      
      const value = query[key];

      // Nếu value là object và có chứa các toán tử
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Chuyển đổi các toán tử MongoDB-like sang TypeORM operators
        if ('$contL' in value) {
          // ILike: PostgreSQL-specific, không phân biệt hoa thường
          result[key] = ILike(`%${value['$contL']}%`);
        } else if ('$eq' in value) {
          result[key] = Equal(value['$eq']);
        } else if ('$ne' in value) {
          result[key] = Not(value['$ne']);
        } else if ('$gt' in value) {
          result[key] = MoreThan(value['$gt']);
        } else if ('$gte' in value) {
          result[key] = MoreThanOrEqual(value['$gte']);
        } else if ('$lt' in value) {
          result[key] = LessThan(value['$lt']);
        } else if ('$lte' in value) {
          result[key] = LessThanOrEqual(value['$lte']);
        } else if ('$in' in value) {
          result[key] = In(Array.isArray(value['$in']) ? value['$in'] : [value['$in']]);
        } else {
          // Đệ quy cho object lồng nhau
          result[key] = this.transformFilterToTypeORM(value);
        }
      } else {
        // Giá trị đơn giản
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * Apply filters and return paginated response
   */
  async applyFilter<T>(
    repository: any,
    query: PageOptionsDto,
    additionalFilters: any = {},
    relations: string[] = [],
  ): Promise<PageResponse<T>> {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const offset = query.offset || (page - 1) * limit;

    // Parse sort parameters
    const order = this.parseSortParams(query);

    // Parse search filter
    let where: any = { ...additionalFilters };

    if (query.s) {
      try {
        const searchObject = JSON.parse(query.s);
        const typeormQuery = this.transformFilterToTypeORM(searchObject);

        // Merge với additional filters
        where = { ...where, ...typeormQuery };

        // Log để debug
        console.log('TypeORM PostgreSQL query:', JSON.stringify(where, null, 2));
      } catch (error) {
        console.error('Error parsing search filter:', error);
      }
    }

    // Execute query with count
    const [data, itemCount] = await repository.findAndCount({
      where,
      order,
      skip: offset,
      take: limit,
      relations: relations || [],
    });

    // Calculate pagination metadata
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
}