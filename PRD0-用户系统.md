# AI Course Platform - 用户系统 PRD

## 文档信息
- **模块**: 用户系统（User System）
- **编号**: PRD0
- **优先级**: P0（基础模块）
- **版本**: v1.0
- **创建日期**: 2026-01-10
- **最后更新**: 2026-01-10
- **状态**: 草稿

---

## 1. 模块概述

### 1.1 模块定位
用户系统是 AI Course Platform 的**基础核心模块**，为平台所有应用（英语词汇学习、数学、语文等）提供统一的用户管理、认证授权、个人信息管理服务。

### 1.2 核心价值
- **统一认证**: 一次注册，所有应用通用
- **数据隔离**: 不同应用的学习数据独立管理
- **权限控制**: 统一的角色和权限管理
- **扩展性**: 支持平台后续添加新应用

### 1.3 设计原则
- **平台级设计**: 用户系统独立于具体应用
- **可扩展性**: 支持多种用户类型（学生、教师、家长、管理员）
- **安全性**: 密码加密、JWT 认证、数据隔离
- **简洁性**: MVP 阶段只实现核心功能

---

## 2. 功能需求

### 2.1 用户注册

#### 2.1.1 注册方式
- [ ] **邮箱注册**（MVP 必须）
  - 邮箱地址
  - 用户名
  - 密码（8-20位，包含字母和数字）
  - 确认密码
  - 可选：邀请码

- [ ] **手机号注册**（第二阶段）
  - 手机号
  - 短信验证码
  - 用户名
  - 密码

- [ ] **第三方登录**（第三阶段，可选）
  - 微信登录
  - QQ 登录

#### 2.1.2 注册流程
```
1. 用户访问注册页面
   ↓
2. 填写注册信息
   - 邮箱/手机号
   - 用户名（唯一）
   - 密码
   ↓
3. 前端验证
   - 格式校验
   - 密码强度校验
   ↓
4. 提交注册请求
   ↓
5. 后端验证
   - 邮箱/用户名唯一性检查
   - 密码加密存储
   ↓
6. 创建用户账号
   ↓
7. 自动登录并跳转到信息完善页
   - 设置昵称
   - 选择用户角色（学生/教师/家长）
   - 学生额外填写：年级
   ↓
8. 跳转到平台首页
```

#### 2.1.3 注册验证规则
- **邮箱格式**: 符合标准邮箱格式
- **用户名**:
  - 长度: 3-20 个字符
  - 字符: 字母、数字、下划线、中文
  - 唯一性: 不允许重复
- **密码**:
  - 长度: 8-20 个字符
  - 复杂度: 必须包含字母和数字
  - 不能与用户名相同

### 2.2 用户登录

#### 2.2.1 登录方式
- [ ] **用户名/邮箱 + 密码登录**（MVP）
- [ ] **手机号 + 验证码登录**（第二阶段）
- [ ] **记住我**（7天免登录）
- [ ] **第三方登录**（第三阶段）

#### 2.2.2 登录流程
```
1. 用户访问登录页面
   ↓
2. 输入凭证
   - 用户名/邮箱
   - 密码
   ↓
3. 前端基础验证
   ↓
4. 提交登录请求
   ↓
5. 后端验证
   - 用户存在性检查
   - 密码验证
   ↓
6. 生成 JWT Token
   - Access Token（有效期 1 天）
   - Refresh Token（有效期 7 天）
   ↓
7. 返回用户信息和 Token
   ↓
8. 前端存储 Token
   - LocalStorage: Refresh Token
   - Memory/SessionStorage: Access Token
   ↓
9. 跳转到平台首页
```

#### 2.2.3 登录安全
- [ ] 密码错误次数限制（5次/小时）
- [ ] IP 异常登录提醒（第二阶段）
- [ ] 设备管理（第三阶段）

### 2.3 身份认证

#### 2.3.1 JWT Token 管理
- [ ] **Access Token**
  - 有效期: 1 天
  - 用途: API 请求认证
  - 存储: 前端内存/SessionStorage

- [ ] **Refresh Token**
  - 有效期: 7 天
  - 用途: 刷新 Access Token
  - 存储: LocalStorage（HttpOnly Cookie 更安全，第二阶段）

