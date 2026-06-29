import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'Bài 1 - Chào hỏi' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'わたしはたなかです。...' })
  @IsString()
  passage: string;

  @ApiProperty({ example: '〜です・〜ます' })
  @IsString()
  grammarPoint: string;

  @ApiProperty({ example: 'Dùng để nói lịch sự trong tiếng Nhật' })
  @IsString()
  grammarExplain: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  orderIndex: number;
}
