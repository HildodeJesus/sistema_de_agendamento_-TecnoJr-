import { Module } from '@nestjs/common';
import EstablishmentController from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishments } from 'src/entities/establishments.entity';
import { EstablishmentService } from './establishment.service';
import { Categories } from 'src/entities/categories.entity';
import { Address } from 'src/entities/address.entity';
import { Schedules } from 'src/entities/schedules.entity';
import { CategoryService } from '../category/category.service';
import { UserService } from 'src/UseCases/users/user.service';
import { Users } from 'src/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { Roles } from 'src/entities/roles.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Categories,
      Address,
      Establishments,
      Schedules,
      Users,
      Roles,
    ]),
    AuthModule,
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService, CategoryService, UserService],
})
export class EstablishmentModule {}
