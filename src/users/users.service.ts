import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as schema from 'src/drizzle/schema';
import { user } from 'src/drizzle/schema';
import { UpdateUserDto } from './dto/update-user.dto';

type CreateUserDto = {
  fullName: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: PostgresJsDatabase<typeof schema>) {}

  async findAll() {
    return this.db
      .select({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .from(user);
  }

  async findById(id: string) {
    const result = await this.db
      .select({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (!result[0]) throw new NotFoundException('Người dùng không tồn tại!');
    return result[0];
  }

  async findByEmail(email: string) {
    const result = await this.db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email đã tồn tại!');

    const hashPassword = await bcrypt.hash(dto.password, 10);
    await this.db
      .insert(user)
      .values({ fullName: dto.fullName, email: dto.email, hashPassword })
      .returning();

    return { message: 'Tạo người dùng thành công!' };
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    await this.findById(id);

    const updateData: Partial<typeof user.$inferInsert> = {};
    if (dto.fullName) updateData.fullName = dto.fullName;
    if (dto.email)    updateData.email    = dto.email;
    if (dto.password) updateData.hashPassword = await bcrypt.hash(dto.password, 10);

    const result = await this.db
      .update(user)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(user.id, id))
      .returning({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

    return result[0];
  }

  async deleteUser(id: string) {
    await this.findById(id);
    await this.db.delete(user).where(eq(user.id, id));
    return { message: 'Xóa người dùng thành công!' };
  }
}
