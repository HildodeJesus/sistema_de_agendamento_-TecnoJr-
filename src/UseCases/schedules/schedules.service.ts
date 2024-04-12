import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/schedules.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create_schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async store(createScheduleDto: CreateScheduleDto) {
    const user = { id: createScheduleDto.user };
    const establishment = { id: createScheduleDto.establishment };

    await this.schedulesRepository.save({
      ...createScheduleDto,
      user,
      establishment,
    });

    return;
  }
}
