# API 文档 (RESTful)

本项目采用完全 RESTful 风格的 API 设计。

## 基础信息

- **基础 URL**: `http://localhost:8000/api/`
- **认证方式**: JWT (JSON Web Token)
- **请求格式**: JSON
- **响应格式**: JSON

## 认证相关 API

### 1. 创建会话 (登录)

**POST** `/api/auth/sessions/`

创建一个新的用户会话，获取访问令牌。

**请求体**:
```json
{
  "username": "testuser",  // 用户名或邮箱
  "password": "testuser"
}
```

**响应** (200 OK):
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "profile": {
      "nickname": "测试用户",
      "avatar": "",
      "gender": "male",
      "birthday": null,
      "bio": "",
      "role": "student"
    }
  },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "message": "登录成功"
}
```

### 2. 删除会话 (登出)

**DELETE** `/api/auth/sessions/`

删除当前会话，使刷新令牌失效。

**请求头**:
```
Authorization: Bearer <access_token>
```

**请求体**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**响应** (200 OK):
```json
{
  "message": "退出登录成功"
}
```

### 3. 刷新令牌

**POST** `/api/auth/token/refresh/`

使用刷新令牌获取新的访问令牌。

**请求体**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**响应** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

## 用户相关 API

### 4. 创建用户 (注册)

**POST** `/api/users/`

创建一个新用户账户。

**请求体**:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword",
  "password_confirm": "securepassword",
  "nickname": "新用户"  // 可选
}
```

**响应** (201 Created):
```json
{
  "user": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com",
    "profile": {
      "nickname": "新用户",
      "avatar": "",
      "gender": "male",
      "birthday": null,
      "bio": "",
      "role": "student"
    }
  },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "message": "注册成功"
}
```

### 5. 获取当前用户

**GET** `/api/users/me/`

获取当前登录用户的信息。

**请求头**:
```
Authorization: Bearer <access_token>
```

**响应** (200 OK):
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "profile": {
    "nickname": "测试用户",
    "avatar": "",
    "gender": "male",
    "birthday": null,
    "bio": "",
    "role": "student"
  }
}
```

### 6. 部分更新当前用户

**PATCH** `/api/users/me/`

部分更新当前登录用户的个人信息（只更新提供的字段）。

**请求头**:
```
Authorization: Bearer <access_token>
```

**请求体** (所有字段都是可选的):
```json
{
  "nickname": "新昵称",
  "avatar": "https://example.com/avatar.jpg",
  "gender": "female",
  "birthday": "1990-01-01",
  "bio": "这是我的个人简介"
}
```

**响应** (200 OK):
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "profile": {
    "nickname": "新昵称",
    "avatar": "https://example.com/avatar.jpg",
    "gender": "female",
    "birthday": "1990-01-01",
    "bio": "这是我的个人简介",
    "role": "student"
  }
}
```

### 7. 完整更新当前用户

**PUT** `/api/users/me/`

完整更新当前登录用户的个人信息（需要提供所有字段）。

**请求头**:
```
Authorization: Bearer <access_token>
```

**请求体** (需要提供所有字段):
```json
{
  "nickname": "完整昵称",
  "avatar": "https://example.com/avatar.jpg",
  "gender": "other",
  "birthday": "1990-01-01",
  "bio": "完整的个人简介"
}
```

**响应** (200 OK):
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "profile": {
    "nickname": "完整昵称",
    "avatar": "https://example.com/avatar.jpg",
    "gender": "other",
    "birthday": "1990-01-01",
    "bio": "完整的个人简介",
    "role": "student"
  }
}
```

### 8. 更新密码

**PUT** `/api/users/me/password/`

更新当前登录用户的密码。

**请求头**:
```
Authorization: Bearer <access_token>
```

**请求体**:
```json
{
  "old_password": "oldpassword",
  "new_password": "newpassword"
}
```

**响应** (200 OK):
```json
{
  "message": "密码修改成功，请重新登录"
}
```

## HTTP 状态码

- `200 OK`: 请求成功
- `201 Created`: 资源创建成功
- `400 Bad Request`: 请求参数错误
- `401 Unauthorized`: 未认证或认证失败
- `403 Forbidden`: 无权限访问
- `404 Not Found`: 资源不存在
- `500 Internal Server Error`: 服务器内部错误

## RESTful 设计原则

本 API 遵循以下 RESTful 设计原则：

1. **资源导向**: URL 使用名词表示资源（如 `users`, `sessions`）
2. **HTTP 方法语义化**:
   - `GET`: 获取资源
   - `POST`: 创建资源
   - `PUT`: 完整更新资源
   - `PATCH`: 部分更新资源
   - `DELETE`: 删除资源
3. **无状态**: 每个请求包含所有必需信息（通过 JWT token）
4. **统一接口**: 一致的 URL 结构和响应格式
5. **分层系统**: 客户端无需了解中间层（缓存、负载均衡等）

## 示例：前端 Axios 调用

```typescript
// 登录
const response = await axios.post('/api/auth/sessions/', {
  username: 'testuser',
  password: 'testuser'
});

// 获取当前用户
const user = await axios.get('/api/users/me/', {
  headers: { Authorization: `Bearer ${accessToken}` }
});

// 更新个人信息
const updated = await axios.patch('/api/users/me/', {
  nickname: '新昵称'
}, {
  headers: { Authorization: `Bearer ${accessToken}` }
});

// 修改密码
await axios.put('/api/users/me/password/', {
  old_password: 'old',
  new_password: 'new'
}, {
  headers: { Authorization: `Bearer ${accessToken}` }
});

// 登出
await axios.delete('/api/auth/sessions/', {
  data: { refresh: refreshToken },
  headers: { Authorization: `Bearer ${accessToken}` }
});
```
