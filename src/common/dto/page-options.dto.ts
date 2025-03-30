import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortDto {
  @ApiProperty({ description: 'Field to sort by', example: 'name' })
  @IsString()
  field: string;

  @ApiProperty({
    enum: Order,
    description: 'Sort direction',
    example: Order.ASC
  })
  @IsEnum(Order)
  order: Order;
}

export class PageOptionsDto {
  @ApiPropertyOptional({
    description: 'Advanced search query in JSON format',
    example: '{"$and":[{"q":{"$contL":"3"}}]}'
  })
  @IsOptional()
  @IsString()
  s?: string;

  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    minimum: 1,
    default: 1,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of records to skip',
    minimum: 0,
    default: 0,
    example: 0
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({
    description: 'Number of records per page',
    minimum: 1,
    default: 10,
    example: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sorting criteria',
    example: [{ field: 'name', order: 'ASC' }],
    type: [SortDto]
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sort?: SortDto[];
}