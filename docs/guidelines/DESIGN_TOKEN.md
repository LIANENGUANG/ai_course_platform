# Design Token 使用指南

本项目使用 Ant Design 5.x 的 Design Token 系统来管理所有样式，确保设计一致性和主题自动适配。

## 什么是 Design Token？

Design Token 是一套预定义的设计变量，包括颜色、间距、字体大小、边框等。使用 Design Token 可以：

- ✅ **自动适配主题**：浅色/深色模式自动切换
- ✅ **设计一致性**：全局统一的设计规范
- ✅ **易于维护**：修改设计只需调整一处
- ✅ **类型安全**：TypeScript 完整支持

## 如何使用 Design Token

### 1. 导入并获取 Token

```typescript
import { theme } from 'antd';

const MyComponent: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div style={{
      background: token.colorBgContainer,
      padding: token.paddingLG
    }}>
      内容
    </div>
  );
};
```

## 常用 Design Token 速查表

### 颜色类 Token

#### 背景色
```typescript
token.colorBgContainer       // 容器背景（白色/深色）
token.colorBgElevated        // 浮层背景（Modal、Dropdown）
token.colorBgLayout          // 布局背景（通常比容器稍深/浅）
token.colorBgBase            // 基础背景色
token.colorBgSpotlight       // 聚光灯背景（强调区域）
```

#### 文本色
```typescript
token.colorText              // 主文本色
token.colorTextSecondary     // 次要文本色（更浅）
token.colorTextTertiary      // 第三级文本色（更更浅）
token.colorTextQuaternary    // 第四级文本色（最浅）
token.colorTextDisabled      // 禁用文本色
```

#### 边框色
```typescript
token.colorBorder            // 普通边框色
token.colorBorderSecondary   // 次级边框色（更浅）
token.colorBorderBg          // 背景边框色
```

#### 主题色
```typescript
token.colorPrimary           // 主题色（蓝色）
token.colorPrimaryBg         // 主题色背景（浅蓝）
token.colorPrimaryBorder     // 主题色边框
token.colorPrimaryHover      // 主题色悬停态
token.colorPrimaryActive     // 主题色激活态

token.colorSuccess           // 成功色（绿色）
token.colorWarning           // 警告色（橙色）
token.colorError             // 错误色（红色）
token.colorInfo              // 信息色（蓝色）
```

### 间距类 Token

#### Padding（内边距）
```typescript
token.paddingXXS             // 4px  - 超超小
token.paddingXS              // 8px  - 超小
token.paddingSM              // 12px - 小
token.padding                // 16px - 标准 ⭐ 最常用
token.paddingMD              // 20px - 中等
token.paddingLG              // 24px - 大 ⭐ 常用
token.paddingXL              // 32px - 超大
```

#### Margin（外边距）
```typescript
token.marginXXS              // 4px  - 超超小
token.marginXS               // 8px  - 超小
token.marginSM               // 12px - 小
token.margin                 // 16px - 标准 ⭐ 最常用
token.marginMD               // 20px - 中等
token.marginLG               // 24px - 大 ⭐ 常用
token.marginXL               // 32px - 超大
```

### 字体类 Token

#### 字体大小
```typescript
token.fontSizeSM             // 12px - 小
token.fontSize               // 14px - 标准 ⭐
token.fontSizeLG             // 16px - 大 ⭐
token.fontSizeXL             // 20px - 超大
token.fontSizeHeading1       // 38px - 一级标题
token.fontSizeHeading2       // 30px - 二级标题
token.fontSizeHeading3       // 24px - 三级标题
token.fontSizeHeading4       // 20px - 四级标题
token.fontSizeHeading5       // 16px - 五级标题
```

#### 行高
```typescript
token.lineHeight             // 1.5714 - 标准行高
token.lineHeightSM           // 1.66   - 小行高
token.lineHeightLG           // 1.5    - 大行高
token.lineHeightHeading1     // 1.21   - 一级标题行高
```

### 尺寸类 Token

```typescript
token.size                   // 32px - 标准控件高度
token.sizeSM                 // 24px - 小控件高度
token.sizeLG                 // 40px - 大控件高度
token.sizeXL                 // 48px - 超大控件高度
token.sizeXXL                // 64px - 超超大（如 Header 高度）

token.sizeStep               // 4px  - 基础步进单位
token.sizeUnit               // 4px  - 尺寸单位
```

