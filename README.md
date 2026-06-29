# Come To Japan — Backend API

Backend API cho ứng dụng học từ vựng tiếng Nhật. Mỗi ngày học 10 từ kèm đoạn văn ví dụ và ngữ pháp.

## Tech Stack

- **Framework:** NestJS + TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** JWT (cookie httpOnly) + Passport
- **Docs:** Swagger UI
- **Package Manager:** pnpm

## Yêu cầu

- Node.js >= 20
- PostgreSQL
- pnpm

## Cài đặt

```bash
pnpm install
```

Tạo file `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/come_to_japan
JWT_SECRET=your_jwt_secret
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_EXPIRES_IN=7d
PORT=3000
```

## Chạy project

```bash
# development
pnpm start:dev

# production
pnpm start:prod
```

Swagger UI: `http://localhost:3000/api`

## Database

```
users        ← tài khoản người dùng
words        ← kho từ vựng tiếng Nhật
lessons      ← bài học (10 từ + đoạn văn + ngữ pháp)
lesson_words ← bảng nối lesson ↔ words
study_logs   ← lịch sử học của user
```

## API Endpoints

### Auth
| Method | Route | Mô tả | Guard |
|--------|-------|-------|-------|
| POST | `/auth/register` | Đăng ký | — |
| POST | `/auth/login` | Đăng nhập → set cookie | — |

### Users
| Method | Route | Mô tả | Guard |
|--------|-------|-------|-------|
| GET | `/users` | Danh sách users | JWT |
| GET | `/users/:id` | Chi tiết user | JWT |
| PATCH | `/users/:id` | Cập nhật user | JWT |
| DELETE | `/users/:id` | Xóa user | JWT |

### Words
| Method | Route | Mô tả | Guard |
|--------|-------|-------|-------|
| GET | `/words` | Danh sách từ vựng | JWT |
| GET | `/words/:id` | Chi tiết từ | JWT |
| POST | `/words` | Thêm từ mới | JWT |
| PATCH | `/words/:id` | Cập nhật từ | JWT |
| DELETE | `/words/:id` | Xóa từ | JWT |

### Lessons
| Method | Route | Mô tả | Guard |
|--------|-------|-------|-------|
| GET | `/lessons` | Danh sách bài học | JWT |
| GET | `/lessons/:id` | Chi tiết bài học | JWT |
| POST | `/lessons` | Tạo bài mới | JWT |
| PATCH | `/lessons/:id` | Cập nhật bài | JWT |
| DELETE | `/lessons/:id` | Xóa bài | JWT |
| GET | `/lessons/:id/words` | Từ vựng trong bài | JWT |
| POST | `/lessons/:id/words` | Gán từ vào bài (array) | JWT |
| DELETE | `/lessons/:id/words/:wordId` | Xóa từ khỏi bài | JWT |

### Study Logs
| Method | Route | Mô tả | Guard |
|--------|-------|-------|-------|
| POST | `/study-logs` | Ghi lại hoàn thành bài | JWT |
| GET | `/study-logs/me` | Lịch sử học của tôi | JWT |

## Response Format

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

## Auth Flow

```
POST /auth/login  →  JWT được set vào cookie httpOnly
GET  /lessons     →  JwtStrategy đọc cookie → xác thực → cho phép
```
