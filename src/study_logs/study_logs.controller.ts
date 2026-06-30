import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudyLogsService } from './study_logs.service';
import { CreateStudyLogDto } from './dto/create-study-log.dto';
import {
  CurrentUser,
  type JwtUser,
} from 'src/common/decorators/current-user.decorator';

@ApiTags('Study Logs')
@ApiCookieAuth('access_token')
@Controller('study-logs')
export class StudyLogsController {
  constructor(private readonly studyLogsService: StudyLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Ghi lại hoàn thành bài học' })
  create(@Body() dto: CreateStudyLogDto, @CurrentUser() user: JwtUser) {
    return this.studyLogsService.createStudyLog(user.id, dto.lessonId);
  }

  @Get('me')
  @ApiOperation({ summary: 'Lịch sử học của tôi' })
  getMyLogs(@CurrentUser() user: JwtUser) {
    return this.studyLogsService.getStudyLogsByUserId(user.id);
  }
}
