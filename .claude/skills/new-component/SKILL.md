# /new-component — 新建 Vue 3 组件

触发场景：用户要求新建一个可复用组件。

## 执行步骤

### 1. 确认组件定位
- **公共组件**（业务无关、跨页面复用）→ `src/components/XxxBase.vue` 或 `src/components/Xxx.vue`
- **业务组件**（特定业务模块）→ `src/components/xxx/XxxWidget.vue`
- 过于简单的 UI 片段不必单独抽组件；若用处唯一，可保留在页面内。

### 2. 组件模板结构
```vue
<script setup lang="ts">
// 1. 类型导入（type-only import）
// 2. defineProps / defineEmits
// 3. 状态与计算属性
// 4. 方法
// 5. 生命周期钩子
</script>

<template>
  <!-- 单根元素（或 Fragment），避免模板内写复杂逻辑 -->
</template>

<style scoped>
/* 组件私有样式，优先 scoped */
</style>
```

### 3. Props / Emits 规范
- Props 用纯类型声明：`defineProps<{ title: string; count?: number }>()`
- Emits 用纯类型声明：`defineEmits<{ update: [value: string]; close: [] }>()`
- 必填 prop 不设默认值；可选 prop 用 `withDefaults`。
- 不直接修改 prop，需要变更时 emit 事件给父组件。

### 4. 组件测试
新建配套测试文件 `src/components/__tests__/Xxx.spec.ts`，至少覆盖：
- 默认渲染（无 prop 的快照或关键文本断言）
- 关键交互（点击、输入）触发正确 emit
- 边界状态（空数据、loading、error）

### 5. 质量检查
```bash
pnpm type-check
pnpm lint
pnpm test:unit -- run
```

### 6. 交付格式
说明：组件路径、Props/Emits 接口定义、测试覆盖情况、命令输出。
