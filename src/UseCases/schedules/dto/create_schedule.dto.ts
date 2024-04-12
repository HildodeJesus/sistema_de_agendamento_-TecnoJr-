import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty()
  is_started: Date;

  @ApiProperty()
  is_finished: Date;

  @ApiProperty()
  establishment: string;

  @ApiProperty()
  user: string;
}
