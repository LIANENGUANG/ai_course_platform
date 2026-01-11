# AI Course Platform - 产品需求文档 (PRD)

## 文档信息
- **版本**: v1.0
- **创建日期**: 2026-01-10
- **最后更新**: 2026-01-10
- **负责人**: [待填写]
- **状态**: 草稿

---

## 1. 产品概述

### 1.1 产品愿景
打造智能化英语词汇学习平台，通过 AI 技术帮助学生高效掌握英语词汇，实现个性化、场景化的英语学习体验。

### 1.2 产品定位
面向中小学生的智能英语词汇学习平台，结合年级词汇大纲和 AI 生成技术，提供测试、诊断、强化记忆的完整学习闭环。

### 1.3 目标用户
- **主要用户**: 小学至高中阶段的学生（1-12 年级）
- **次要用户**: 家长（监督学习进度）、教师（布置词汇任务）
- **用户特点**:
  - 需要系统化学习英语词汇
  - 希望提高词汇记忆效率
  - 对个性化、趣味化学习内容有需求

### 1.4 核心价值
- **精准测试**: 基于年级词汇大纲，准确评估学生词汇掌握情况
- **智能诊断**: 自动识别薄弱词汇，建立个人词汇库
- **场景记忆**: AI 生成个性化主题句子，在真实语境中强化记忆
- **趣味学习**: 选择题形式降低学习门槛，主题定制增加学习兴趣

---

## 2. 功能需求

### 2.1 用户系统

#### 2.1.1 用户注册与登录
- [ ] 用户注册（邮箱/手机号）
- [ ] 用户登录（JWT 认证）
- [ ] 密码找回
- [ ] 年级信息设置（注册时或首次使用时）

#### 2.1.2 用户个人中心
- [ ] 个人信息管理（姓名、年级、头像）
- [ ] 年级切换（升学时）
- [ ] 学习统计查看
  - 总测试次数
  - 已掌握词汇数
  - 待复习词汇数
  - 学习时长统计
- [ ] 学习历史记录

### 2.2 词汇测试系统

#### 2.2.1 年级词汇库
- [ ] 按年级加载词汇（1-12 年级）
- [ ] 词汇库管理（管理员）
  - 导入年级词汇表
  - 编辑/删除单词
  - 添加单词释义、例句
- [ ] 词汇大纲对照（参考教育部英语课程标准）

#### 2.2.2 英汉词汇测试
- [ ] 开始测试
  - 选择年级（默认用户设置的年级）
  - 选择测试范围（全部/指定单元/自定义数量）
  - 选择测试模式（英译汉/汉译英）
- [ ] 选择题展示
  - 随机生成 4 个选项（1 个正确答案 + 3 个干扰项）
  - 支持英译汉和汉译英两种模式
  - 题目顺序随机打乱
- [ ] 答题交互
  - 单选答案
  - 支持上一题/下一题
  - 显示答题进度（如：5/20）
  - 标记不确定的题目（可选）
- [ ] 提交试卷

#### 2.2.3 智能判卷
- [ ] 自动批改
  - 统计正确/错误数量
  - 计算正确率
  - 标记错误的单词
- [ ] 成绩展示
  - 总分/正确率
  - 答题用时
  - 错题列表
  - 每个错题显示：
    - 单词
    - 正确答案
    - 学生选择的答案
- [ ] 学习建议
  - 根据正确率给出评语
  - 薄弱词汇分类

#### 2.2.4 错词本
- [ ] 自动收录测试中的错词
- [ ] 错词列表展示
  - 单词
  - 释义
  - 错误次数
  - 最后测试时间
- [ ] 错词复习
  - 针对错词再次测试
  - 标记已掌握

### 2.3 AI 智能句子生成

#### 2.3.1 主题选择
- [ ] 判卷后触发主题选择页面
- [ ] 预设主题列表
  - 日常生活
  - 校园学习
  - 运动健康
  - 科技发展
  - 旅游探险
  - 美食烹饪
  - 动物自然
  - 兴趣爱好
  - 自定义主题（用户输入）