#### 2.3.2 Token 刷新机制
```
1. Access Token 过期（401 响应）
   ↓
2. 前端自动使用 Refresh Token 请求刷新
   ↓
3. 后端验证 Refresh Token
   ↓
4. 生成新的 Access Token
   ↓
5. 返回新 Token
   ↓
6. 前端重试原请求
```

#### 2.3.3 退出登录
- [ ] 清除前端存储的 Token
- [ ] Token 黑名单机制（第二阶段，可选）

### 2.4 用户信息管理

#### 2.4.1 基础信息
**User（用户基础表）**
- id: 主键
- username: 用户名（唯一）
- email: 邮箱（唯一）
- phone: 手机号（可选，唯一）
- password: 密码（加密）
- is_active: 是否激活
- is_staff: 是否为工作人员
- is_superuser: 是否为超级管理员
- date_joined: 注册时间
- last_login: 最后登录时间

**UserProfile（用户档案表）**
- id: 主键
- user: 外键 → User（一对一）
- nickname: 昵称
- avatar: 头像 URL
- gender: 性别（male/female/other）
- birthday: 生日
- bio: 个人简介
- role: 用户角色（student/teacher/parent/admin）
- created_at: 创建时间
- updated_at: 更新时间

**StudentProfile（学生档案表）**
- id: 主键
- user: 外键 → User（一对一）
- grade: 年级（1-12）
- school: 学校名称
- class_name: 班级
- parent_phone: 家长联系电话
- created_at: 创建时间
- updated_at: 更新时间

#### 2.4.2 信息查看与编辑
- [ ] **查看个人信息**
  - 基础信息（用户名、邮箱、昵称、头像）
  - 学生信息（年级、学校）
  - 账号信息（注册时间、最后登录）

- [ ] **编辑个人信息**
  - 可编辑字段：
    - 昵称
    - 头像（上传图片）
    - 性别
    - 生日
    - 个人简介
    - 学生专属：年级、学校、班级
  - 不可编辑字段：
    - 用户名（唯一标识）
    - 邮箱（需要验证流程，第二阶段）

#### 2.4.3 头像管理
- [ ] 头像上传
  - 支持格式: JPG, PNG, GIF
  - 文件大小: < 2MB
  - 自动裁剪为正方形
  - 生成缩略图（100x100, 200x200）
- [ ] 默认头像
  - 提供多个默认头像选择
  - 根据用户名生成随机头像

### 2.5 密码管理

#### 2.5.1 修改密码
```
1. 用户进入"修改密码"页面
   ↓
2. 输入信息
   - 当前密码
   - 新密码
   - 确认新密码
   ↓
3. 验证
   - 当前密码正确性
   - 新密码格式
   - 两次输入一致性
   ↓
4. 更新密码
   ↓
5. 退出当前登录（要求重新登录）
```

#### 2.5.2 忘记密码（第二阶段）
```
1. 用户点击"忘记密码"
   ↓
2. 输入注册邮箱/手机号
   ↓
3. 发送验证码
   ↓
4. 输入验证码
   ↓
5. 设置新密码
   ↓
6. 完成重置，跳转登录
```

### 2.6 用户角色与权限

#### 2.6.1 用户角色
- **学生（Student）**
  - 可以使用所有学习应用
  - 查看个人学习数据
  - 不能访问管理后台

- **教师（Teacher）**（第二阶段）
  - 查看学生学习数据
  - 布置学习任务
  - 查看班级统计

- **家长（Parent）**（第二阶段）
  - 关联子女账号
  - 查看子女学习进度
  - 接收学习报告

- **管理员（Admin）**
  - 访问管理后台
  - 管理用户
  - 管理内容（词汇库等）
  - 查看平台数据

#### 2.6.2 权限设计（第二阶段）
- [ ] 基于角色的权限控制（RBAC）
- [ ] API 权限装饰器
- [ ] 前端路由权限守卫

---

## 3. 数据模型设计

### 3.1 核心数据表

