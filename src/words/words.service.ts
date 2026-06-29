import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as schema from 'src/drizzle/schema';
import { word } from 'src/drizzle/schema';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordsService {
  constructor(@Inject(DRIZZLE) private db: PostgresJsDatabase<typeof schema>) {}

  async findAll() {
    return this.db.select().from(word).orderBy(word.jlptLevel);
  }

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(word)
      .where(eq(word.id, id))
      .limit(1);

    if (!result[0]) throw new NotFoundException('Từ vựng không tồn tại!');
    return result[0];
  }

  async createWord(dto: CreateWordDto) {
    const result = await this.db.insert(word).values(dto).returning();
    return result[0];
  }

  async updateWord(id: string, dto: UpdateWordDto) {
    await this.findById(id);

    const result = await this.db
      .update(word)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(word.id, id))
      .returning();

    return result[0];
  }

  async deleteWord(id: string) {
    await this.findById(id);
    await this.db.delete(word).where(eq(word.id, id));
    return { message: 'Xóa từ vựng thành công!' };
  }
}
