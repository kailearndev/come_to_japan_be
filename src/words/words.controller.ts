import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { createResponseDto } from 'src/common/response.dto';

@ApiTags('Words')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard('jwt'))
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách từ vựng' })
  @ApiOkResponse({ type: createResponseDto(CreateWordDto) })
  findAll() {
    return this.wordsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy từ vựng theo id' })
  @ApiOkResponse({ type: createResponseDto(CreateWordDto) })
  findById(@Param('id') id: string) {
    return this.wordsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Thêm từ vựng mới' })
  @ApiOkResponse({ type: createResponseDto(CreateWordDto) })
  create(@Body() dto: CreateWordDto) {
    return this.wordsService.createWord(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật từ vựng' })
  @ApiOkResponse({ type: createResponseDto(UpdateWordDto) })
  update(@Param('id') id: string, @Body() dto: UpdateWordDto) {
    return this.wordsService.updateWord(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa từ vựng' })
  delete(@Param('id') id: string) {
    return this.wordsService.deleteWord(id);
  }
}
