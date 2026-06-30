import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as schema from 'src/drizzle/schema';
import { studyLog } from 'src/drizzle/schema';

@Injectable()
export class StudyLogsService {
  constructor(@Inject(DRIZZLE) private db: PostgresJsDatabase<typeof schema>) {}

  async createStudyLog(userId: string, lessonId: string) {
    const result = await this.db
      .insert(studyLog)
      .values({ userId, lessonId })
      .returning();
    return result[0];
  }

  async getStudyLogsByUserId(userId: string) {
    return this.db
      .select()
      .from(studyLog)
      .where(eq(studyLog.userId, userId))
      .orderBy(studyLog.completedAt);
  }
}
