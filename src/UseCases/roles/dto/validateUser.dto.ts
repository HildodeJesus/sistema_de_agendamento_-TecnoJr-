import { ApiProperty } from '@nestjs/swagger';

export class ValidateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  code: string;
}
