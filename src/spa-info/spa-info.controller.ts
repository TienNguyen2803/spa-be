
import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
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
}
