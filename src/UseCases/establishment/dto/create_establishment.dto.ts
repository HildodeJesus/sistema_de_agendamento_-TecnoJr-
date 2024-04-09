import { ApiProperty } from '@nestjs/swagger';
import { AddressInterface } from '../interfaces/address.interface';
import { CategoryInterface } from '../interfaces/category.interface';

export class CreateEstablishmentDto {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public number_phone: string;
  @ApiProperty()
  public image: string;
  @ApiProperty()
  public is_open: string;
  @ApiProperty()
  public is_close: string;
  @ApiProperty()
  public address: AddressInterface;
  @ApiProperty()
  public categories: CategoryInterface[];
}
