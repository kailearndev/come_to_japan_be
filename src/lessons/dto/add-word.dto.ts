import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class WordItemDto {
  @ApiProperty({ example: 'uuid-...' })
  @IsUUID()
  wordId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  orderIndex: number;
}

export class AddWordDto {
  @ApiProperty({ type: [WordItemDto], minItems: 1, maxItems: 10 })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => WordItemDto)
  words: WordItemDto[];
}
