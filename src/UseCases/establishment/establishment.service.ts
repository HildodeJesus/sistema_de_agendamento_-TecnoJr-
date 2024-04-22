import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Establishments } from 'src/entities/establishments.entity';
import { CreateEstablishmentDto } from './dto/create_establishment.dto';
import { Address } from 'src/entities/address.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { Categories } from 'src/entities/categories.entity';
import { CategoryService } from '../category/category.service';
import { UserService } from '../users/user.service';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishments)
    private establishmentsRepository: Repository<Establishments>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  async store(userId: string, establishment: CreateEstablishmentDto) {
    const address = new Address();
    address.city = establishment.address.city;
    address.state = establishment.address.state;
    address.street = establishment.address.street;
    address.postal_code = establishment.address.postal_code;
    address.neighborhood = establishment.address.neighborhood;
    address.number_of_house = establishment.address.number_of_house;
    address.complement = establishment.address.complement;
    await this.addressRepository.save(address);

    const categories = [];
    for (let i = 0; i < establishment.categories.length; i++) {
      if (establishment.categories[i].id)
        categories.push(establishment.categories[i].id);
      else {
        const category = new Categories();
        category.title = establishment.categories[i].title;
        await this.categoryService.store(category);
        categories.push(category);
      }
    }

    await this.establishmentsRepository.save([
      {
        ...establishment,
        address: address,
        categories: categories,
        user: { id: userId },
      },
    ]);

    await this.userService.update({id: userId, role: "owner"});

    return;
  }

  async getAll(pageOptionsDto: PageOptionsDto) {
    const queryBuilder =
      this.establishmentsRepository.createQueryBuilder('establishments');

    queryBuilder
      .orderBy('establishments.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getById(id: string) {
    const queryBuilder =
      this.establishmentsRepository.createQueryBuilder('establishment');

    queryBuilder
      .leftJoinAndSelect('establishment.address', 'address')
      .leftJoinAndSelect('establishment.categories', 'categories')
      .where('establishment.id = :id', { id: id });

    const establishment = await queryBuilder.getOne();

    return establishment;
  }

  async getEstablishmentByCategory(
    categoryId: number,
    pageOptionsDto: PageOptionsDto,
  ) {
    const queryBuilder =
      this.establishmentsRepository.createQueryBuilder('establishments');

    queryBuilder
      .leftJoin('establishments.categories', 'category')
      .where('category.id = :categoryId', { categoryId })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('establishments.created_at', pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async update(id: string, establishment: Partial<CreateEstablishmentDto>) {
    await this.establishmentsRepository
      .createQueryBuilder('establishments')
      .update()
      .set(establishment)
      .where('establishments.id = :id', { id: id })
      .execute();

    return;
  }

  async delete(id: string) {
    await this.establishmentsRepository
      .createQueryBuilder('establishments')
      .delete()
      .where('establishments.id = :id', { id: id })
      .execute();

    return;
  }
}
