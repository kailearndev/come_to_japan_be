# Go To Japan — Project Overview

Ứng dụng học từ vựng tiếng Nhật. Mỗi ngày học 10 từ kèm đoạn văn ví dụ và ngữ pháp.

---

## Tech Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| Backend  | NestJS + TypeScript               |
| Database | PostgreSQL + Drizzle ORM          |
| Auth     | JWT (cookie httpOnly) + Passport  |
| Docs     | Swagger UI (`/api`)               |
| Package  | pnpm                              |

---

## Cấu trúc thư mục

```
src/
├── auth/               # Đăng nhập, đăng ký, JWT strategy
│   └── dto/            # LoginDto, RegisterDto
├── users/              # CRUD users
│   └── dto/            # UserDto, UpdateUserDto
├── lessons/            # CRUD bài học
│   └── dto/            # LessonDto, CreateLessonDto, UpdateLessonDto
├── words/              # CRUD từ vựng           (TODO)
├── lesson_words/       # Gán từ vào bài học     (TODO)
├── study_logs/         # Ghi lại lịch sử học    (TODO)
├── common/             # Response wrapper, interceptor
├── drizzle/            # Schema, kết nối DB
└── skills/             # Tài liệu dự án
```

---

## Database

> Chi tiết xem `db.md`

### Bảng đã có

| Bảng       | Mô tả                          | Status |
|------------|--------------------------------|--------|
| `users`    | Tài khoản người dùng           | ✅ Done |
| `lessons`  | Bài học (10 từ + đoạn văn)     | ✅ Done |
| `words`    | Kho từ vựng tiếng Nhật         | ✅ Done |

### Bảng cần làm

| Bảng           | Mô tả                                  | Status   |
|----------------|----------------------------------------|----------|

| `lesson_words` | Bảng nối lesson ↔ words (10 từ/bài)   | 🔲 TODO  |
| `study_logs`   | Ghi lại user học bài nào, ngày nào    | 🔲 TODO  |

---

## API Endpoints

### Auth — `/auth`
| Method | Route            | Mô tả         | Guard |
|--------|------------------|---------------|-------|
| POST   | `/auth/register` | Đăng ký       | —     |
| POST   | `/auth/login`    | Đăng nhập     | —     |

### Users — `/users`
| Method | Route          | Mô tả              | Guard |
|--------|----------------|--------------------|-------|
| GET    | `/users`       | Lấy danh sách      | JWT   |
| GET    | `/users/:id`   | Lấy theo id        | JWT   |
| PATCH  | `/users/:id`   | Cập nhật           | JWT   |
| DELETE | `/users/:id`   | Xóa                | JWT   |

### Lessons — `/lessons`
| Method | Route            | Mô tả              | Guard |
|--------|------------------|--------------------|-------|
| GET    | `/lessons`       | Lấy danh sách      | JWT   |
| GET    | `/lessons/:id`   | Lấy theo id        | JWT   |
| POST   | `/lessons`       | Tạo bài mới        | JWT   |
| PATCH  | `/lessons/:id`   | Cập nhật           | JWT   |
| DELETE | `/lessons/:id`   | Xóa                | JWT   |

### Words — `/words` 🔲 TODO
### Lesson Words — `/lesson-words` 🔲 TODO
### Study Logs — `/study-logs` 🔲 TODO

---

## Response Format

Mọi API đều trả về cùng format (qua `ResponseInterceptor`):

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": { }
}
```

---

## Auth Flow

```
POST /auth/register  →  tạo user, hash password (bcrypt)
POST /auth/login     →  verify password → sign JWT → set cookie httpOnly
GET  /users          →  JwtStrategy đọc cookie → validate payload → cho phép
```

---

## Học Flow (khi hoàn thiện)

```
Admin tạo bài học (lesson)
  → gán 10 từ vào bài (lesson_words)
  → User vào học bài
  → Hoàn thành → ghi vào study_logs
  → Query study_logs biết user học đến bài nào
```
