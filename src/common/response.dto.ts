import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export class BaseResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  data: T | null;
}

export function createResponseDto<T>(classRef: Type<T>) {
  class ResponseDtoHost extends BaseResponseDto<T> {
    @ApiProperty({ type: () => classRef })
    declare data: T;
  }
  return ResponseDtoHost;
}