- [ ] 可选择多个主题

#### 2.3.2 句子生成
- [ ] 基于错词生成句子
  - 每个错词生成 1-3 个句子
  - 句子难度与年级匹配
  - 句子长度适中（10-20 词）
- [ ] 主题关联
  - 句子内容与选择的主题相关
  - 自然融入错词
- [ ] 中英对照
  - 英文句子
  - 对应的中文翻译
  - 错词在句中高亮显示

#### 2.3.3 句子学习
- [ ] 句子列表展示
  - 按错词分组
  - 中英对照显示
  - 高亮目标词汇
- [ ] 朗读功能（可选）
- [ ] 收藏句子
- [ ] 导出学习材料（PDF/图片）

### 2.4 学习数据分析

#### 2.4.1 个人学习报告
- [ ] 词汇掌握度分析
  - 已掌握词汇占比
  - 待复习词汇占比
  - 完全陌生词汇占比
- [ ] 学习趋势图
  - 每日测试次数
  - 词汇量增长曲线
  - 正确率变化趋势
- [ ] 薄弱知识点分析
  - 最常出错的词汇 Top 10
  - 词汇类型分析（名词/动词/形容词等）

#### 2.4.2 学习激励
- [ ] 成就系统
  - 连续学习天数
  - 累计测试次数
  - 词汇量里程碑
- [ ] 学习排行榜（可选）
  - 年级内排名
  - 全站排名

### 2.5 管理后台

#### 2.5.1 词汇库管理
- [ ] 年级词汇表管理
  - 上传词汇表（Excel/CSV）
  - 批量编辑
  - 词汇审核
- [ ] 词汇数据统计
  - 各年级词汇数量
  - 高频错词统计

#### 2.5.2 用户管理
- [ ] 用户列表
- [ ] 用户学习数据查看
- [ ] 用户权限管理

#### 2.5.3 AI 配置
- [ ] AI 模型选择（GPT-4/Claude 等）
- [ ] 提示词模板管理
- [ ] 生成质量监控

---

## 3. 非功能需求

### 3.1 性能要求
- 页面加载时间 < 2秒
- API 响应时间 < 500ms
- 支持并发用户数: [待定]

### 3.2 安全要求
- JWT 身份认证
- HTTPS 加密传输
- SQL 注入防护
- XSS 攻击防护
- CSRF 防护

### 3.3 可用性要求
- 系统可用性 > 99%
- 支持移动端自适应

### 3.4 兼容性要求
- 浏览器: Chrome/Firefox/Safari/Edge 最新两个版本
- 移动端: iOS 13+, Android 9+

---

## 4. 技术架构

### 4.1 技术栈
- **前端**: Vue 3 + TypeScript + Vite
- **后端**: Django 5.1 + Django REST Framework
- **数据库**: PostgreSQL 17
- **认证**: JWT (djangorestframework-simplejwt)
- **部署**: [待定]

### 4.2 系统架构
[架构图待补充]

---

## 5. 数据模型设计

### 5.1 核心实体

#### 5.1.1 用户相关

**User (用户)**
- id: 主键
- username: 用户名（唯一）
- email: 邮箱（唯一）
- password: 密码（加密）
- grade: 年级（1-12）
- avatar: 头像 URL
- created_at: 注册时间
- updated_at: 更新时间

**UserProfile (用户档案)**
- id: 主键
- user: 外键 → User
- nickname: 昵称
- phone: 手机号
- total_tests: 总测试次数
- total_study_time: 累计学习时长（秒）
- consecutive_days: 连续学习天数
- last_study_date: 最后学习日期

#### 5.1.2 词汇相关

**Vocabulary (词汇)**
- id: 主键
- word: 英文单词
- translation: 中文释义
- phonetic: 音标
- grade: 适用年级（1-12）
- difficulty: 难度等级（1-5）
- word_type: 词性（名词/动词/形容词等）
- example_sentence: 例句（可选）
- created_at: 创建时间
- updated_at: 更新时间

