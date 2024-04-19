import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create_schedule.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto.dto';
import { RescheduleDto } from './dto/reschedule.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.metadata';

@Controller('schedules')
@ApiTags('Schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const existSchedule = await this.schedulesService.validateHours(
      createScheduleDto.is_started,
      createScheduleDto.is_finished,
    );

    if (existSchedule.length > 0)
      throw new BadRequestException(
        'Já existe um horário marcado nesse intervalo',
      );

    await this.schedulesService.store(createScheduleDto);

    return { type: 'success', message: 'Horário agendado com sucesso!' };
  }

  @Roles('owner')
  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  async getAll(@Query() pageOptionsDto: PageOptionsDto) {
    const schedules = await this.schedulesService.getAll(pageOptionsDto);

    return { schedules };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOne(@Param('id') id: string) {
    const schedule = await this.schedulesService.getOne(id);

    return { schedule };
  }

  @Put(':id/reagendar')
  @UseGuards(AuthGuard)
  async reschedule(
    @Param('id') id: string,
    @Body() rescheduleDto: RescheduleDto,
  ) {
    await this.schedulesService.update(id, rescheduleDto);

    return { type: 'success', message: 'Schedule reagendada!' };
  }

  @Delete(':id/cancelar')
  @UseGuards(AuthGuard)
  async cancelSchedule(@Param('id') id: string) {
    await this.schedulesService.delete(id);

    return { type: 'success', message: 'Schedule cancelada com sucesso!' };
  }
}
