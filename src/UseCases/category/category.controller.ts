import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create_category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export default class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  async create(@Body() categoryDto: CreateCategoryDto) {
    await this.categoryService.store(categoryDto);

    return { type: 'success', message: 'Categoria criada com sucesso!' };
  }

  @Get()
  async getAll() {
    const categories = await this.categoryService.getAll();

    return { categories };
  }

  @Get('establishment/:id')
  async getEstablishmentByCategory(@Param('id') categoryId: string) {
    const categoryWithEstablishment =
      await this.categoryService.getEstablishmenteByCategory(
        Number(categoryId),
      );

    return categoryWithEstablishment;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
