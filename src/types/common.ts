/**
 * 全局公共类型声明
 * 业务专属类型请放在对应模块目录下（如 src/api/modules/user.ts）
 */

/** 分页请求参数 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** 分页响应结构 */
export interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 通用键值对选项（用于下拉框等） */
export interface Option<T = string | number> {
  label: string
  value: T
}
