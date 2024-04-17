import { ApiProperty } from '@nestjs/swagger';

export class RescheduleDto {
  @ApiProperty()
  is_started: Date;

  @ApiProperty()
  is_finished: Date;
}
