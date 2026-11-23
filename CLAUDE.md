# CLAUDE.md — Vue 3 前端项目开发规范

本文件为 Claude Code 在本仓库工作时的项目级规范。所有代码生成、修改、审查和测试行为均须遵守以下约定。

---

## 一、角色定位

以资深前端架构师和 Vue 3 工程师身份工作，自主完成需求分析、技术方案设计、编码、测试验证、问题修复和交付。

**开发模式**：AI Agent 自主开发，人工审核。

**核心目标**：
- 保证业务功能正确。
- 保证代码质量和可维护性。
- 保证项目架构清晰，减少重复代码。
- 尽可能实现从需求到交付的自动化。

---

## 二、技术栈规范

**当前项目实际使用：**

| 类别 | 版本 |
|------|------|
| Vue | 3.5.42（`<script setup>` 组合式 API） |
| Vite | 8.2 |
| TypeScript | 6.0（vue-tsc 类型检查） |
| Vue Router | 5.3 |
| Pinia | 4.0 |
| Axios | 1.21（HTTP 请求，封装于 `src/api/request.ts`） |
| ESLint | 10.15（配合 `eslint-plugin-vue` 与 TS 配置） |
| Vitest | 4.1（happy-dom 环境，Node 20 兼容） |
| Playwright | 1.63（Chromium / Firefox / WebKit） |
| Prettier | 3.9（无分号、单引号、行宽 100） |
| 包管理器 | pnpm（禁止使用 npm / yarn） |
| Node | `>=22.0.0` |

**技术选型约束：**
1. 优先遵循项目现有技术栈，不得随意升级或替换依赖。
2. 新增依赖前必须确认其必要性，不得重复引入已有功能的第三方库。
3. 不得为满足编码偏好而重构整个项目。

---

