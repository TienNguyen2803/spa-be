
import { ILike } from 'typeorm';

export class FilterBuilder {
  static buildFilter(filterQuery?: string, searchableFields: string[] = []) {
    const findOptions: any = {
      where: {}
    };

    if (filterQuery) {
      try {
        const filters = JSON.parse(filterQuery);
        if (filters.$and) {
          filters.$and.forEach((andCondition: any) => {
            if (andCondition.$or) {
              findOptions.where = searchableFields.map(() => ({})); // Create array for OR conditions
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
