import { AddressInterface } from '../interfaces/address.interface';
import { CategoryInterface } from '../interfaces/category.interface';

export class CreateEstablishmentDto {
  public name: string;
  public description: string;
  public number_phone: string;
  public image: string;
  public is_open: string;
  public is_close: string;
  public address: AddressInterface;
  public categories: CategoryInterface[];
}
