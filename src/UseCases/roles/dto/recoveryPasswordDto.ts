import { ApiProperty } from '@nestjs/swagger';

export class RecoveryPasswordDto {
  @ApiProperty()
  email: string;
}
