import { Test, TestingModule } from '@nestjs/testing';
import { StudyLogsController } from './study_logs.controller';
import { StudyLogsService } from './study_logs.service';

describe('StudyLogsController', () => {
  let controller: StudyLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyLogsController],
      providers: [StudyLogsService],
    }).compile();

    controller = module.get<StudyLogsController>(StudyLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