### 边框类 Token

```typescript
token.lineWidth              // 1px  - 标准边框宽度
token.lineWidthBold          // 2px  - 粗边框宽度
token.lineType               // 'solid' - 边框类型

token.borderRadius           // 6px  - 标准圆角
token.borderRadiusLG         // 8px  - 大圆角
token.borderRadiusSM         // 4px  - 小圆角
token.borderRadiusXS         // 2px  - 超小圆角
```

### 阴影类 Token

```typescript
token.boxShadow              // 基础阴影
token.boxShadowSecondary     // 次级阴影
```

## 实际使用示例

### 示例 1: 页面容器

```typescript
import { theme } from 'antd';

const MyPage: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div style={{
      background: token.colorBgLayout,
      minHeight: '100vh',
      padding: token.paddingLG,
    }}>
      <div style={{
        background: token.colorBgContainer,
        borderRadius: token.borderRadius,
        padding: token.paddingLG,
        boxShadow: token.boxShadow,
      }}>
        内容区域
      </div>
    </div>
  );
};
```

### 示例 2: 自定义 Header

```typescript
import { Layout, theme } from 'antd';

const { Header } = Layout;

const MyHeader: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Header style={{
      background: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
      padding: `0 ${token.paddingLG}px`,
      height: token.sizeXXL,
      display: 'flex',
      alignItems: 'center',
    }}>
      <h1 style={{
        margin: 0,
        fontSize: token.fontSizeLG,
        color: token.colorText,
      }}>
        我的应用
      </h1>
    </Header>
  );
};
```

### 示例 3: 卡片组件

```typescript
import { theme } from 'antd';

const CustomCard: React.FC = ({ children }) => {
  const { token } = theme.useToken();

  return (
    <div style={{
      background: token.colorBgContainer,
      border: `${token.lineWidth}px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      padding: token.paddingLG,
      marginBottom: token.marginLG,
    }}>
      {children}
    </div>
  );
};
```

### 示例 4: 文本样式

```typescript
import { theme } from 'antd';

const TextExample: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div>
      <h1 style={{
        fontSize: token.fontSizeHeading1,
        color: token.colorText,
        marginBottom: token.marginLG,
      }}>
        主标题
      </h1>

      <p style={{
        fontSize: token.fontSize,
        color: token.colorText,
        lineHeight: token.lineHeight,
        marginBottom: token.margin,
      }}>
        正文内容
      </p>

      <p style={{
        fontSize: token.fontSizeSM,
        color: token.colorTextSecondary,
      }}>
        次要信息
      </p>
    </div>
  );
};
```

## 编码规范

### ✅ 推荐做法

```typescript
// ✅ 使用 Design Token
const { token } = theme.useToken();
<div style={{ padding: token.paddingLG, color: token.colorText }} />

// ✅ 0 值直接使用数字
<div style={{ padding: 0, margin: 0 }} />

// ✅ Token 与 0 混用
<div style={{ padding: `${token.paddingLG}px 0` }} />

// ✅ Ant Design 组件会自动使用 Token
<Card>内容</Card>
<Button type="primary">按钮</Button>
<Typography.Text>文本</Typography.Text>
```

### ❌ 避免做法

```typescript
// ❌ 不要硬编码颜色值
<div style={{ background: '#ffffff', color: '#000000' }} />

// ❌ 不要硬编码间距（除了 0）
<div style={{ padding: 24, margin: 16 }} />

// ❌ 不要硬编码字体大小
<h1 style={{ fontSize: 16 }} />

// ❌ 不要使用条件判断主题
<div style={{
  background: mode === 'dark' ? '#141414' : '#ffffff'
}} />

// ❌ 不要尝试使用不存在的 0 值 token
<div style={{ padding: token.paddingNone }} />   // ❌ 不存在
<div style={{ margin: token.spacing0 }} />       // ❌ 不存在
```

### 正确替代方案

```typescript
// ✅ 使用 Token 替代硬编码
const { token } = theme.useToken();

