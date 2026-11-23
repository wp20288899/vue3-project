# /new-store — 新建 Pinia Store

触发场景：用户要求新建一个全局状态模块。

## 执行步骤

### 1. 评估必要性
仅当状态需要在多个页面/组件间共享，或需要跨路由持久化时，才建 Pinia store。
单个页面内的局部状态用组件自身的 `ref` / `reactive`；
可复用的有状态逻辑优先写成 `composable`（`src/composables/useXxx.ts`）。

### 2. 文件位置
新建 `src/stores/<business>.ts`，每个业务域一个文件。

### 3. Store 模板（组合式写法）
```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useXxxStore = defineStore('xxx', () => {
  // --- state ---
  const items = ref<XxxItem[]>([])
  const loading = ref(false)

  // --- getters ---
  const total = computed(() => items.value.length)

  // --- actions ---
  async function fetchItems() {
    loading.value = true
    try {
      items.value = await getXxxList()
    } finally {
      loading.value = false
    }
  }

  function reset() {
    items.value = []
  }

  return { items, loading, total, fetchItems, reset }
})
```

### 4. 规范要点
- 命名：`useXxxStore`，store id 用 kebab-case（`defineStore('user-profile', ...)`）。
- State / Getters / Actions 职责清晰；不在 state 里直接混入方法逻辑。
- 组件只通过 action 修改状态，不在组件里直接给 store 的 ref 赋值（除非 store 明确导出）。
- 若需持久化，注意不在 store 中硬编码 localStorage key，考虑提取为常量。

### 5. 质量检查
```bash
pnpm type-check
pnpm lint
pnpm test:unit -- run
```

### 6. 交付格式
说明：store 路径、state/getters/actions 清单、类型定义、命令输出。
