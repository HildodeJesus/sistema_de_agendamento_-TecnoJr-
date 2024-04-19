import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/schedules.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create_schedule.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

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

  async getAll(pageOptionsDto: PageOptionsDto) {
    const queryBuilder =
      this.schedulesRepository.createQueryBuilder('schedules');

    queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy(pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getOne(id: string) {
    const queryBuilder =
      this.schedulesRepository.createQueryBuilder('schedules');

    queryBuilder
      .leftJoinAndSelect('schedules.user', 'user')
      .leftJoinAndSelect('schedules.establishment', 'establishment')
      .where('schedule.id = :id', { id });

    const schedule = await queryBuilder.getOne();

    return schedule;
  }

  async update(id: string, partialSchedule: Partial<Schedules>) {
    const queryBuilder =
      this.schedulesRepository.createQueryBuilder('schedules');

    await queryBuilder
      .update()
      .set(partialSchedule)
      .where('schedule.id = :id', { id })
      .execute();

    return;
  }

  async delete(id: string) {
    const queryBuilder =
      this.schedulesRepository.createQueryBuilder('schedules');

    await queryBuilder.delete().where('schedule.id = :id', { id }).execute();

    return;
  }

  async validateHours(isStarted: Date, isFinished: Date): Promise<Schedules[]> {
    const queryBuilder =
      this.schedulesRepository.createQueryBuilder('schedules');

    queryBuilder
      .where('schedule.is_started >= :isStarted', { isStarted })
      .andWhere('schedule.is_finished <= :isFinished', { isFinished });

    const schedules = await queryBuilder.getMany();

    return schedules;
  }
}
