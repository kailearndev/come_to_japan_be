import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LessonWordDto {
  @ApiProperty({ example: 'uuid-...' })
  wordId: string;

  @ApiPropertyOptional({ example: '食べる' })
  kanji: string | null;

  @ApiProperty({ example: 'たべる' })
  hiragana: string;

  @ApiProperty({ example: 'ăn' })
  meaning: string;

  @ApiPropertyOptional({ example: 'N5' })
  jlptLevel: string | null;

  @ApiProperty({ example: 1 })
  orderIndex: number;
}
