import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create_schedule.dto';

@Controller('schedules')
@ApiTags('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    this.schedulesService.store(createScheduleDto);
  }

  @Get()
  getAll(@Body() createScheduleDto: CreateScheduleDto) {
    this.schedulesService.store(createScheduleDto);
  }
}
