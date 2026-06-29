import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as schema from 'src/drizzle/schema';
import { lesson, lessonWord, word } from 'src/drizzle/schema';
import { AddWordDto } from './dto/add-word.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(@Inject(DRIZZLE) private db: PostgresJsDatabase<typeof schema>) {}

  async findAll() {
    return this.db.select().from(lesson).orderBy(lesson.orderIndex);
  }

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(lesson)
      .where(eq(lesson.id, id))
      .limit(1);

    if (!result[0]) throw new NotFoundException('Bài học không tồn tại!');
    return result[0];
  }

  async createLesson(dto: CreateLessonDto) {
    const result = await this.db.insert(lesson).values(dto).returning();

    return result[0];
  }

  async updateLesson(id: string, dto: UpdateLessonDto) {
    await this.findById(id);

    const result = await this.db
      .update(lesson)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(lesson.id, id))
      .returning();

    return result[0];
  }

  async deleteLesson(id: string) {
    await this.findById(id);
    await this.db.delete(lesson).where(eq(lesson.id, id));
    return { message: 'Xóa bài học thành công!' };
  }

  async getWords(lessonId: string) {
    await this.findById(lessonId);
    return this.db
      .select({
        wordId: word.id,
        kanji: word.kanji,
        hiragana: word.hiragana,
        meaning: word.meaning,
        jlptLevel: word.jlptLevel,
        orderIndex: lessonWord.orderIndex,
      })
      .from(lessonWord)
      .innerJoin(word, eq(lessonWord.wordId, word.id))
      .where(eq(lessonWord.lessonId, lessonId))
      .orderBy(lessonWord.orderIndex);
  }

  async addWord(lessonId: string, dto: AddWordDto) {
    await this.findById(lessonId);

    const values = dto.words.map((w) => ({
      lessonId,
      wordId: w.wordId,
      orderIndex: w.orderIndex,
    }));

    await this.db.insert(lessonWord).values(values).onConflictDoNothing();
    return { message: `Đã thêm ${values.length} từ vào bài học!` };
  }

  async removeWord(lessonId: string, wordId: string) {
    await this.findById(lessonId);
    await this.db
      .delete(lessonWord)
      .where(
        and(eq(lessonWord.lessonId, lessonId), eq(lessonWord.wordId, wordId)),
      );
    return { message: 'Xóa từ khỏi bài học thành công!' };
  }
}
