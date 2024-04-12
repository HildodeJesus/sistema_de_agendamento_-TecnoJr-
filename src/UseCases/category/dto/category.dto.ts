import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
