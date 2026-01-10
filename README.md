# AI Course Platform

前后端分离的 AI 课程平台

## 项目概述

这是一个采用前后端分离架构的 AI 课程平台项目，后端使用 Django REST Framework 提供 RESTful API，前端使用 React + TypeScript + Ant Design 构建。

## 技术栈

### 后端 (Backend)
- **框架**: Django 5.1.4 + Django REST Framework 3.15.2
- **数据库**: PostgreSQL 17 (官方 Alpine 镜像)
- **认证**: JWT (djangorestframework-simplejwt)
- **API 文档**: drf-spectacular (Swagger/OpenAPI)
- **包管理**: uv (比 pip 快 10-100 倍 ⚡)
- **容器化**: Docker & Docker Compose

### 前端 (Frontend)
- **框架**: React 18 + TypeScript
- **UI 库**: Ant Design (antd)
- **状态管理**: Zustand
- **路由**: React Router
- **HTTP 客户端**: Axios
- **构建工具**: Create React App

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
- **uv** (Python 包管理器) - [安装指南](https://github.com/astral-sh/uv)
- Node.js 18+
- npm 或 yarn

#### 安装 uv (推荐)

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# 或使用 Homebrew (macOS)
brew install uv
```

### 启动步骤

#### 1. 启动数据库

```bash
# 在项目根目录启动 PostgreSQL
docker-compose up -d

# 检查数据库状态
docker ps
```

#### 2. 启动后端

```bash
# 进入后端目录
cd backend

# 创建虚拟环境（首次运行）
uv venv

# 激活虚拟环境
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate  # Windows

# 安装依赖（首次运行）
uv pip install -r requirements.txt

# 运行数据库迁移
python manage.py migrate

# 创建超级用户（可选）
python manage.py createsuperuser

# 启动开发服务器
python manage.py runserver
```

后端将运行在 `http://localhost:8000`

**API 文档**:
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/
- Django Admin: http://localhost:8000/admin/

#### 3. 启动前端

```bash
# 在新终端窗口，进入前端目录
cd frontend

# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm start
```

前端将运行在 `http://localhost:3000`

### 环境变量

**后端 (`backend/.env`)**:
```bash
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=ai_course_platform
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

**前端 (`frontend/.env.development`)**:
```bash
VITE_APP_TITLE=AI课程平台
VITE_API_BASE_URL=http://localhost:8000
```

## Claude Code MCP Servers

项目已配置以下 MCP servers：

1. **exa** - AI 搜索引擎工具
2. **context7-mcp** - 代码上下文管理与 GitHub 代码搜索
3. **github** - GitHub 集成

## 项目结构

```
ai_course_platform/
├── backend/                 # Django 后端
│   ├── config/             # Django 项目配置
│   │   ├── settings.py     # 项目设置
│   │   ├── urls.py         # 根 URL 配置
│   │   └── wsgi.py         # WSGI 配置
│   ├── apps/               # Django 应用
│   │   ├── courses/        # 课程管理应用
│   │   └── users/          # 用户管理应用
│   ├── .venv/              # Python 虚拟环境 (uv 创建)
│   ├── manage.py           # Django 管理命令
│   ├── requirements.txt    # Python 依赖
│   ├── pyproject.toml      # 项目配置 (uv)
│   ├── README.md           # 后端文档
│   └── .env                # 后端环境变量
│
├── frontend/               # Vue 前端
│   ├── src/
│   │   ├── api/            # API 接口定义
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # Vue 组件
│   │   ├── router/         # 路由配置
│   │   ├── stores/         # Pinia 状态管理
│   │   ├── utils/          # 工具函数
│   │   ├── views/          # 页面组件
│   │   ├── App.vue         # 根组件
│   │   └── main.ts         # 入口文件
│   ├── public/             # 公共资源
│   ├── package.json        # npm 配置
│   ├── vite.config.ts      # Vite 配置
│   └── .env.development    # 前端开发环境变量
│
├── docker-compose.yml      # Docker Compose 配置
├── .gitignore
└── README.md
```

## 开发指南

### 后端开发

#### 使用 uv 管理依赖

```bash
# 安装新包
uv pip install package-name

# 更新 requirements.txt
uv pip freeze > requirements.txt

# 列出已安装的包
uv pip list
```

#### 创建新的 Django 应用
```bash
cd backend
source .venv/bin/activate
python manage.py startapp apps/your_app_name
```

#### 数据库操作
```bash
# 创建迁移文件
python manage.py makemigrations

# 应用迁移
python manage.py migrate

# 使用 psql 连接数据库
docker exec -it ai_course_postgres psql -U postgres -d ai_course_platform
```

#### API 测试
```bash
# 使用 Django REST Framework 提供的可浏览 API
# 访问 http://localhost:8000/api/

# 或使用 curl
curl http://localhost:8000/api/
```

### 前端开发

#### 构建生产版本
```bash
cd frontend
npm run build
```

#### 代码格式化
```bash
npm run format
```

#### 运行测试
```bash
npm run test:unit
```

### 数据库管理

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

## 部署说明

### 开发环境
- 前端: Vite 开发服务器 (`npm run dev`)
- 后端: Django 开发服务器 (`python manage.py runserver`)
- 数据库: Docker PostgreSQL

### 生产环境建议
- 前端: 构建静态文件 (`npm run build`)，使用 Nginx 托管
- 后端: 使用 Gunicorn + Nginx
- 数据库: Docker PostgreSQL (自建) 或云数据库服务
- 反向代理: Nginx
- 进程管理: Supervisor 或 systemd

## 贡献

本项目使用 Claude Code 进行开发辅助。

## License

待定
