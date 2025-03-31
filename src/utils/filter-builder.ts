
import { ILike } from 'typeorm';

export class FilterBuilder {
  static buildFilter(filterQuery?: string, sort?: string) {
    const findOptions: any = {
      where: {},
      order: {}
    };

    // Xử lý sort
    if (sort) {
      const [field, direction] = sort.split(',');
      findOptions.order[field] = direction.toUpperCase();
    } else {
      findOptions.order['id'] = 'DESC';
    }

    // Xử lý filter
    if (!filterQuery) {
      return findOptions;
    }

    try {
      // Nếu là chuỗi tìm kiếm đơn giản 
      if (!filterQuery.startsWith('{')) {
        findOptions.where = [{
          name: ILike(`%${filterQuery}%`)
        }, {
          address: ILike(`%${filterQuery}%`) 
        }, {
          email: ILike(`%${filterQuery}%`)
        }];
        return findOptions;
      }

      // Nếu là JSON filter phức tạp
      const filters = JSON.parse(filterQuery);
      
      if (filters.$and) {
        filters.$and.forEach((andCondition: any) => {
          if (andCondition.$or) {
            const searchFields = Object.keys(andCondition.$or[0]).filter(key => 
              typeof andCondition.$or[0][key] === 'object' && '$contL' in andCondition.$or[0][key]
            );
            
            findOptions.where = searchFields.map(field => {
              const orConditions = andCondition.$or.map((condition: any) => {
                if (condition[field]?.$contL) {
                  return { [field]: ILike(`%${condition[field].$contL}%`) };
                }
                return {};
              });
              return orConditions;
            }).flat();
          }
        });
      }
    } catch (error) {
      console.error('Error parsing filter query:', error);
    }

    return findOptions;
  }
}