#### User（继承 Django AbstractUser）
```python
- id: BigAutoField
- username: CharField(max_length=150, unique=True)
- email: EmailField(unique=True)
- phone: CharField(max_length=11, unique=True, null=True)
- password: CharField(max_length=128)  # 加密存储
- is_active: BooleanField(default=True)
- is_staff: BooleanField(default=False)
- is_superuser: BooleanField(default=False)
- date_joined: DateTimeField(auto_now_add=True)
- last_login: DateTimeField(null=True)
```

#### UserProfile
```python
- id: BigAutoField
- user: OneToOneField(User)
- nickname: CharField(max_length=50, null=True)
- avatar: URLField(null=True)
- gender: CharField(max_length=10, choices=['male', 'female', 'other'])
- birthday: DateField(null=True)
- bio: TextField(max_length=500, null=True)
- role: CharField(max_length=20, choices=['student', 'teacher', 'parent', 'admin'])
- created_at: DateTimeField(auto_now_add=True)
- updated_at: DateTimeField(auto_now=True)
```

#### StudentProfile
```python
- id: BigAutoField
- user: OneToOneField(User)
- grade: IntegerField(choices=[(i, f'{i}年级') for i in range(1, 13)])
- school: CharField(max_length=100, null=True)
- class_name: CharField(max_length=50, null=True)
- parent_phone: CharField(max_length=11, null=True)
- created_at: DateTimeField(auto_now_add=True)
- updated_at: DateTimeField(auto_now=True)
```

### 3.2 数据关系
```
User 1───1 UserProfile
User 1───0..1 StudentProfile  (仅学生用户有)

未来扩展:
User 1───0..1 TeacherProfile
User 1───0..1 ParentProfile
```

---

## 4. API 接口设计

### 4.1 认证相关

#### 4.1.1 用户注册
```
POST /api/auth/register/

请求:
{
  "username": "student01",
  "email": "student01@example.com",
  "password": "password123",
  "confirm_password": "password123"
}

响应:
{
  "user": {
    "id": 1,
    "username": "student01",
    "email": "student01@example.com",
    "date_joined": "2026-01-10T10:00:00+08:00"
  },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}

错误响应:
{
  "username": ["用户名已存在"],
  "email": ["邮箱已被注册"],
  "password": ["密码不符合要求"]
}
```

#### 4.1.2 用户登录
```
POST /api/auth/login/

请求:
{
  "username": "student01",  // 或 email
  "password": "password123"
}

响应:
{
  "user": {
    "id": 1,
    "username": "student01",
    "email": "student01@example.com",
    "profile": {
      "nickname": "小明",
      "avatar": "https://...",
      "role": "student"
    }
  },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}

错误响应:
{
  "detail": "用户名或密码错误"
}
```

#### 4.1.3 刷新 Token
```
POST /api/auth/refresh/

请求:
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

响应:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### 4.1.4 退出登录
```
POST /api/auth/logout/

请求头:
Authorization: Bearer {access_token}

响应:
{
  "message": "成功退出登录"
}
```

### 4.2 用户信息

#### 4.2.1 获取当前用户信息
```
GET /api/users/me/

请求头:
Authorization: Bearer {access_token}

响应:
{
  "id": 1,
  "username": "student01",
  "email": "student01@example.com",
  "profile": {
    "nickname": "小明",
    "avatar": "https://...",
    "gender": "male",
    "birthday": "2010-05-15",
    "bio": "热爱学习的小学生",
    "role": "student"
  },
  "student_profile": {
    "grade": 5,
    "school": "XX小学",
    "class_name": "五年级1班"
  },
  "date_joined": "2026-01-01T10:00:00+08:00",
  "last_login": "2026-01-10T10:00:00+08:00"
}
```

#### 4.2.2 更新用户信息
```
PUT /api/users/me/
PATCH /api/users/me/  (部分更新)

请求头:
Authorization: Bearer {access_token}

请求:
{
  "profile": {
    "nickname": "小明同学",
    "gender": "male",
    "birthday": "2010-05-15",
    "bio": "热爱学习"
  },
  "student_profile": {
    "grade": 6,
    "school": "XX小学",
    "class_name": "六年级1班"
  }
}

响应:
{
  "message": "更新成功",
  "user": { 用户完整信息 }
}
```

#### 4.2.3 上传头像
```
POST /api/users/me/avatar/

请求头:
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

请求:
FormData {
  avatar: File
}

