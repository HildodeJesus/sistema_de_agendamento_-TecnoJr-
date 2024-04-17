import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create_category.dto';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto.dto';
import { ApiPaginedResponse } from 'src/decorators/apiPaginatedResponse';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
@ApiTags('categories')
export default class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() categoryDto: CreateCategoryDto) {
    await this.categoryService.store(categoryDto);

    return { type: 'success', message: 'Categoria criada com sucesso!' };
  }

  @Get()
  @ApiPaginedResponse(CategoryDto)
  async getAll(@Query() pageOpitonsDto: PageOptionsDto) {
    const categories = await this.categoryService.getAll(pageOpitonsDto);

    return { categories };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
