import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class StudyLogDto {
  @ApiProperty({ example: 'uuid-...' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'uuid-...' })
  @IsUUID()
  lessionId: string;
}