**VocabularyUnit (词汇单元)**
- id: 主键
- grade: 年级
- unit_number: 单元号
- unit_name: 单元名称
- description: 单元描述

**VocabularyUnitItem (单元词汇关联)**
- id: 主键
- unit: 外键 → VocabularyUnit
- vocabulary: 外键 → Vocabulary
- order: 排序

#### 5.1.3 测试相关

**Test (测试记录)**
- id: 主键
- user: 外键 → User
- grade: 测试年级
- test_mode: 测试模式（en_to_zh/zh_to_en）
- total_questions: 总题数
- correct_count: 正确数量
- score: 得分
- accuracy: 正确率
- duration: 答题用时（秒）
- status: 状态（in_progress/completed）
- started_at: 开始时间
- completed_at: 完成时间

**TestQuestion (测试题目)**
- id: 主键
- test: 外键 → Test
- vocabulary: 外键 → Vocabulary
- question_type: 题目类型（en_to_zh/zh_to_en）
- options: JSON 字段（选项列表）
- correct_answer: 正确答案
- user_answer: 用户答案
- is_correct: 是否正确
- answer_time: 答题用时（秒）
- order: 题目序号

**WrongVocabulary (错词本)**
- id: 主键
- user: 外键 → User
- vocabulary: 外键 → Vocabulary
- wrong_count: 错误次数
- last_wrong_time: 最后错误时间
- is_mastered: 是否已掌握
- created_at: 首次加入时间
- updated_at: 更新时间

#### 5.1.4 AI 生成相关

**SentenceGeneration (句子生成记录)**
- id: 主键
- user: 外键 → User
- test: 外键 → Test
- theme: 主题（JSON 字段，可多个）
- custom_theme: 自定义主题
- wrong_words: 错词列表（JSON 字段）
- generated_at: 生成时间
- status: 状态（pending/completed/failed）

**GeneratedSentence (生成的句子)**
- id: 主键
- generation: 外键 → SentenceGeneration
- vocabulary: 外键 → Vocabulary
- english_sentence: 英文句子
- chinese_translation: 中文翻译
- theme: 句子主题
- is_favorited: 是否收藏
- created_at: 创建时间

**Theme (主题)**
- id: 主键
- name: 主题名称
- name_en: 英文名称
- description: 描述
- icon: 图标
- is_active: 是否启用
- order: 排序

#### 5.1.5 学习数据

**StudyRecord (学习记录)**
- id: 主键
- user: 外键 → User
- date: 学习日期
- test_count: 当日测试次数
- study_duration: 学习时长（秒）
- vocabulary_learned: 学到的新词数
- accuracy: 平均正确率

**Achievement (成就)**
- id: 主键
- user: 外键 → User
- achievement_type: 成就类型（consecutive_days/test_count/vocabulary_count）
- achievement_name: 成就名称
- description: 描述
- unlocked_at: 解锁时间

### 5.2 数据关系图

```
User 1───N UserProfile
User 1───N Test
User 1───N WrongVocabulary
User 1───N SentenceGeneration
User 1───N StudyRecord
User 1───N Achievement

Test 1───N TestQuestion
Test 1───1 SentenceGeneration

TestQuestion N───1 Vocabulary
WrongVocabulary N───1 Vocabulary

SentenceGeneration 1───N GeneratedSentence
GeneratedSentence N───1 Vocabulary

VocabularyUnit 1───N VocabularyUnitItem
VocabularyUnitItem N───1 Vocabulary
```

---

## 6. 接口设计

### 6.1 认证相关

#### 6.1.1 用户认证
```
POST /api/auth/register/
请求: { username, email, password, grade }
响应: { user, access_token, refresh_token }

POST /api/auth/login/
请求: { username/email, password }
响应: { user, access_token, refresh_token }

POST /api/auth/refresh/
请求: { refresh_token }
响应: { access_token }

POST /api/auth/logout/
请求: Header: Authorization: Bearer {token}
响应: { message }
```

