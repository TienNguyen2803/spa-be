
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsEmail } from 'class-validator';

export class CreateSpaInfoDto {
  @ApiProperty({ example: 'Spa Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'http://example.com/logo.png' })
  @IsUrl()
  @IsOptional()
  logo_url?: string;

  @ApiProperty({ example: '123 Spa Street' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'contact@spa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Description of the spa' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'SEO Title' })
  @IsString()
  @IsOptional()
  seo_title?: string;

  @ApiProperty({ example: 'SEO Description' })
  @IsString()
  @IsOptional()
  seo_description?: string;

  @ApiProperty({ example: 'https://facebook.com/spa' })
  @IsUrl()
  @IsOptional()
  facebook_url?: string;

  @ApiProperty({ example: 'https://instagram.com/spa' })
  @IsUrl()
  @IsOptional()
  instagram_url?: string;
}
