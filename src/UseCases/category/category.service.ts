import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create_category.dto';
import AppDataSource from 'src/config/appDataSource';
import { Categories } from 'src/entities/categories.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async store(category: CreateCategoryDto) {
    await this.categoriesRepository.save(category);

    return;
  }

  async getAll(pageOptionsDto: PageOptionsDto) {
    const queryBuilder =
      this.categoriesRepository.createQueryBuilder('categories');

    queryBuilder
      .orderBy('categories.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async delete(id: string) {
    const queryBuilder =
      this.categoriesRepository.createQueryBuilder('category');

    queryBuilder.delete().where('category.id = :id', { id: id }).execute();

    return;
  }
}