#### 6.1.2 用户信息
```
GET /api/users/me/
响应: { id, username, email, grade, avatar, profile }

PUT /api/users/me/
请求: { nickname, grade, avatar }
响应: { user }

GET /api/users/me/statistics/
响应: {
  total_tests,
  mastered_words,
  wrong_words_count,
  consecutive_days,
  total_study_time
}
```

### 6.2 词汇相关

#### 6.2.1 词汇查询
```
GET /api/vocabularies/?grade={grade}&unit={unit}
响应: {
  count,
  results: [{ id, word, translation, phonetic, grade, difficulty }]
}

GET /api/vocabularies/{id}/
响应: { id, word, translation, phonetic, example_sentence, ... }

GET /api/vocabularies/grades/
响应: { grades: [{ grade, count, units }] }
```

#### 6.2.2 词汇单元
```
GET /api/vocabulary-units/?grade={grade}
响应: {
  results: [{ id, grade, unit_number, unit_name, word_count }]
}
```

### 6.3 测试相关

#### 6.3.1 开始测试
```
POST /api/tests/start/
请求: {
  grade,
  test_mode: 'en_to_zh' | 'zh_to_en',
  question_count: 20,
  unit_id: null | int  // 可选，指定单元
}
响应: {
  test_id,
  questions: [{
    id,
    vocabulary_id,
    question: '单词或中文',
    options: ['选项1', '选项2', '选项3', '选项4'],
    order
  }]
}
```

#### 6.3.2 提交答案
```
POST /api/tests/{test_id}/submit/
请求: {
  answers: [{
    question_id,
    answer: '用户选择的答案'
  }]
}
响应: {
  test_id,
  score,
  accuracy,
  correct_count,
  total_questions,
  duration,
  wrong_words: [{
    word,
    translation,
    correct_answer,
    user_answer
  }],
  suggestions: '学习建议'
}
```

#### 6.3.3 测试历史
```
GET /api/tests/history/?page={page}
响应: {
  count,
  results: [{
    id,
    grade,
    test_mode,
    score,
    accuracy,
    created_at
  }]
}

GET /api/tests/{id}/detail/
响应: {
  test 详细信息,
  questions: [包含答题详情]
}
```

### 6.4 错词本

```
GET /api/wrong-vocabularies/
响应: {
  count,
  results: [{
    id,
    vocabulary: { word, translation, phonetic },
    wrong_count,
    last_wrong_time,
    is_mastered
  }]
}

POST /api/wrong-vocabularies/{id}/mark-mastered/
请求: { is_mastered: true }
响应: { message }

POST /api/wrong-vocabularies/review-test/
请求: { count: 20 }
响应: { 生成测试，格式同 /api/tests/start/ }
```

### 6.5 AI 句子生成

#### 6.5.1 主题列表
```
GET /api/themes/
响应: {
  results: [{
    id,
    name,
    name_en,
    description,
    icon
  }]
}
```

#### 6.5.2 生成句子
```
POST /api/sentence-generation/generate/
请求: {
  test_id,
  theme_ids: [1, 2, 3],
  custom_theme: 'optional custom theme',
  sentences_per_word: 2  // 每个错词生成几个句子
}
响应: {
  generation_id,
  status: 'pending'  // 异步生成
}

GET /api/sentence-generation/{id}/
响应: {
  id,
  status: 'completed' | 'pending' | 'failed',
  sentences: [{
    vocabulary: { word, translation },
    english_sentence,
    chinese_translation,
    theme,
    is_favorited
  }]
}
```

#### 6.5.3 句子管理
```
GET /api/generated-sentences/?test_id={test_id}
响应: { 句子列表 }

POST /api/generated-sentences/{id}/favorite/
请求: { is_favorited: true }
响应: { message }

GET /api/generated-sentences/export/?generation_id={id}&format=pdf
响应: PDF 文件下载
```

