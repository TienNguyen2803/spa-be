
import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { standardPagination } from '../utils/standard-pagination';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { SpaInfo } from './entities/spa-info.entity';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Spa Info')
@Controller({
  path: 'spa-info',
  version: '1',
})
export class SpaInfoController {
  constructor(private readonly spaInfoService: SpaInfoService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new spa info' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Spa info has been successfully created.',
    type: SpaInfo,
  })
  create(@Body() createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo> {
    return this.spaInfoService.create(createSpaInfoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all spa info with pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get spa info list',
    type: [SpaInfo],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return standardPagination(
      await this.spaInfoService.findManyWithPagination({
        page,
        limit,
        offset: (page - 1) * limit,
      }),
      await this.spaInfoService.standardCount(),
    );
  }
}
