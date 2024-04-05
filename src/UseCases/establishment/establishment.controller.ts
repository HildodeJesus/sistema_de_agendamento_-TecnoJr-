import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create_establishment.dto';
import { EstablishmentService } from './establishment.service';

@Controller('establishments')
export default class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}
  @Post()
  async create(@Body() establishmentDto: CreateEstablishmentDto) {
    await this.establishmentService.store(establishmentDto);

    return { type: 'success', message: 'Loja criada com sucesso!' };
  }

  @Get()
  async getAll() {
    const establishments = await this.establishmentService.getAll();
    return { establishments };
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const establishment = await this.establishmentService.getById(id);

    return { establishment };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() establishmentDto: CreateEstablishmentDto,
  ) {
    await this.establishmentService.update(id, establishmentDto);

    return { type: 'success', message: 'Loja atualizada com sucesso!' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.establishmentService.delete(id);

    return { type: 'success', message: 'Loja deletada com sucesso!' };
  }
}