<div style={{
  background: token.colorBgContainer,
  color: token.colorText,
  padding: token.paddingLG,
  margin: token.margin,
  fontSize: token.fontSizeLG,
}} />
```

## 特殊场景处理

### 使用 0 值（零间距）

**重要：Design Token 系统中没有表示 0 值的 token**（如 `token.paddingNone` 或 `token.spacing0`），因为：

1. **0 是语义化的"无间距"** - 不是设计规范的一部分
2. **0 在所有主题下都是 0** - 不需要动态变化
3. **直接使用数字 `0` 更清晰** - 表示"取消间距"的意图

```typescript
// ✅ 正确：直接使用 0
<div style={{ padding: 0, margin: 0 }}>

// ✅ 可以与 Token 混用
<div style={{ padding: `${token.paddingLG}px 0` }}>  // 上下 24px，左右 0
<div style={{ margin: `0 ${token.margin}px` }}>      // 上下 0，左右 16px

// ❌ 错误：不存在这样的 token
<div style={{ padding: token.paddingNone }}>  // ❌ 不存在
<div style={{ margin: token.spacing0 }}>      // ❌ 不存在
```

**何时使用 0 值：**
- 需要移除默认间距时
- 需要精确控制某一方向的间距时
- 需要让内容紧贴容器边缘时

### 需要组合多个值

```typescript
// 组合边框
borderBottom: `${token.lineWidth}px solid ${token.colorBorderSecondary}`

// 组合内边距（上下不同）
padding: `${token.paddingSM}px ${token.paddingLG}px`

// 组合高度计算
height: `calc(100vh - ${token.sizeXXL}px)`
```

### 需要动态计算

```typescript
// 使用 Token 进行计算
gap: token.margin * 2
padding: `0 ${token.paddingLG}px ${token.paddingLG}px`
```

## 主题模式切换

### 在 App 组件中配置

```typescript
import { ConfigProvider, theme } from 'antd';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { mode } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* 应用内容 */}
    </ConfigProvider>
  );
}
```

所有使用 Design Token 的组件会自动适配主题，无需额外处理！

## 自定义主题

如果需要自定义主题颜色或间距，可以在 ConfigProvider 中配置：

```typescript
<ConfigProvider
  theme={{
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // 自定义主题色
      colorPrimary: '#00b96b',

      // 自定义间距
      paddingLG: 32,

      // 自定义圆角
      borderRadius: 8,

      // 自定义字体
      fontSize: 16,
    },
  }}
>
  {/* 应用内容 */}
</ConfigProvider>
```

## 迁移检查清单

从硬编码迁移到 Design Token 时，检查以下项：

- [ ] 所有颜色值（`#hex`, `rgb()`, `rgba()`）替换为 `token.color*`
- [ ] 所有间距值（`padding`, `margin`）替换为 `token.padding*` 或 `token.margin*`
- [ ] 所有字体大小替换为 `token.fontSize*`
- [ ] 所有边框替换为 `token.lineWidth` 和 `token.colorBorder*`
- [ ] 删除主题模式的条件判断（`mode === 'dark' ? ... : ...`）
- [ ] 使用 Ant Design 组件替代自定义样式

## 常见问题

### Q: 所有样式都必须使用 Token 吗？

A: 布局相关的样式（`display`, `flex`, `position` 等）不需要使用 Token，但涉及颜色、间距、字体的样式应该使用 Token。

### Q: Token 值在不同主题下会变化吗？

A: 是的！颜色类 Token（如 `colorBgContainer`、`colorText`）会根据主题自动变化，但间距、字体大小等在不同主题下通常保持一致。

### Q: 可以直接使用数字吗？

A: 对于 `flex: 1`、`zIndex: 1000` 这类不涉及设计规范的值可以直接使用数字，但间距、颜色、字体必须使用 Token。

### Q: 如何表示 0 间距？

A: **直接使用数字 `0`**，不要使用 token。Design Token 系统中没有 `token.paddingNone` 或 `token.spacing0` 这样的值。例如：`padding: 0` 或 `margin: 0`。

### Q: 如何查看所有可用的 Token？

A: 在组件中打印 `console.log(token)` 可以查看所有可用的 Token 及其值。

## 总结

- 🎨 **统一使用 Design Token** 确保设计一致性
- 🌓 **自动主题切换** 无需手动处理浅色/深色模式
- 📏 **遵循设计规范** 使用标准的间距、颜色、字体
- 🚫 **避免硬编码** 不使用魔法数字和固定颜色值
- ✨ **优先使用 Ant Design 组件** 它们已经内置了 Token 支持

遵循本指南，让我们的代码更加规范、易维护！
