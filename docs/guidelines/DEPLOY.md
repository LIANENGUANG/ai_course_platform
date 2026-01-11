# AI 课程平台部署文档

## 项目信息

- **项目名称**: AI 课程平台
- **镜像地址**: `ccr.ccs.tencentyun.com/ai-course/ai-course-platform`
- **部署域名**: `www.lianenguang.com.cn`
- **服务器类型**: 腾讯云轻量应用服务器
- **技术栈**: Django + React + PostgreSQL

## 架构说明

```
用户访问 https://www.lianenguang.com.cn
    ↓
Nginx (443/80, SSL终止)
    ↓
Docker 容器: Django (8000端口, 前后端一体)
    ↓
Docker 容器: PostgreSQL (5432端口)
```

**前后端一体化部署**：
- 前端 React 构建为静态文件
- Django 同时服务 API 和前端静态文件
- 单个 Web 容器，简化部署

---

## 一、前置准备

### 1.1 本地环境

确保已安装：
- Docker Desktop (macOS/Windows) 或 Docker Engine (Linux)
- 已登录腾讯云镜像仓库

```bash
# 验证 Docker 登录状态
docker login ccr.ccs.tencentyun.com
# 应显示: Login Succeeded
```

### 1.2 云服务器准备

**服务器要求**：
- 操作系统: Ubuntu 20.04/22.04 LTS
- 配置: 2核4G 或以上
- 开放端口: 80, 443, 5432 (可选，用于远程数据库访问)

**域名解析**：
- 确保域名 `www.lianenguang.com.cn` 已正确解析到服务器 IP

---

## 二、本地构建和推送镜像

### 2.1 构建 Docker 镜像

在项目根目录执行，使用版本号标记：

```bash
# 构建镜像（使用递增的版本号）
docker build -t ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v1 .

# 后续更新时递增版本号: v2, v3, v4...
```

**构建过程**：
1. 阶段 1: 构建前端 (Node.js 18)
   - 安装依赖 `npm install`
   - 构建前端 `npm run build`
2. 阶段 2: 构建后端并整合 (Python 3.13)
   - 安装 Python 依赖
   - 复制后端代码
   - 复制前端构建产物到 `frontend_build/`

### 2.2 推送镜像到腾讯云

```bash
# 推送镜像
docker push ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v1
```

### 2.3 本地测试（可选）

```bash
# 使用 docker-compose 本地测试
docker-compose -f docker-compose.prod.yml up

# 访问 http://localhost:8000 验证
```

---

## 三、服务器环境配置

### 3.1 安装 Docker

SSH 登录服务器后执行：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 配置腾讯云镜像加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"]
}
EOF

# 重启 Docker
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl enable docker

# 验证安装
docker --version
docker-compose --version
```

### 3.2 安装 Docker Compose

```bash
# 安装 Docker Compose V2
sudo apt install docker-compose-plugin -y

# 或使用独立版本
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 验证
docker compose version
```

### 3.3 登录腾讯云镜像仓库

```bash
docker login ccr.ccs.tencentyun.com
# 输入用户名和密码
```

---

## 四、Nginx 配置（SSL 证书）

### 4.1 安装 Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
```

### 4.2 上传 SSL 证书

将 SSL 证书文件上传到服务器：

```bash
# 创建证书目录
sudo mkdir -p /etc/nginx/ssl

# 上传证书文件（本地操作）
scp your-certificate.crt username@server-ip:/etc/nginx/ssl/lianenguang.com.cn.crt
scp your-certificate.key username@server-ip:/etc/nginx/ssl/lianenguang.com.cn.key

# 设置权限（服务器操作）
sudo chmod 600 /etc/nginx/ssl/lianenguang.com.cn.key
sudo chmod 644 /etc/nginx/ssl/lianenguang.com.cn.crt
```

### 4.3 配置 Nginx 反向代理

创建站点配置：

```bash
sudo nano /etc/nginx/sites-available/ai-course
```

粘贴以下配置：

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name www.lianenguang.com.cn lianenguang.com.cn;

    # 重定向到 HTTPS
    return 301 https://www.lianenguang.com.cn$request_uri;
}

