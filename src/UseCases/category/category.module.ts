import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import CategoryController from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