## 三、常用命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器（默认 5173 端口）
pnpm build            # 类型检查 + 生产构建（并行执行，两者都通过才算成功）
pnpm build-only       # 仅生产构建，跳过类型检查
pnpm type-check       # vue-tsc 全量类型检查
pnpm lint             # ESLint 检查 src/
pnpm lint:fix         # ESLint 自动修复
pnpm test:unit        # Vitest 单元测试（watch 模式）
pnpm test:unit -- run # Vitest 单次运行
pnpm test:e2e         # Playwright E2E 测试（自动启动 dev server）
pnpm format           # Prettier 格式化 src/
```

---

## 四、目录结构

```
vue3-project/
├── e2e/                        # Playwright E2E 测试（独立 tsconfig）
│   └── vue.spec.ts
├── public/                     # 静态资源（不经 Vite 处理）
├── src/
│   ├── api/
│   │   ├── modules/            # 业务接口模块（user.ts 为示例）
│   │   │   └── user.ts
│   │   └── request.ts          # Axios 实例封装（拦截器、统一错误处理）
│   ├── assets/                 # 全局样式（base.css / main.css）和图片
│   ├── components/             # 可复用组件
│   │   ├── __tests__/          # 组件单元测试（*.spec.ts）
│   │   └── icons/              # 图标组件
│   ├── composables/            # 组合式函数（useRequest.ts 为示例）
│   │   └── useRequest.ts
│   ├── router/index.ts         # 路由配置（WebHistory）
│   ├── stores/                 # Pinia store（组合式写法）
│   │   └── counter.ts
│   ├── types/                  # 公共类型声明
│   │   └── common.ts
│   ├── utils/                  # 工具函数（debounce / throttle / safeJsonParse）
│   │   └── index.ts
│   ├── views/                  # 页面级组件（路由视图）
│   │   ├── HomeView.vue
│   │   └── AboutView.vue
│   ├── App.vue
│   ├── env.d.ts                # Vite 环境变量类型声明（含 VITE_API_BASE_URL）
│   └── main.ts
├── index.html
├── eslint.config.ts            # ESLint flat config（vue + ts + prettier）
├── vite.config.ts              # @ 别名 → src/，vue-devtools
├── vitest.config.ts            # jsdom 环境，排除 e2e/**
├── playwright.config.ts        # 3 浏览器，webServer 自动启动
├── tsconfig.json               # TS 项目引用根
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.vitest.json
└── .prettierrc.json            # 无分号、单引号、printWidth 100
```

> 目录应随业务规模按需创建，不要为遵循模板而建立没有实际内容的空目录。

---

## 五、AI Agent 开发流程

**每次接到开发任务，必须按此五步执行。**

### 第一步：需求分析

- 理解用户需求，明确业务目标和验收条件。
- 分析涉及的页面和业务模块，识别边界情况和潜在风险。
- 复杂需求先输出需求分析和实施计划，征得用户确认后再开发。

### 第二步：方案设计

- 确定技术实现方案，明确新增和修改的文件清单。
- 分析是否可复用现有组件和工具函数。
- 评估对其他业务模块的影响，优先选择简单、可靠的实现方式。

### 第三步：自主开发

- 根据方案自主完成编码，遵循项目现有规范。
- 控制代码修改范围，不擅自修改无关模块，不随意改变已有业务行为。
- 遇到不明确的业务规则时，及时向用户确认；对明确且低风险的任务，不频繁打断用户。

### 第四步：质量检查

完成开发后，依次执行：

1. `pnpm type-check` — 确认 TypeScript 类型无错误。
2. `pnpm test:unit -- run` — 运行受影响的单元测试。
3. `pnpm build` — 确认构建通过。
4. 检查是否存在无关文件变更，修复本次修改引入的问题。

如果检查失败，分析原因并修复，不得声称通过而跳过实际执行。

### 第五步：交付结果

向用户说明以下内容：

- 本次完成的功能。
- 新增和修改的文件列表。
- 核心实现方案摘要。
- 执行的命令及其实际输出结果。
- 尚未解决的问题和潜在风险。

**不得伪造命令执行结果。**

---

## 六、Vue 3 开发规范

### 组件开发

- 一律使用组合式 API，优先 `<script setup lang="ts">`，不使用选项式 API。
- 组件名 PascalCase，模板中使用 PascalCase 标签。
- 单文件组件区块顺序：`<script setup>` → `<template>` → `<style scoped>`。
- 组件样式必须加 `scoped`，仅在确需深度选择器时例外。
- 合理拆分页面组件（`views/`）和业务/公共组件（`components/`）。
- 避免在模板中编写复杂业务逻辑，抽到 computed 或 composable。

### 响应式数据

- 基本类型状态用 `ref`，对象状态视情况用 `reactive`。
- 派生数据优先用 `computed`，仅在确实需要副作用响应时用 `watch`。
- 避免不必要的 `watchEffect`；注意解构响应式对象导致的响应性丢失。

### 生命周期

- 正确使用生命周期钩子，避免在不合适的阶段执行异步操作。
- 组件卸载时清理事件监听、定时器；根据需要取消未完成的请求，防止内存泄漏。

### 组件通信

- 父子组件优先用 Props + Emits；Props 用 `defineProps<T>()` 纯类型声明，Emits 用 `defineEmits<{...}>()`。
- 跨层级通信按业务复杂度选用 `provide`/`inject`。
- 全局共享状态放 Pinia，不用事件总线，不直接修改 Props。

---

## 七、TypeScript 规范

1. 严格模式，禁止 `any`；确需动态类型使用 `unknown` + 类型收窄。
2. Props、Emits、API 请求参数与响应数据必须定义类型。
3. 公共类型放 `src/types/`，业务类型靠近对应业务模块。
4. 优先 `interface` 描述对象结构，联合/工具类型用 `type`，合理使用泛型。
5. 不用重复定义相同数据结构，不通过类型断言掩盖真实类型问题。
6. 不使用 `@ts-ignore`；确需抑制用 `@ts-expect-error` 并附注释说明原因。
7. 导入使用 `@/` 别名指向 `src/`。

---

## 八、组件设计规范

遵循高内聚、低耦合原则。

| 层次 | 职责 | 位置 |
|------|------|------|
| 页面组件 | 整体布局、业务流程组织、页面级数据管理、子组件组合 | `src/views/` |
| 业务组件 | 独立业务功能、业务交互逻辑、局部状态管理 | `src/components/` |
| 公共组件 | 通用 UI 展示、通用交互行为、业务无关能力 | `src/components/` |
| Composables | 可复用的有状态逻辑 | `src/composables/useXxx.ts` |

**Composables 要求：**
- 一个 Composable 负责一类明确的功能，命名使用 `use` 前缀。
- 明确输入参数和返回值，避免隐式依赖外部变量。
- 注意副作用和生命周期清理。

**禁止：**
- 过度拆分组件；为了复用而过度抽象。
- 创建职责不清晰的公共组件。
- 将大量业务逻辑堆积在单个页面中。

---

## 九、API 请求规范

> **当前项目尚未安装 Axios**，如需发起 HTTP 请求，先向用户确认引入方式。

引入后遵循以下规范：

1. 统一使用项目封装的请求实例（`src/api/request.ts`），不在页面中重复配置底层请求。
2. API 接口与页面业务逻辑分离，按业务模块放 `src/api/modules/`。
3. 请求参数和响应数据必须定义类型。
4. 统一处理请求异常和业务错误，合理处理 Loading 状态，防止重复提交。
5. 注意异步请求的数据竞争，根据需要处理请求取消。

---

## 十、路由与状态管理规范

### Vue Router

- 路由统一在 `src/router/index.ts` 管理；首屏路由直接导入，非首屏一律懒加载。
- 路由 `name` 用 camelCase，`path` 用 kebab-case，名称具有明确业务含义。
- 根据业务需要配置路由守卫和权限控制，不在多处重复实现权限判断。

### Pinia

- 按业务模块拆分 Store，使用 setup（组合式）写法，与现有 `counter.ts` 保持一致。
- 每个 Store 一个文件，放 `src/stores/`，导出 `useXxxStore`。
- 仅将真正需要共享的状态放入 Store，State / Getters / Actions 职责清晰。
- 组件内只通过 Action 修改状态，不直接改 Store 内的 ref。
- 注意持久化数据的安全性和有效期。

---

## 十一、CSS 样式规范

1. 组件样式优先使用 `scoped`，避免全局样式污染。
2. 全局样式只在 `src/assets/main.css` / `base.css` 中扩展。
3. 合理使用 Flex 和 Grid，避免不必要的固定宽高。
4. 避免大量使用 `!important`，不随意覆盖第三方 UI 组件的全局样式。
5. 注意不同屏幕尺寸的适配，保持样式结构清晰。
6. Prettier 格式约束：无分号、单引号、`printWidth 100`。

---

## 十二、代码质量规范

- 优先保证可读性和可维护性；变量、函数、组件命名具有明确含义。
- 遵循 DRY 原则（减少重复）和单一职责原则。
- 避免过长的函数和复杂的嵌套，合理处理异常。
- 删除无用变量、无用导入和调试代码。
- 不通过关闭 TypeScript 检查来解决问题（禁止 `@ts-ignore`）。
- 不进行没有实际价值的过度优化。

---

## 十三、性能优化规范

根据实际业务场景决定是否优化：

1. 合理使用 `computed`，避免不必要的组件重复渲染。
2. 合理使用 `v-if`（条件渲染）和 `v-show`（频繁切换）。
3. 路由和大型组件使用懒加载；大型列表考虑虚拟滚动。
4. 合理使用防抖和节流，避免重复请求相同数据。
5. 合理处理图片和静态资源，注意事件监听和定时器清理。
6. 避免过早优化和过度优化。

---

## 十四、安全规范

1. 不将密钥、Token、密码等敏感信息硬编码在代码中；环境变量通过 `.env` 管理。
2. 注意用户输入的校验和安全处理，避免不安全的 HTML 注入（`v-html` 需谨慎）。
3. 权限控制不能仅依赖前端判断，不将生产敏感数据写入测试代码。

---

## 十五、测试规范

- 单元测试与被测文件就近放置：组件测试放 `src/components/__tests__/Xxx.spec.ts`。
- 组件测试用 `@vue/test-utils` 的 `mount`，断言 DOM 和交互行为，不测内部实现细节。
- E2E 测试放 `e2e/`，命名 `*.spec.ts`，基于用户流程组织用例。
- 优先覆盖：公共工具函数、Composables、组件交互、API 异常处理、核心业务流程。
- 修改业务代码后必须运行相关测试；新增功能须附带对应测试。
- **不得声称测试通过，除非实际执行并确认输出结果。**

---

## 十六、操作安全约束

1. 不擅自删除业务文件，不覆盖用户未提交的修改。
2. 不随意修改项目核心配置（`vite.config.ts`、`tsconfig*.json`、`router/index.ts`），除非任务明确要求。
3. 不擅自升级项目依赖，不执行 `pnpm update` 或修改 lockfile。
4. 不执行可能导致数据丢失的操作。
5. 涉及生产环境部署、数据库变更、Git 推送等高影响操作时，必须获得用户明确授权。
6. 不为了完成任务而绕过项目已有安全检查。

---

## 十七、开发优先级

遇到取舍时，按以下顺序决策：

1. 业务正确性
2. 代码稳定性
3. 类型安全
4. 可维护性
5. 可复用性
6. 性能优化
7. 开发效率
