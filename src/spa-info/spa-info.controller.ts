
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { SpaInfo } from './entities/spa-info.entity';
import { StandardPaginationResultType } from '../utils/types/standard-pagination-result.type';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Spa Info')
@Controller({
  path: 'spa-info',
  version: '1',
})
export class SpaInfoController {
  constructor(private readonly spaInfoService: SpaInfoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new spa info' })
  @ApiResponse({ 
    status: HttpStatus.CREATED,
    description: 'Spa info has been successfully created.',
    type: SpaInfo
  })
  create(@Body() createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo> {
    return this.spaInfoService.create(createSpaInfoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all spa info with pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return list of spa info',
    type: [SpaInfo]
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<StandardPaginationResultType<SpaInfo>> {
    if (limit > 50) {
      limit = 50;
    }

    return this.spaInfoService.findAll({ page, limit, offset });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get spa info by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return spa info by id',
    type: SpaInfo
  })
  findOne(@Param('id') id: string) {
    return this.spaInfoService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update spa info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Spa info has been successfully updated.',
    type: SpaInfo
  })
  update(@Param('id') id: string, @Body() updateSpaInfoDto: UpdateSpaInfoDto) {
    return this.spaInfoService.update(+id, updateSpaInfoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete spa info' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Spa info has been successfully deleted.'
  })
  remove(@Param('id') id: string) {
    return this.spaInfoService.remove(+id);
  }
}
