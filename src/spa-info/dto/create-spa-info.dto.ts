
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSpaInfoDto {
  @ApiProperty({ example: 'Spa Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'logo.jpg' })
  @IsNotEmpty()
  @IsString()
  logo_url: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'spa@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'Luxury spa services' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Best Spa Services' })
  @IsString()
  seo_title: string;

  @ApiProperty({ example: 'Luxury spa treatments and services' })
  @IsString()
  seo_description: string;

  @ApiProperty({ example: 'https://facebook.com/spa' })
  @IsOptional()
  @IsString()
  facebook_url: string;

  @ApiProperty({ example: 'https://instagram.com/spa' })
  @IsOptional()
  @IsString()
  instagram_url: string;
}
