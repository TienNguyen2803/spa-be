
import { ILike } from 'typeorm';

export class FilterBuilder {
  static buildFilter(filterQuery?: string) {
    const findOptions: any = {
      where: {}
    };

    if (filterQuery) {
      try {
        const filters = JSON.parse(filterQuery);
        if (filters.$and) {
          filters.$and.forEach((andCondition: any) => {
            if (andCondition.$or) {
              // Extract searchable fields from the first OR condition
              const searchableFields = Object.keys(andCondition.$or[0]).filter(key => 
                typeof andCondition.$or[0][key] === 'object' && '$contL' in andCondition.$or[0][key]
              );
              
              findOptions.where = searchableFields.map(() => ({}));
              
              andCondition.$or.forEach((condition: any) => {
                searchableFields.forEach((field, index) => {
                  if (condition[field]?.$contL) {
                    findOptions.where[index] = { [field]: ILike(`%${condition[field].$contL}%`) };
                  }
                });
              });
            }
          });
        }
      } catch (error) {
        console.error('Error parsing filter query:', error);
      }
    }

    return findOptions;
  }
}
