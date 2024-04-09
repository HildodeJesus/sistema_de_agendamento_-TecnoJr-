import { ApiProperty } from '@nestjs/swagger';

export class validateUserDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  code: string;
}
