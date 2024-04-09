import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create_category.dto';
import AppDataSource from 'src/config/appDataSource';
import { Categories } from 'src/entities/categories.entity';

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

  async getAll() {
    const categories = await this.categoriesRepository.find();

    return categories;
  }

  async getEstablishmenteByCategory(categoryId: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
      relations: {
        establishments: true,
      },
      select: ['title', 'id'],
    });

    return { category };
  }

  async delete(id: string) {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Categories)
      .where('id = :id', { id: id })
      .execute();

    return;
  }
}
