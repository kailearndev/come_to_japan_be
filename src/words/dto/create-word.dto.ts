import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateWordDto {
  @ApiPropertyOptional({ example: '食べる' })
  @IsOptional()
  @IsString()
  kanji?: string;

  @ApiProperty({ example: 'たべる' })
  @IsString()
  hiragana: string;

  @ApiProperty({ example: 'ăn' })
  @IsString()
  meaning: string;

  @ApiPropertyOptional({ example: 'N5', enum: ['N1', 'N2', 'N3', 'N4', 'N5'] })
  @IsOptional()
  @IsIn(['N1', 'N2', 'N3', 'N4', 'N5'])
  jlptLevel?: string;
}