# HTTPS 主配置
server {
    listen 443 ssl http2;
    server_name www.lianenguang.com.cn;

    # SSL 证书配置
    ssl_certificate /etc/nginx/ssl/lianenguang.com.cn.crt;
    ssl_certificate_key /etc/nginx/ssl/lianenguang.com.cn.key;

    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 客户端上传限制
    client_max_body_size 100M;

    # 反向代理到 Django
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # 健康检查
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

启用站点配置：

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/ai-course /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

---

## 五、部署应用

### 5.1 准备项目目录

```bash
# 创建项目目录
mkdir -p ~/ai_course_platform
cd ~/ai_course_platform
```

### 5.2 创建环境变量文件

创建 `.env` 文件：

```bash
nano .env
```

填入以下内容（根据实际情况修改）：

```env
# Django 配置
DEBUG=False
SECRET_KEY=your-secret-key-here-change-this-in-production
ALLOWED_HOSTS=www.lianenguang.com.cn,lianenguang.com.cn

# 数据库配置
POSTGRES_DB=ai_course_db
POSTGRES_USER=ai_course_user
POSTGRES_PASSWORD=your-strong-password-here
DB_HOST=postgres
DB_PORT=5432

# 其他配置
DJANGO_SETTINGS_MODULE=config.settings
```

### 5.3 创建 docker-compose.prod.yml

创建编排文件：

```bash
nano docker-compose.prod.yml
```

内容：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:17-alpine
    container_name: ai_course_postgres
    restart: unless-stopped
    env_file:
      - .env
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - ai_course_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    image: ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v1
    container_name: ai_course_web
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - ai_course_network
    volumes:
      - static_data:/app/staticfiles
      - media_data:/app/media

volumes:
  postgres_data:
    driver: local
  static_data:
    driver: local
  media_data:
    driver: local

networks:
  ai_course_network:
    driver: bridge
```

### 5.4 拉取并启动服务

```bash
# 拉取镜像（替换为实际版本号）
docker pull ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v1

# 启动服务
docker compose -f docker-compose.prod.yml up -d

# 查看日志
docker compose -f docker-compose.prod.yml logs -f

# 检查服务状态
docker compose -f docker-compose.prod.yml ps
```

### 5.5 初始化数据库

```bash
# 进入 web 容器
docker exec -it ai_course_web bash

# 执行数据库迁移（如果启动脚本未自动执行）
python manage.py migrate

# 创建超级用户
python manage.py createsuperuser

# 收集静态文件
python manage.py collectstatic --noinput

# 退出容器
exit
```

---

## 六、验证部署

### 6.1 检查服务状态

```bash
# 检查 Docker 容器
docker ps

# 检查 Nginx
sudo systemctl status nginx

# 检查端口监听
sudo netstat -tlnp | grep -E '80|443|8000|5432'
```

### 6.2 测试访问

1. **HTTPS 访问**: https://www.lianenguang.com.cn
2. **健康检查**: https://www.lianenguang.com.cn/health
3. **后台管理**: https://www.lianenguang.com.cn/admin

### 6.3 查看日志

```bash
# Web 容器日志
docker logs -f ai_course_web

# 数据库日志
docker logs -f ai_course_postgres

# Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 七、更新部署

### 7.1 本地更新流程

```bash
# 1. 修改代码后重新构建（递增版本号）
docker build -t ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v2 .

# 2. 推送新版本
docker push ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v2
```

### 7.2 服务器更新流程

```bash
# 1. 修改 docker-compose.prod.yml 中的镜像版本号为 v2
nano docker-compose.prod.yml  # 将 image 改为 :v2

# 2. 拉取新镜像
docker pull ccr.ccs.tencentyun.com/ai-course/ai-course-platform:v2

# 3. 重启服务
docker compose -f docker-compose.prod.yml up -d

# 4. 查看日志确认启动成功
docker compose -f docker-compose.prod.yml logs -f web
```

---

## 八、常见问题

### 8.1 容器无法启动

```bash
# 查看详细错误日志
docker logs ai_course_web
docker logs ai_course_postgres

# 检查环境变量
docker exec ai_course_web env

# 重新创建容器
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
```

### 8.2 数据库连接失败

```bash
# 进入 web 容器测试数据库连接
docker exec -it ai_course_web bash
python manage.py dbshell

# 检查 postgres 容器健康状态
docker inspect ai_course_postgres | grep -i health
```

### 8.3 静态文件 404

```bash
# 重新收集静态文件
docker exec -it ai_course_web python manage.py collectstatic --noinput

# 检查静态文件卷
docker volume inspect ai_course_platform_static_data
```

### 8.4 SSL 证书问题

```bash
# 测试 SSL 证书
openssl s_client -connect www.lianenguang.com.cn:443

# 重新加载 Nginx 配置
sudo nginx -t
sudo systemctl reload nginx
```

---

## 九、维护命令

### 9.1 备份数据库

```bash
# 备份数据库
docker exec ai_course_postgres pg_dump -U ai_course_user ai_course_db > backup_$(date +%Y%m%d).sql

# 恢复数据库
cat backup_20260111.sql | docker exec -i ai_course_postgres psql -U ai_course_user -d ai_course_db
```

### 9.2 清理 Docker 资源

```bash
# 清理未使用的镜像
docker image prune -a

# 清理未使用的容器
docker container prune

# 清理未使用的卷（谨慎！）
docker volume prune
```

### 9.3 监控资源使用

```bash
# 查看容器资源使用
docker stats

# 查看磁盘使用
df -h
docker system df
```

---

## 十、安全建议

1. **定期更新系统和 Docker**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **配置防火墙**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

3. **使用强密码**
   - 数据库密码
   - Django SECRET_KEY
   - 服务器 SSH 密钥

4. **定期备份**
   - 数据库备份（每天）
   - 代码备份（Git）
   - 配置文件备份

5. **监控日志**
   - 定期检查 Nginx、Django、PostgreSQL 日志
   - 设置日志轮转避免磁盘满

---

## 附录

### A. 快速部署脚本

可以创建自动化脚本简化部署流程（详见 `deploy/` 目录）

### B. 环境变量完整列表

| 变量名 | 说明 | 示例 |
|--------|------|------|
| DEBUG | 调试模式 | False |
| SECRET_KEY | Django 密钥 | your-secret-key |
| ALLOWED_HOSTS | 允许的主机 | www.lianenguang.com.cn |
| POSTGRES_DB | 数据库名 | ai_course_db |
| POSTGRES_USER | 数据库用户 | ai_course_user |
| POSTGRES_PASSWORD | 数据库密码 | your-password |
| DB_HOST | 数据库主机 | postgres |
| DB_PORT | 数据库端口 | 5432 |

### C. 技术支持

- 项目仓库: 待填写
- 问题反馈: 待填写
- 文档版本: v1.0
- 更新日期: 2026-01-11
