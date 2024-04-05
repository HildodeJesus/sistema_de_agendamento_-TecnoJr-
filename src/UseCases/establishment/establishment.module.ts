import { Module } from '@nestjs/common';
import EstablishmentController from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishments } from 'src/entities/establishments.entity';
import { EstablishmentService } from './establishment.service';
import { Categories } from 'src/entities/categories.entity';
import { Address } from 'src/entities/address.entity';
import { Schedules } from 'src/entities/schedules.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Address, Establishments, Schedules]),
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
})
export class EstablishmentModule {}
