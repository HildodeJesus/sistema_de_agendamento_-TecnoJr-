import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/schedules.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedules])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
