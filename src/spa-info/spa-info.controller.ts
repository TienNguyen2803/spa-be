
import {
  Controller,
  Post,
  Put,
  Get,
  Query,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  DefaultValuePipe,
  ParseIntPipe,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { standardPagination } from '../utils/standard-pagination';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { SpaInfo } from './entities/spa-info.entity';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageResponse } from 'src/common/interfaces/page-reponse.interfaces';

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
  @ApiOperation({ summary: 'Get spa info list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get spa info list',
    type: [SpaInfo],
  })
  @ApiQuery({
    name: 's',
    required: false,
    type: String,
    description: 'Search query in JSON format',
    example: '{"$and":[{"q":{"$contL":"3"}}]}',
  })
  async findAll(@Query() query: PageOptionsDto): Promise<PageResponse<SpaInfo>> {
    return this.spaInfoService.findManyWithPagination(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get spa info by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get spa info by id',
    type: SpaInfo,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.spaInfoService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update spa info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Spa info has been successfully updated',
    type: SpaInfo,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpaInfoDto: UpdateSpaInfoDto,
  ): Promise<SpaInfo> {
    return this.spaInfoService.update(id, updateSpaInfoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete spa info' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Spa info has been successfully deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.spaInfoService.softDelete(id);
  }
}
