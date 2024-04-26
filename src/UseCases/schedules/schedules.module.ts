import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/schedules.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedules]), AuthModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
