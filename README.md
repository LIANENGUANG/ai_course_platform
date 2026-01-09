# AI Course Platform

Django RESTful API Backend with Supabase Integration

## 项目概述

这是一个基于 Django 的 RESTful API 后端项目，采用 MVC 模式，集成了本地 Supabase 开发环境。

## 技术栈

- **后端框架**: Django (Python)
- **架构模式**: MVC (Model-View-Controller)
- **数据库**: PostgreSQL (通过 Supabase)
- **认证服务**: Supabase Auth
- **存储服务**: Supabase Storage (S3 兼容)
- **容器化**: Docker & Docker Compose

## 本地开发环境

### Supabase 服务

项目包含完整的本地 Supabase 开发环境，提供以下服务：

#### 开发工具
- **Studio**: http://127.0.0.1:54323 (数据库管理界面)
- **Mailpit**: http://127.0.0.1:54324 (邮件测试工具)

#### API 服务
- **Project URL**: http://127.0.0.1:54321
- **REST API**: http://127.0.0.1:54321/rest/v1
- **GraphQL API**: http://127.0.0.1:54321/graphql/v1
- **Edge Functions**: http://127.0.0.1:54321/functions/v1

#### 数据库
- **PostgreSQL**: postgresql://postgres:postgres@127.0.0.1:54322/postgres

#### 认证密钥
- **Publishable Key**: `sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH`
- **Secret Key**: `sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz`

#### 存储服务 (S3)
- **URL**: http://127.0.0.1:54321/storage/v1/s3
- **Region**: local

## 快速开始

### 前置要求

- Docker Desktop
- Python 3.8+
- Node.js 16+ (用于 MCP 工具)

### 启动 Supabase

```bash
# 启动所有 Supabase 服务
supabase start

# 停止服务
supabase stop

# 重置数据库
supabase db reset
```

### 环境变量

项目使用 `.env.local` 文件存储本地开发环境变量（已在 .gitignore 中）。

## Claude Code MCP Servers

项目已配置以下 MCP servers：

1. **exa** - 文件系统浏览工具
2. **context7-mcp** - 代码上下文管理
3. **desktop-commander** - 桌面命令控制
4. **github** - GitHub 集成
5. **supabase** - Supabase 服务集成

## 项目结构

```
ai_course_platform/
├── docker/
│   └── supabase/          # Supabase Docker 配置
├── supabase/              # Supabase CLI 配置
├── .env.local             # 本地环境变量 (不提交到 Git)
├── .gitignore
└── README.md
```

## 开发指南

### 数据库操作

使用 Supabase Studio 进行可视化管理：http://127.0.0.1:54323

或使用 SQL:
```bash
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### API 测试

```bash
# 测试 REST API
curl http://127.0.0.1:54321/rest/v1/ \
  -H "apikey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"
```

## 贡献

本项目使用 Claude Code 进行开发辅助。

## License

待定
