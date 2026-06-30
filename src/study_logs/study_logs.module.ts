import { Module } from '@nestjs/common';
import { StudyLogsService } from './study_logs.service';
import { StudyLogsController } from './study_logs.controller';

@Module({
  controllers: [StudyLogsController],
  providers: [StudyLogsService],
})
export class StudyLogsModule {}