响应:
{
  "avatar_url": "https://cdn.example.com/avatars/user_1_200x200.jpg",
  "thumbnails": {
    "small": "https://cdn.example.com/avatars/user_1_100x100.jpg",
    "medium": "https://cdn.example.com/avatars/user_1_200x200.jpg"
  }
}
```

### 4.3 密码管理

#### 4.3.1 修改密码
```
POST /api/users/me/change-password/

请求头:
Authorization: Bearer {access_token}

请求:
{
  "old_password": "password123",
  "new_password": "newpassword123",
  "confirm_password": "newpassword123"
}

响应:
{
  "message": "密码修改成功，请重新登录"
}

错误响应:
{
  "old_password": ["当前密码错误"],
  "new_password": ["密码不符合要求"]
}
```

---

## 5. 前端页面设计

### 5.1 页面列表

```
认证相关页面:
├── /login          - 登录页
├── /register       - 注册页
└── /forgot-password - 忘记密码（第二阶段）

用户中心页面:
├── /profile        - 个人信息
├── /profile/edit   - 编辑资料
└── /profile/security - 安全设置（修改密码）
```

### 5.2 页面设计要点

#### 5.2.1 登录页 (/login)
- 用户名/邮箱输入框
- 密码输入框（带显示/隐藏切换）
- 记住我勾选框
- 登录按钮
- 忘记密码链接
- 注册账号链接

#### 5.2.2 注册页 (/register)
- 用户名输入框（实时验证唯一性）
- 邮箱输入框
- 密码输入框（显示强度）
- 确认密码输入框
- 注册按钮
- 已有账号？去登录链接

#### 5.2.3 个人中心 (/profile)
- 头像展示（可点击上传）
- 基础信息展示
- 学生信息展示
- 编辑资料按钮
- 修改密码按钮

#### 5.2.4 编辑资料 (/profile/edit)
- 头像上传组件
- 昵称输入框
- 性别选择
- 生日选择器
- 个人简介文本框
- 学生信息（年级、学校、班级）
- 保存按钮
- 取消按钮

---

## 6. 开发计划

### 6.1 第一阶段 - MVP（1周）

#### 后端开发（3-4天）
- [ ] **Day 1-2: 数据模型和认证**
  - 创建 User Model（继承 AbstractUser）
  - UserProfile Model
  - StudentProfile Model
  - JWT 认证配置
  - 数据库迁移

- [ ] **Day 3-4: API 开发**
  - 注册 API
  - 登录 API
  - Token 刷新 API
  - 用户信息查询 API
  - 用户信息更新 API
  - API 文档（drf-spectacular）

#### 前端开发（3-4天）
- [ ] **Day 1-2: 基础页面**
  - 登录页面
  - 注册页面
  - 路由配置
  - Axios 配置（拦截器、Token 管理）

- [ ] **Day 3-4: 用户中心**
  - 个人信息页面
  - 编辑资料页面
  - 头像上传组件
  - 状态管理（Pinia）

### 6.2 第二阶段 - 功能完善（1周）

#### 后端开发
- [ ] 密码修改 API
- [ ] 忘记密码流程
- [ ] 邮件服务集成
- [ ] 文件上传服务（头像）
- [ ] API 限流

#### 前端开发
- [ ] 修改密码页面
- [ ] 忘记密码流程
- [ ] 头像裁剪组件
- [ ] 表单验证优化
- [ ] 错误处理优化

### 6.3 第三阶段 - 增强功能（可选）

- [ ] 第三方登录（微信、QQ）
- [ ] 手机号注册/登录
- [ ] 短信验证码
- [ ] 多设备管理
- [ ] 登录日志
- [ ] 账号安全设置

---

## 7. 技术实现要点

### 7.1 后端技术要点

#### 7.1.1 用户模型设计
```python
# backend/apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """用户基础模型"""
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11, unique=True, null=True, blank=True)

    class Meta:
        db_table = 'users'
        verbose_name = '用户'
        verbose_name_plural = verbose_name