### 6.6 学习数据

```
GET /api/study-records/?start_date={date}&end_date={date}
响应: {
  records: [{
    date,
    test_count,
    study_duration,
    vocabulary_learned,
    accuracy
  }],
  summary: {
    total_tests,
    avg_accuracy,
    total_duration
  }
}

GET /api/achievements/
响应: {
  unlocked: [{ type, name, description, unlocked_at }],
  locked: [{ type, name, description, requirement }]
}
```

### 6.7 管理后台

#### 6.7.1 词汇管理
```
POST /api/admin/vocabularies/import/
请求: FormData { file: Excel/CSV }
响应: { imported_count, skipped_count, errors }

POST /api/admin/vocabularies/
请求: { word, translation, phonetic, grade, ... }
响应: { vocabulary }

PUT /api/admin/vocabularies/{id}/
DELETE /api/admin/vocabularies/{id}/
```

#### 6.7.2 用户管理
```
GET /api/admin/users/?page={page}
响应: { count, results: [用户列表] }

GET /api/admin/users/{id}/statistics/
响应: { 详细的学习数据统计 }
```

[详细接口文档见 Swagger UI: http://localhost:8000/api/schema/swagger-ui/]

---

## 7. 开发计划

### 7.1 第一阶段 - MVP (最小可行产品)

**目标**: 实现核心词汇测试流程，验证产品价值
**预期时间**: 2-3 周

**核心功能**:

#### 后端开发
- [ ] 用户系统
  - [ ] 用户注册/登录（JWT 认证）
  - [ ] 用户信息管理
  - [ ] 年级设置
- [ ] 词汇系统
  - [ ] 词汇数据模型
  - [ ] 导入年级词汇表（初期手动导入测试数据）
  - [ ] 词汇查询 API
- [ ] 测试系统
  - [ ] 创建测试
  - [ ] 生成选择题（随机选项）
  - [ ] 提交答案
  - [ ] 自动判卷
  - [ ] 错词记录
- [ ] 基础 AI 集成
  - [ ] 接入 AI API（Claude/GPT-4）
  - [ ] 简单的句子生成（单个主题）

#### 前端开发
- [ ] 基础页面
  - [ ] 登录/注册页面
  - [ ] 主页（开始测试入口）
  - [ ] 个人中心（简版）
- [ ] 测试流程
  - [ ] 测试配置页（选择年级、题目数）
  - [ ] 答题页面（选择题UI）
  - [ ] 成绩页面（显示分数和错词）
- [ ] AI 句子页面
  - [ ] 主题选择
  - [ ] 生成的句子展示（中英对照）

**验收标准**:
- ✅ 用户可以注册并登录
- ✅ 用户可以选择年级进行词汇测试
- ✅ 系统能够自动判卷并记录错词
- ✅ 能够基于错词生成学习句子

### 7.2 第二阶段 - 功能完善

**目标**: 完善学习闭环，增强用户体验
**预期时间**: 3-4 周

**功能**:

#### 后端开发
- [ ] 错词本系统
  - [ ] 错词本列表
  - [ ] 错词复习测试
  - [ ] 标记已掌握
- [ ] 词汇单元系统
  - [ ] 单元划分
  - [ ] 按单元测试
- [ ] 学习数据统计
  - [ ] 学习记录
  - [ ] 数据可视化接口
- [ ] AI 优化
  - [ ] 多主题支持
  - [ ] 自定义主题
  - [ ] 句子质量优化

#### 前端开发
- [ ] 错词本
  - [ ] 错词列表
  - [ ] 错词复习
- [ ] 学习中心
  - [ ] 学习统计图表
  - [ ] 学习历史
  - [ ] 成就系统
- [ ] 交互优化
  - [ ] 答题动画
  - [ ] 进度保存
  - [ ] 键盘快捷键

**验收标准**:
- ✅ 错词本功能完整可用
- ✅ 用户可以查看详细的学习数据
- ✅ AI 生成句子支持多主题

### 7.3 第三阶段 - 高级功能

**目标**: 增加产品竞争力，提升用户粘性
**预期时间**: 4-5 周

**功能**:

#### 后端开发
- [ ] 管理后台
  - [ ] 词汇库管理
  - [ ] 批量导入
  - [ ] 用户管理
  - [ ] 数据统计
- [ ] 高级学习功能
  - [ ] 学习路径推荐
  - [ ] 智能复习提醒
  - [ ] 词汇掌握度算法优化
- [ ] 导出功能
  - [ ] 生成学习材料 PDF
  - [ ] 错词本导出

#### 前端开发
- [ ] 管理后台界面
- [ ] 学习材料导出
- [ ] 移动端适配优化
- [ ] 性能优化

#### 可选功能
- [ ] 语音朗读（TTS）
- [ ] 家长监控端
- [ ] 班级/小组功能
- [ ] 排行榜

**验收标准**:
- ✅ 管理后台功能完整
- ✅ 支持导出学习材料
- ✅ 移动端体验良好

### 7.4 开发优先级

**P0 - 核心功能（MVP 必须）**
- 用户注册登录
- 词汇测试
- 自动判卷
- 基础 AI 句子生成

**P1 - 重要功能（第二阶段）**
- 错词本
- 学习数据统计
- 多主题句子生成

**P2 - 增强功能（第三阶段）**
- 管理后台
- 导出功能
- 学习路径推荐

**P3 - 可选功能（后续迭代）**
- 语音朗读
- 家长端
- 社交功能

---

## 8. 风险与挑战

### 8.1 技术风险

#### 8.1.1 AI 生成质量
**风险**: AI 生成的句子可能不准确、不自然或不适合学生年级
**应对方案**:
- 在提示词中明确年级和难度要求
- 实施人工审核机制（初期）
- 收集用户反馈，持续优化提示词
- 设置句子质量评分系统

#### 8.1.2 AI API 成本
**风险**: AI API 调用成本可能超出预算
**应对方案**:
- 实施缓存机制，相同错词组合复用已生成的句子
- 限制单次生成的句子数量
- 考虑使用更经济的 AI 模型（如 GPT-3.5）
- 监控 API 使用情况，设置预算告警

#### 8.1.3 性能问题
**风险**: 大量用户同时测试可能导致性能瓶颈
**应对方案**:
- 数据库查询优化（索引、缓存）
- 使用 Redis 缓存热门词汇数据
- AI 句子生成采用异步任务队列（Celery）
- 负载均衡和水平扩展

### 8.2 业务风险

#### 8.2.1 词汇库数据质量
**风险**: 词汇库数据不准确、不完整或与教材不匹配
**应对方案**:
- 对接权威词汇来源（如教育部英语课程标准）
- 建立词汇审核流程
- 允许用户反馈词汇错误
- 定期更新和维护词汇库

#### 8.2.2 用户留存
**风险**: 用户新鲜感过后可能流失
**应对方案**:
- 设计成就系统和激励机制
- 每日学习提醒
- 数据可视化展示学习进步
- 社交功能（排行榜、挑战赛）

#### 8.2.3 竞品压力
**风险**: 市场上已有类似产品
**应对方案**:
- 强化 AI 个性化特色
- 提供更好的学习闭环体验
- 快速迭代，响应用户需求
- 建立用户社区

### 8.3 资源风险

#### 8.3.1 开发时间
**风险**: 功能复杂，开发时间可能超出预期
**应对方案**:
- 严格遵循 MVP 原则，先做核心功能
- 采用敏捷开发，快速迭代
- 合理分配前后端任务
- 使用成熟的技术栈减少踩坑

#### 8.3.2 词汇数据准备
**风险**: 整理全年级词汇数据工作量大
**应对方案**:
- 初期先支持 2-3 个年级作为 MVP
- 寻找现成的词汇数据源
- 开发批量导入工具
- 逐步扩展到全年级

### 8.4 合规风险

#### 8.4.1 数据隐私
**风险**: 涉及学生信息，需要保护隐私
**应对方案**:
- 严格遵守《个人信息保护法》
- 最小化收集用户信息
- 数据加密存储和传输
- 制定隐私政策并公示

#### 8.4.2 内容合规
**风险**: AI 生成内容可能包含不当内容
**应对方案**:
- 设置内容过滤机制
- 人工抽查生成内容
- 用户举报功能
- 内容审核日志

---

## 9. 成功指标

### 9.1 业务指标

#### 9.1.1 MVP 阶段（第一个月）
- **注册用户数**: 100+ 用户
- **日活跃用户**: 30+ 用户
- **测试完成率**: 70%+ （开始测试的用户中完成测试的比例）
- **AI 句子生成使用率**: 50%+ （完成测试后使用句子生成功能的比例）
- **用户留存**:
  - 次日留存率: 40%+
  - 7 日留存率: 20%+

#### 9.1.2 成长阶段（3 个月）
- **注册用户数**: 1,000+ 用户
- **日活跃用户**: 300+ 用户
- **平均每用户测试次数**: 5+ 次/周
- **错词本使用率**: 60%+
- **用户满意度**: 4.0+ 分（5 分制）
- **用户留存**:
  - 7 日留存率: 30%+
  - 30 日留存率: 15%+

#### 9.1.3 成熟阶段（6 个月）
- **注册用户数**: 10,000+ 用户
- **日活跃用户**: 2,000+ 用户
- **付费转化率**: 10%+（如果有付费功能）
- **词汇掌握效果**: 用户平均词汇量提升 20%+
- **用户推荐率**: NPS > 50

### 9.2 学习效果指标

- **平均测试正确率**: 65%+ （反映词汇难度适中）
- **错词复习后掌握率**: 80%+ （错词再次测试的正确率）
- **学习时长**: 平均 15+ 分钟/天
- **词汇量增长**: 平均每月新掌握 50+ 个单词

### 9.3 技术指标

#### 9.3.1 性能指标
- **系统可用性**: 99.5%+
- **API 响应时间**:
  - P50: < 200ms
  - P95: < 500ms
  - P99: < 1000ms
- **页面加载时间**:
  - 首屏加载: < 2s
  - 完全加载: < 3s
- **AI 句子生成时间**: < 10s（20 个错词）

#### 9.3.2 质量指标
- **错误率**: < 0.1% （服务器错误）
- **AI 生成成功率**: > 95%
- **测试数据准确性**: 100%（无判卷错误）
- **用户反馈的 Bug 数**: < 5 个/周（成熟阶段）

#### 9.3.3 成本指标
- **AI API 成本**: < ¥1/用户/月
- **服务器成本**: < ¥0.5/用户/月
- **总运营成本**: < ¥2/用户/月

### 9.4 内容质量指标

- **词汇库覆盖率**: 100%（覆盖教育部大纲）
- **词汇释义准确率**: > 99%
- **AI 句子质量评分**: 4.0+ 分（用户评分）
- **句子语法正确率**: > 98%
- **句子主题匹配度**: > 90%

---

## 10. 附录

### 10.1 核心用户流程

#### 10.1.1 新用户首次使用流程
```
1. 访问平台 → 注册账号
   ↓
2. 设置年级信息
   ↓
3. 进入主页，查看功能介绍
   ↓
4. 点击"开始测试"
   ↓
5. 选择测试配置（年级默认、题目数量、测试模式）
   ↓
6. 开始答题（20 道选择题）
   ↓
7. 提交试卷
   ↓
8. 查看成绩报告
   - 分数、正确率
   - 错词列表
   - 学习建议
   ↓
9. 【关键转化点】选择句子生成主题
   ↓
10. 查看 AI 生成的学习句子
    - 中英对照
    - 错词高亮
    - 可收藏、导出
   ↓
11. 【留存关键】加入错词本，下次复习
```

#### 10.1.2 老用户日常学习流程
```
1. 登录平台
   ↓
2. 查看学习数据（连续学习天数、词汇掌握进度）
   ↓
3. 选择学习方式：
   a) 新词测试 → 测试流程
   b) 错词复习 → 从错词本生成测试
   c) 查看历史句子 → 复习之前生成的句子
   ↓
4. 完成学习任务
   ↓
5. 获得成就奖励（如有）
```

### 10.2 页面结构

```
├── 认证页面
│   ├── 登录页 /login
│   └── 注册页 /register
│
├── 主要页面
│   ├── 首页 /
│   │   ├── 开始测试入口
│   │   ├── 学习统计概览
│   │   └── 快捷功能
│   │
│   ├── 测试流程
│   │   ├── 测试配置页 /test/config
│   │   ├── 答题页 /test/:id
│   │   └── 成绩报告页 /test/:id/result
│   │
│   ├── AI 句子生成
│   │   ├── 主题选择页 /sentences/themes
│   │   └── 句子展示页 /sentences/:generation_id
│   │
│   ├── 错词本 /wrong-words
│   │   ├── 错词列表
│   │   └── 错词复习
│   │
│   ├── 学习中心 /learning
│   │   ├── 学习统计
│   │   ├── 学习历史
│   │   └── 成就系统
│   │
│   └── 个人中心 /profile
│       ├── 个人信息
│       ├── 年级设置
│       └── 设置
│
└── 管理后台 /admin
    ├── 词汇管理
    ├── 用户管理
    └── 数据统计
```

### 10.3 技术依赖

#### 10.3.1 后端依赖
- Django 5.1.4
- djangorestframework 3.15.2
- djangorestframework-simplejwt 5.4.0
- psycopg2-binary 2.9.10
- django-cors-headers 4.6.0
- python-dotenv 1.0.1
- drf-spectacular 0.27.2
- django-extensions 3.2.3
- openai / anthropic（AI SDK，待选择）
- celery（异步任务，第二阶段）
- redis（缓存，第二阶段）

#### 10.3.2 前端依赖
- Vue 3.5.26
- Vue Router 4.6.4
- Pinia 3.0.4（状态管理）
- Axios 1.13.2
- TypeScript 5.9.3
- Vite 7.3.0
- Element Plus / Ant Design Vue（UI 组件库，待选择）
- ECharts（数据可视化，第二阶段）

### 10.4 参考资料

#### 10.4.1 词汇标准
- 《义务教育英语课程标准》（教育部，2022 年版）
- 各地区英语教材词汇表
- 剑桥少儿英语词汇

#### 10.4.2 AI 提示词参考
```
示例提示词（待优化）：

You are an English learning assistant. Generate {num} simple sentences
for a Grade {grade} student to help them memorize the word "{word}".

Requirements:
- Theme: {theme}
- Sentence length: 10-20 words
- Use simple grammar suitable for Grade {grade}
- The word "{word}" should appear naturally in the sentence
- Provide both English sentence and Chinese translation
- Make the sentence interesting and relatable to students

Format:
{
  "sentences": [
    {
      "english": "...",
      "chinese": "..."
    }
  ]
}
```

### 10.5 术语表

- **MVP**: Minimum Viable Product（最小可行产品）
- **PRD**: Product Requirements Document（产品需求文档）
- **API**: Application Programming Interface（应用程序接口）
- **JWT**: JSON Web Token（JSON 网络令牌）
- **TTS**: Text-to-Speech（文本转语音）
- **NPS**: Net Promoter Score（净推荐值）
- **DAU**: Daily Active Users（日活跃用户）
- **错词本**: 记录用户测试中答错单词的功能模块
- **年级词汇**: 按照年级划分的词汇集合

---

## 变更记录

| 版本 | 日期 | 修改人 | 修改内容 |
|------|------|--------|----------|
| v1.0 | 2026-01-10 | - | 初始版本，完成英语词汇学习平台 PRD |
