import { ApiProperty } from '@nestjs/swagger';

export class EstablishmentsDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  number_phone: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  is_open: string;
  @ApiProperty()
  is_close: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
