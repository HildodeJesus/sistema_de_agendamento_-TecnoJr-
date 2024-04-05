import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishments } from 'src/entities/establishments.entity';
import { Repository } from 'typeorm';
import { CreateEstablishmentDto } from './dto/create_establishment.dto';
import appDataSource from 'src/config/appDataSource';
import { Address } from 'src/entities/address.entity';
import { Categories } from 'src/entities/categories.entity';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishments)
    private establishmentsRepository: Repository<Establishments>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async store(establishment: CreateEstablishmentDto) {
    const address = new Address();
    address.city = establishment.address.city;
    address.state = establishment.address.state;
    address.street = establishment.address.street;
    address.postal_code = establishment.address.postal_code;
    address.neighborhood = establishment.address.neighborhood;
    address.number_of_house = establishment.address.number_of_house;
    address.complement = establishment.address.complement;
    await this.addressRepository.save(address);

    const newEstablishment = new Establishments();

    newEstablishment.name = establishment.name;
    newEstablishment.description = establishment.description;
    newEstablishment.is_open = establishment.is_open;
    newEstablishment.is_close = establishment.is_close;
    newEstablishment.number_phone = establishment.number_phone;
    newEstablishment.image = establishment.image;
    newEstablishment.address = address;
    newEstablishment.categories = establishment.categories as Categories[];
    await this.establishmentsRepository.save(newEstablishment);

    return;
  }

  async getAll(): Promise<Establishments[]> {
    const establishments = await this.establishmentsRepository.find({});

    return establishments;
  }

  async getById(id: string): Promise<Establishments> {
    const establishment = await this.establishmentsRepository.findOne({
      where: { id: id },
      relations: {
        address: true,
        categories: true,
      },
    });

    return establishment;
  }

  async update(id: string, establishment: CreateEstablishmentDto) {
    await appDataSource
      .createQueryBuilder()
      .update(Establishments)
      .set(establishment)
      .where('id = :id', { id: id })
      .execute();

    return;
  }

  async delete(id: string) {
    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Establishments)
      .where('id = :id', { id: id })
      .execute();

    return;
  }
}
