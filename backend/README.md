# AI Course Platform Backend

Django REST Framework 后端 API，使用 uv 进行依赖管理。

## 依赖管理

本项目使用 [uv](https://github.com/astral-sh/uv) 进行 Python 包管理，它比 pip 快 10-100 倍。

### 安装 uv

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# 或使用 Homebrew (macOS)
brew install uv

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 创建虚拟环境

```bash
# 创建虚拟环境
uv venv

# 激活虚拟环境
source .venv/bin/activate  # macOS/Linux
# 或
.venv\Scripts\activate  # Windows
```

### 安装依赖

```bash
# 从 requirements.txt 安装
uv pip install -r requirements.txt

# 或从 pyproject.toml 安装
uv pip install -e .
```

### 添加新依赖

```bash
# 安装新包
uv pip install package-name

# 更新 requirements.txt
uv pip freeze > requirements.txt
```

### 常用命令对比

| 操作 | pip | uv |
|------|-----|-----|
| 安装依赖 | `pip install -r requirements.txt` | `uv pip install -r requirements.txt` |
| 安装包 | `pip install django` | `uv pip install django` |
| 卸载包 | `pip uninstall django` | `uv pip uninstall django` |
| 列出包 | `pip list` | `uv pip list` |
| 冻结依赖 | `pip freeze > requirements.txt` | `uv pip freeze > requirements.txt` |

## 开发环境设置

```bash
# 1. 创建并激活虚拟环境
uv venv
source .venv/bin/activate

# 2. 安装依赖
uv pip install -r requirements.txt

# 3. 配置环境变量
cp .env.example .env  # 如果有的话
# 编辑 .env 文件

# 4. 运行迁移
python manage.py migrate

# 5. 创建超级用户
python manage.py createsuperuser

# 6. 启动开发服务器
python manage.py runserver
```

## 项目结构

```
backend/
├── config/              # Django 项目配置
│   ├── settings.py     # 设置
│   ├── urls.py         # URL 路由
│   └── wsgi.py         # WSGI 配置
├── .venv/              # 虚拟环境 (uv 创建)
├── manage.py           # Django 管理命令
├── requirements.txt    # 依赖列表
├── pyproject.toml      # 项目配置 (uv 推荐)
└── .env                # 环境变量
```

## API 文档

启动服务器后访问：
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/
- Django Admin: http://localhost:8000/admin/

## 环境变量

在 `.env` 文件中配置：

```bash
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=ai_course_platform
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```
