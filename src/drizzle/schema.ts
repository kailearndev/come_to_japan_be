import { integer, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  hashPassword: text('hash_password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const word = pgTable('words', {
  id: uuid('id').primaryKey().defaultRandom(),
  kanji: text('kanji'),
  hiragana: text('hiragana').notNull(),
  meaning: text('meaning').notNull(),
  jlptLevel: text('jlpt_level'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const lesson = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  passage: text('passage').notNull(),
  grammarPoint: text('grammar_point').notNull(),
  grammarExplain: text('grammar_explain').notNull(),
  orderIndex: integer('order_index').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const lessonWord = pgTable('lesson_words', {
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => lesson.id, { onDelete: 'cascade' }),
  wordId: uuid('word_id')
    .notNull()
    .references(() => word.id, { onDelete: 'cascade' }),
  orderIndex: integer('order_index').notNull().default(0),
});

export const studyLog = pgTable('study_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => lesson.id, { onDelete: 'cascade' }),
  completedAt: timestamp('completed_at').notNull().defaultNow(),
});
