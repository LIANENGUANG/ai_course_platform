# 图标使用指南

本项目使用 **Lucide React** 作为图标库，提供现代、简洁、一致的图标设计。

## 为什么选择 Lucide React？

- ✅ **现代设计** - 2026 年最流行的图标库
- ✅ **轻量级** - Tree-shakable，仅打包使用的图标
- ✅ **一致性** - 所有图标设计风格统一
- ✅ **灵活性** - 易于自定义大小、颜色、粗细
- ✅ **TypeScript** - 完整的类型支持
- ✅ **深色模式** - 完美支持主题切换

## 安装

```bash
npm install lucide-react
```

## 基础用法

### 1. 导入图标

```typescript
import { Home, User, Settings } from 'lucide-react';
```

### 2. 使用图标

```tsx
// 基础使用
<Home />

// 自定义大小
<Home size={24} />

// 自定义颜色
<Home color="#1890ff" />

// 自定义粗细
<Home strokeWidth={2} />

// 组合属性
<Home size={20} color="#1890ff" strokeWidth={1.5} />
```

## 尺寸规范

根据使用场景，我们定义了统一的图标尺寸：

| 场景 | 尺寸 | 示例 |
|------|------|------|
| 一级菜单 | 18px | 侧边栏主菜单 |
| 二级菜单 | 16px | 侧边栏子菜单 |
| 下拉菜单 | 16px | 用户下拉菜单 |
| 按钮图标 | 16-18px | 操作按钮 |
| 开关/Switch | 14px | 主题切换开关 |
| 大图标 | 24-32px | 空状态、引导页 |

## 常用图标速查

### 导航类
```tsx
import {
  Home,           // 首页
  BookOpen,       // 课程
  GraduationCap,  // 学习
  User,           // 用户/个人
  Settings,       // 设置
} from 'lucide-react';
```

### 操作类
```tsx
import {
  LogOut,         // 退出
  Edit,           // 编辑
  Trash2,         // 删除
  Save,           // 保存
  X,              // 关闭
  Check,          // 确认
  Plus,           // 添加
  Minus,          // 减少
} from 'lucide-react';
```

### 内容类
```tsx
import {
  Video,          // 视频
  FileText,       // 文档/笔记
  Image,          // 图片
  Download,       // 下载
  Upload,         // 上传
  File,           // 文件
  Folder,         // 文件夹
} from 'lucide-react';
```

### 状态类
```tsx
import {
  CheckCircle,    // 成功/完成
  XCircle,        // 失败/错误
  AlertCircle,    // 警告
  Info,           // 信息
  Clock,          // 等待/时间
  Calendar,       // 日历/日期
} from 'lucide-react';
```

### 社交类
```tsx
import {
  MessageSquare,  // 消息/讨论
  Heart,          // 喜欢
  Share2,         // 分享
  Bell,           // 通知
  Mail,           // 邮件
} from 'lucide-react';
```

### 学习相关
```tsx
import {
  Trophy,         // 成就/考试
  Award,          // 奖励/证书
  ClipboardList,  // 作业
  History,        // 历史记录
  HelpCircle,     // 帮助/问答
} from 'lucide-react';
```

## 在菜单中使用

### Ant Design Menu

```tsx
import { Menu } from 'antd';
import { Home, BookOpen, User } from 'lucide-react';

const menuItems = [
  {
    key: 'home',
    icon: <Home size={18} />,
    label: '首页',
  },
  {
    key: 'courses',
    icon: <BookOpen size={18} />,
    label: '我的课程',
  },
  {
    key: 'profile',
    icon: <User size={18} />,
    label: '个人中心',
    children: [
      {
        key: 'profile-info',
        icon: <User size={16} />,
        label: '个人信息',
      },
      {
        key: 'settings',
        icon: <Settings size={16} />,
        label: '账号设置',
      },
    ],
  },
];

<Menu items={menuItems} />
```

## 主题适配

Lucide 图标会自动继承当前文本颜色，完美适配深色/浅色模式：

```tsx
// ✅ 自动适配 - 图标颜色跟随文本颜色
<Home size={20} />

// ✅ 使用 Design Token
const { token } = theme.useToken();
<Home size={20} color={token.colorPrimary} />

// ❌ 避免硬编码颜色
<Home size={20} color="#1890ff" />
```

## 项目中的图标映射

