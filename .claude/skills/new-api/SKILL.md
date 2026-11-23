# /new-api — 新建 API 模块

触发场景：用户要求接入一个新的后端接口或业务 API 模块。

## 执行步骤

### 1. 确认接口信息
需要明确：
- 接口路径（如 `/product/list`）
- HTTP 方法（GET / POST / PUT / DELETE）
- 请求参数结构
- 响应数据结构
- 是否有分页

### 2. 文件位置
新建 `src/api/modules/<business>.ts`，不在已有模块中混入不相关接口。

### 3. 模块模板
```ts
import { request } from '../request'

// 请求参数类型
export interface XxxParams {
  // ...
}

// 响应数据类型
export interface XxxItem {
  // ...
}

// 接口函数，命名动词在前：getXxx / createXxx / updateXxx / deleteXxx
export function getXxxList(params: XxxParams) {
  return request<XxxItem[]>({ method: 'GET', url: '/xxx', params })
}
```

### 4. 规范要点
- 请求参数和响应数据必须有完整的 TypeScript 类型，不用 `any`。
- 分页数据用 `src/types/common.ts` 中的 `PaginationParams` / `PaginationResult<T>`。
- 不在此文件处理 loading / error，由调用方或 composable 负责。
- 不硬编码 baseURL，由 `request.ts` 中 `VITE_API_BASE_URL` 统一管理。

### 5. 质量检查
```bash
pnpm type-check
pnpm lint
```

### 6. 交付格式
说明：模块路径、导出函数列表及签名、类型定义、命令输出。
