# 依赖管理指南

本项目使用 **uv** 作为 Python 包管理器，以获得更快的安装速度和更好的依赖解析。

## uv 简介

uv 是一个极快的 Python 包管理器，由 Rust 编写，是 pip 和 pip-tools 的替代品。

- **速度快**：比 pip 快 10-100 倍
- **可靠**：更好的依赖解析
- **兼容**：完全兼容 pip 和 requirements.txt

官方文档：https://github.com/astral-sh/uv

---

## 安装 uv

### macOS / Linux
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows
```bash
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 使用 pip 安装
```bash
pip install uv
```

### 验证安装
```bash
uv --version
```

---

## 日常使用

### 1. 安装项目依赖

```bash
# 进入后端目录
cd backend

# 安装 requirements.txt 中的所有依赖
uv pip install -r requirements.txt
```

### 2. 安装单个包

```bash
# 安装指定包
uv pip install django

# 安装指定版本
uv pip install django==5.1.4

# 安装并添加到 requirements.txt
uv pip install whitenoise
# 然后手动更新 requirements.txt
```

### 3. 更新依赖

```bash
# 更新单个包
uv pip install --upgrade django

# 更新所有包
uv pip install --upgrade -r requirements.txt
```

### 4. 卸载包

```bash
uv pip uninstall package-name
```

### 5. 查看已安装的包

```bash
uv pip list
```

---

## 虚拟环境使用

### 激活虚拟环境后使用 uv

```bash
# 激活虚拟环境
source .venv/bin/activate  # macOS/Linux
# 或
.venv\Scripts\activate     # Windows

# 使用 uv 安装
uv pip install -r requirements.txt
```

### 不激活虚拟环境直接使用

```bash
# 指定 Python 路径
uv pip install --python .venv/bin/python -r requirements.txt

# 或使用系统级安装
uv pip install --system -r requirements.txt
```

---

## requirements.txt 管理

### 当前项目依赖

本项目的 `backend/requirements.txt` 包含：

```txt
# Django Core
Django==5.1.4
djangorestframework==3.15.2

# Database
psycopg2-binary==2.9.10

# CORS
django-cors-headers==4.6.0

# Static Files (生产环境服务静态文件)
whitenoise==6.8.2

# Environment Variables
python-dotenv==1.0.1

# Authentication & Security
djangorestframework-simplejwt==5.4.0

# API Documentation
drf-spectacular==0.27.2

# Development Tools
django-extensions==3.2.3
```

### 添加新依赖的流程

1. **安装包**
   ```bash
   uv pip install package-name
   ```

2. **更新 requirements.txt**
   ```bash
   # 手动添加到 requirements.txt 对应分类下
   # 格式：package-name==版本号
   ```

3. **锁定版本号**
   ```bash
   # 查看已安装版本
   uv pip show package-name

   # 或导出所有包版本
   uv pip freeze > requirements-freeze.txt
   ```

---

## Docker 中使用 uv

### Dockerfile 配置

本项目的 Dockerfile 已配置使用 uv：

```dockerfile
# 安装 uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# 使用 uv 安装依赖
RUN uv pip install --system --no-cache -r requirements.txt gunicorn
```

### 参数说明

- `--system`：安装到系统 Python（Docker 容器内不需要虚拟环境）
- `--no-cache`：不使用缓存，减小镜像体积
- `-r requirements.txt`：从文件安装
- `gunicorn`：生产环境 WSGI 服务器（不在 requirements.txt 中，仅 Docker 需要）

---

## 常见问题

### Q1: uv 和 pip 的区别？

| 特性 | uv | pip |
|------|----|----|
| 速度 | 极快（10-100x） | 较慢 |
| 依赖解析 | 更准确 | 有时出错 |
| 兼容性 | 完全兼容 pip | 标准工具 |
| 安装体积 | 小 | 内置 |

### Q2: 已经用 pip 安装了，可以改用 uv 吗？

可以！uv 完全兼容 pip，可以直接切换：

```bash
# 原来使用 pip
pip install -r requirements.txt

# 现在使用 uv
uv pip install -r requirements.txt
```

### Q3: requirements.txt 需要修改吗？

**不需要**！uv 完全兼容标准的 requirements.txt 格式。

### Q4: CI/CD 中如何使用 uv？

```yaml
# GitHub Actions 示例
- name: Install dependencies
  run: |
    pip install uv
    uv pip install --system -r requirements.txt
```

### Q5: 遇到权限问题怎么办？

```bash
# 使用 --user 安装到用户目录
uv pip install --user -r requirements.txt

# 或使用 --system（Docker/虚拟环境）
uv pip install --system -r requirements.txt
```

---

## 最佳实践

### 1. 始终锁定版本号

❌ **不推荐**：
```txt
Django
djangorestframework
```

✅ **推荐**：
```txt
Django==5.1.4
djangorestframework==3.15.2
```

### 2. 分类组织依赖

```txt
# Django Core
Django==5.1.4

# Database
psycopg2-binary==2.9.10

# Third-party
...
```

### 3. 定期更新依赖

```bash
# 每月检查安全更新
uv pip install --upgrade -r requirements.txt

# 测试后更新 requirements.txt
uv pip freeze > requirements.txt
```

### 4. 使用 .gitignore

确保不提交虚拟环境：

```gitignore
# Python
.venv/
venv/
__pycache__/
*.pyc
```

---

## 参考资料

- [uv 官方文档](https://github.com/astral-sh/uv)
- [uv 官方网站](https://astral.sh/uv)
- [Python 包管理最佳实践](https://packaging.python.org/)

---

## 更新记录

- 2026-01-11：初始版本，添加 whitenoise 依赖