当前项目中使用的图标映射表：

| 功能 | 图标 | 组件名 |
|------|------|--------|
| 首页 | 🏠 | `Home` |
| 我的课程 | 📖 | `BookOpen` |
| 学习中心 | 🎓 | `GraduationCap` |
| 视频课程 | 🎥 | `Video` |
| 直播课程 | 📻 | `Radio` |
| 线下课程 | 📅 | `Calendar` |
| 学习历史 | 🕒 | `History` |
| 我的笔记 | 📝 | `FileText` |
| 作业管理 | 📋 | `ClipboardList` |
| 待完成 | ☑️ | `CheckSquare` |
| 已提交 | ✅ | `FileCheck` |
| 已批改 | 🏆 | `Award` |
| 考试中心 | 🏆 | `Trophy` |
| 证书管理 | 🎖️ | `Award` |
| 社区交流 | 💬 | `MessageSquare` |
| 问答 | ❓ | `HelpCircle` |
| 活动 | ⚡ | `Zap` |
| 资源库 | 📁 | `FileType` |
| 下载中心 | ⬇️ | `Download` |
| 个人中心 | 👤 | `User` |
| 设置 | ⚙️ | `Settings` |
| 退出登录 | 🚪 | `LogOut` |
| 主题切换 | 💡 | `Lightbulb` |

## 最佳实践

### ✅ 推荐做法

```tsx
// ✅ 统一尺寸
<Home size={18} />

// ✅ 使用 token 颜色
<Home color={token.colorPrimary} />

// ✅ 语义化命名
import { LogOut as SignOutIcon } from 'lucide-react';

// ✅ Tree-shaking - 只导入需要的图标
import { Home, User } from 'lucide-react';
```

### ❌ 避免做法

```tsx
// ❌ 不要硬编码颜色
<Home color="#1890ff" />

// ❌ 不要使用不一致的尺寸
<Home size={19} />  // 应该用 16, 18, 20, 24 等标准尺寸

// ❌ 不要全量导入
import * as Icons from 'lucide-react';  // 会增加 bundle 大小

// ❌ 不要混用不同图标库
import { HomeOutlined } from '@ant-design/icons';  // 已废弃
```

## 查找图标

### 官方网站
- **Lucide 图标库**: https://lucide.dev/icons/
- 搜索你需要的图标
- 复制组件名称直接使用

### 常用搜索关键词
- `home` - 首页相关
- `user` - 用户相关
- `settings` - 设置相关
- `file` - 文件相关
- `arrow` - 箭头相关
- `check` - 确认相关
- `x` / `close` - 关闭相关

## 性能优化

### Tree-shaking

Lucide React 支持 Tree-shaking，只打包使用的图标：

```tsx
// ✅ 只打包 Home 和 User
import { Home, User } from 'lucide-react';

// 最终 bundle: ~2KB (gzipped)
```

### 懒加载

对于很少使用的图标，可以考虑懒加载：

```tsx
import { lazy, Suspense } from 'react';

const RareIcon = lazy(() =>
  import('lucide-react').then(mod => ({ default: mod.Sparkles }))
);

<Suspense fallback={<div />}>
  <RareIcon />
</Suspense>
```

## 自定义图标

如果需要项目特有的图标，可以使用 SVG：

```tsx
const CustomIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* SVG 路径 */}
  </svg>
);
```

## 迁移指南

从 Ant Design Icons 迁移到 Lucide React：

| Ant Design | Lucide React |
|------------|--------------|
| `<HomeOutlined />` | `<Home size={18} />` |
| `<UserOutlined />` | `<User size={18} />` |
| `<SettingOutlined />` | `<Settings size={18} />` |
| `<LogoutOutlined />` | `<LogOut size={18} />` |
| `<BookOutlined />` | `<BookOpen size={18} />` |
| `<BulbOutlined />` | `<Lightbulb size={18} />` |

## 总结

- 🎨 **统一使用 Lucide React** 确保图标一致性
- 📏 **遵循尺寸规范** 使用标准尺寸（14, 16, 18, 20, 24px）
- 🌓 **自动主题适配** 图标颜色跟随文本颜色
- 🚀 **Tree-shaking** 只打包使用的图标
- 📚 **语义化** 选择合适的图标表达功能

遵循本指南，让项目的图标更加现代、统一、易维护！
