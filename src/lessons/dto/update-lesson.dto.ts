import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateLessonDto {
  @ApiPropertyOptional({ example: 'Bài 1 - Chào hỏi' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'わたしはたなかです。...' })
  @IsOptional()
  @IsString()
  passage?: string;

  @ApiPropertyOptional({ example: '〜です・〜ます' })
  @IsOptional()
  @IsString()
  grammarPoint?: string;

  @ApiPropertyOptional({ example: 'Dùng để nói lịch sự trong tiếng Nhật' })
  @IsOptional()
  @IsString()
  grammarExplain?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  orderIndex?: number;
}
