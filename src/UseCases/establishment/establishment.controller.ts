import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEstablishmentDto } from './dto/create_establishment.dto';
import { EstablishmentService } from './establishment.service';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto.dto';
import { ApiPaginedResponse } from 'src/decorators/apiPaginatedResponse';
import { EstablishmentsDto } from './dto/establishment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('establishments')
@ApiTags('Establishments')
@UseInterceptors(ClassSerializerInterceptor)
export default class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req, @Body() establishmentDto: CreateEstablishmentDto) {
    await this.establishmentService.store(req.user.id, establishmentDto);

    return { type: 'success', message: 'Loja criada com sucesso!' };
  }

  @Get()
  @ApiPaginedResponse(EstablishmentsDto)
  async getAll(@Query() pageOptionsDto: PageOptionsDto) {
    const establishments =
      await this.establishmentService.getAll(pageOptionsDto);
    return { establishments };
  }

  @Get('category/:categoryId')
  @ApiPaginedResponse(EstablishmentsDto)
  async getEstablishmentByCategory(
    @Param('categoryId') categoryId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const establishments =
      await this.establishmentService.getEstablishmentByCategory(
        Number(categoryId),
        pageOptionsDto,
      );

    return { establishments };
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const establishment = await this.establishmentService.getById(id);

    return { establishment };
  }

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard(['owner']))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() establishmentDto: CreateEstablishmentDto,
  ) {
    await this.establishmentService.update(id, establishmentDto);

    return { type: 'success', message: 'Loja atualizada com sucesso!' };
  }

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard(['owner']))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.establishmentService.delete(id);

    return { type: 'success', message: 'Loja deletada com sucesso!' };
  }
}
