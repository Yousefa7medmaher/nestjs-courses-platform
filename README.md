# Courses Platform

A full-featured online courses platform built with NestJS, TypeORM, and PostgreSQL.

## Features
- User authentication and roles (Student, Instructor, Admin)
- Course, Program, Lesson, Quiz, Assignment management
- Enrollment and certificate tracking
- File uploads for assignments, videos, and images

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm
- PostgreSQL

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file with your database and app settings. Example:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=youruser
DB_PASS=yourpass
DB_NAME=courses_platform
```

### Running the App
```bash
npm run start:dev
```

### Build for Production
```bash
npm run build
npm run start:prod
```

### Docker
Build and run the app in Docker:
```bash
docker build -t courses-platform .
docker run -p 3000:3000 courses-platform
```

## Project Structure
- `src/` - Main source code
- `src/modules/` - Feature modules (users, courses, lessons, etc.)
- `src/migrations/` - Database migrations
- `uploads/` - Uploaded files

## License
MIT
