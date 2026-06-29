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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { createResponseDto } from 'src/common/response.dto';
import { AddWordDto } from './dto/add-word.dto';
import { LessonWordDto } from './dto/lesson-word.dto';

@ApiTags('Lessons')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard('jwt'))
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách bài học' })
  @ApiOkResponse({ type: createResponseDto(CreateLessonDto) })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy bài học theo id' })
  @ApiOkResponse({ type: createResponseDto(CreateLessonDto) })
  findById(@Param('id') id: string) {
    return this.lessonsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo bài học mới' })
  @ApiOkResponse({ type: createResponseDto(CreateLessonDto) })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.createLesson(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật bài học' })
  @ApiOkResponse({ type: createResponseDto(CreateLessonDto) })
  update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.updateLesson(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bài học' })
  delete(@Param('id') id: string) {
    return this.lessonsService.deleteLesson(id);
  }
  @Get(':id/words')
  @ApiOperation({ summary: 'Lấy danh sách từ trong bài học' })
  @ApiOkResponse({ type: createResponseDto(LessonWordDto) })
  getWords(@Param('id') id: string) {
    return this.lessonsService.getWords(id);
  }

  @Post(':id/words')
  @ApiOperation({ summary: 'Thêm từ vào bài học' })
  addWord(@Param('id') id: string, @Body() dto: AddWordDto) {
    return this.lessonsService.addWord(id, dto);
  }

  @Delete(':id/words/:wordId')
  @ApiOperation({ summary: 'Xóa từ khỏi bài học' })
  removeWord(@Param('id') id: string, @Param('wordId') wordId: string) {
    return this.lessonsService.removeWord(id, wordId);
  }
}
