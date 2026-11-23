# /new-feature — 新功能开发

触发场景：用户描述一个新的业务功能需求。

## 执行步骤

### 1. 需求分析
- 明确功能名称、业务目标、输入输出和验收条件。
- 识别涉及的页面（`src/views/`）、组件（`src/components/`）、store（`src/stores/`）和 API（`src/api/modules/`）。
- 若需求模糊，先输出分析结果请用户确认，再开始编码。

### 2. 文件清单
列出将要新增和修改的文件，格式：
- 新增：`src/views/XxxView.vue`（页面）
- 新增：`src/components/XxxCard.vue`（组件，如有）
- 新增：`src/stores/xxx.ts`（store，如有）
- 新增：`src/api/modules/xxx.ts`（API，如有）
- 修改：`src/router/index.ts`（注册路由）

### 3. 编码规范
- 页面组件放 `src/views/`，命名 `XxxView.vue`，注册路由时非首屏一律懒加载。
- 组件一律 `<script setup lang="ts">`；Props 用 `defineProps<T>()`，Emits 用 `defineEmits<{...}>()`。
- 状态用 `ref` / `computed`；跨组件共享才进 Pinia store。
- API 调用只通过 `src/api/modules/xxx.ts` 中导出的函数，不在组件中直接调 axios。
- 路由 name camelCase，path kebab-case。

### 4. 质量检查（完成编码后依次执行）
```bash
pnpm type-check
pnpm lint
pnpm test:unit -- run
pnpm build
```
任一失败须修复后再重试，不跳过。

### 5. 交付格式
说明：完成的功能、新增/修改的文件、执行命令的实际输出、未解决问题。