class UserProfile(models.Model):
    """用户档案"""
    ROLE_CHOICES = [
        ('student', '学生'),
        ('teacher', '教师'),
        ('parent', '家长'),
        ('admin', '管理员'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    nickname = models.CharField(max_length=50, null=True, blank=True)
    avatar = models.URLField(null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    # ...
```

#### 7.1.2 JWT 配置
```python
# backend/config/settings.py
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

### 7.2 前端技术要点

#### 7.2.1 Axios 配置
```typescript
// frontend/src/utils/request.ts
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.accessToken) {
    config.headers.Authorization = `Bearer ${userStore.accessToken}`
  }
  return config
})

// 响应拦截器（Token 自动刷新）
request.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token 过期，尝试刷新
      const userStore = useUserStore()
      await userStore.refreshToken()
      // 重试原请求
      return request(error.config)
    }
    return Promise.reject(error)
  }
)
```

#### 7.2.2 状态管理
```typescript
// frontend/src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    userInfo: null
  }),

  actions: {
    async login(credentials) {
      const res = await authAPI.login(credentials)
      this.accessToken = res.tokens.access
      this.refreshToken = res.tokens.refresh
      this.userInfo = res.user
      localStorage.setItem('refreshToken', res.tokens.refresh)
    },

    async refreshToken() {
      const res = await authAPI.refresh(this.refreshToken)
      this.accessToken = res.access
    },

    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      this.userInfo = null
      localStorage.removeItem('refreshToken')
    }
  }
})
```

---

## 8. 安全考虑

### 8.1 密码安全
- ✅ Django 默认使用 PBKDF2 算法加密
- ✅ 密码强度要求（8-20位，字母+数字）
- ✅ 密码错误次数限制

### 8.2 Token 安全
- ✅ JWT 使用 HS256 签名
- ✅ Access Token 短期有效（1天）
- ✅ Refresh Token 长期有效（7天）
- ⚠️ Token 存储在 LocalStorage（可优化为 HttpOnly Cookie）

### 8.3 数据安全
- ✅ HTTPS 传输加密
- ✅ CORS 跨域限制
- ✅ SQL 注入防护（Django ORM）
- ✅ XSS 防护（Vue 自动转义）

---

## 9. 测试计划

### 9.1 后端测试
- [ ] 单元测试
  - User Model 测试
  - API 端点测试
  - 认证流程测试
- [ ] 集成测试
  - 注册→登录→获取信息流程
  - Token 刷新流程
- [ ] 性能测试
  - 并发登录测试
  - API 响应时间测试

### 9.2 前端测试
- [ ] 组件测试（Vitest）
- [ ] E2E 测试（可选）
- [ ] 浏览器兼容性测试

---

## 10. 成功指标

### 10.1 功能指标
- ✅ 用户可以成功注册
- ✅ 用户可以使用用户名/邮箱登录
- ✅ Token 自动刷新机制正常工作
- ✅ 用户可以查看和编辑个人信息
- ✅ 密码修改功能正常

### 10.2 性能指标
- 注册/登录 API 响应时间 < 500ms
- Token 刷新响应时间 < 200ms
- 用户信息查询响应时间 < 300ms

### 10.3 安全指标
- 密码加密存储（不可逆）
- Token 过期自动刷新
- 无 SQL 注入漏洞
- 无 XSS 漏洞

---

## 附录

### A. Django App 结构
```
backend/
└── apps/
    └── users/
        ├── __init__.py
        ├── models.py           # User, UserProfile, StudentProfile
        ├── serializers.py      # 序列化器
        ├── views.py            # API 视图
        ├── urls.py             # 路由
        ├── permissions.py      # 权限类
        ├── admin.py            # Django Admin 配置
        ├── tests.py            # 测试
        └── migrations/         # 数据库迁移
```

### B. 前端目录结构
```
frontend/src/
├── views/
│   └── auth/
│       ├── LoginView.vue
│       ├── RegisterView.vue
│       └── ProfileView.vue
├── stores/
│   └── user.ts             # 用户状态管理
├── api/
│   └── auth.ts             # 认证相关 API
├── utils/
│   └── request.ts          # Axios 封装
└── router/
    └── index.ts            # 路由配置（认证守卫）
```

---

## 变更记录

| 版本 | 日期 | 修改人 | 修改内容 |
|------|------|--------|----------|
| v1.0 | 2026-01-10 | - | 初始版本，完成用户系统 PRD |
