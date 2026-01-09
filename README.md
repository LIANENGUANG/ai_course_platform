# AI Course Platform

Django RESTful API Backend with PostgreSQL

## 项目概述

这是一个基于 Django 的 RESTful API 后端项目，采用 MVC 模式，使用 PostgreSQL 作为数据库。

## 技术栈

- **后端框架**: Django (Python)
- **架构模式**: MVC (Model-View-Controller)
- **数据库**: PostgreSQL 17
- **容器化**: Docker & Docker Compose

## 本地开发环境

### PostgreSQL 数据库

项目使用 Docker Compose 管理 PostgreSQL 数据库：

#### 数据库连接信息
- **Host**: localhost
- **Port**: 5432
- **Database**: ai_course_platform
- **User**: postgres
- **Password**: postgres
- **连接字符串**: `postgresql://postgres:postgres@localhost:5432/ai_course_platform`

## 快速开始

### 前置要求

- Docker Desktop
- Python 3.8+
- Node.js 16+ (用于 MCP 工具)

### 启动数据库

```bash
# 启动 PostgreSQL 数据库
docker-compose up -d

# 停止数据库
docker-compose down

# 查看数据库日志
docker-compose logs -f postgres

# 进入数据库命令行
docker exec -it ai_course_postgres psql -U postgres -d ai_course_platform
```

### 环境变量

项目使用 `.env.local` 文件存储本地开发环境变量（已在 .gitignore 中）。

## Claude Code MCP Servers

项目已配置以下 MCP servers：

1. **exa** - AI 搜索引擎工具
2. **context7-mcp** - 代码上下文管理与 GitHub 代码搜索
3. **github** - GitHub 集成

## 项目结构

```
ai_course_platform/
├── docker-compose.yml     # Docker Compose 配置 (PostgreSQL)
├── .env.local             # 本地环境变量 (不提交到 Git)
├── .gitignore
└── README.md
```

## 开发指南

### 数据库操作

使用 psql 命令行工具:
```bash
# 方式 1: 使用 docker exec
docker exec -it ai_course_postgres psql -U postgres -d ai_course_platform

# 方式 2: 使用本地 psql (需要先安装 PostgreSQL 客户端)
psql postgresql://postgres:postgres@localhost:5432/ai_course_platform
```

或使用图形化工具如 pgAdmin, DBeaver, DataGrip 等，使用以下连接信息：
- Host: localhost
- Port: 5432
- Database: ai_course_platform
- User: postgres
- Password: postgres

## 贡献

本项目使用 Claude Code 进行开发辅助。

## License

待定
