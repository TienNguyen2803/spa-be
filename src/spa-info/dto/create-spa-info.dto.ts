
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSpaInfoDto {
  @ApiProperty({ example: 'Spa Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Spa Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
