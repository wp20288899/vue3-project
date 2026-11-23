/**
 * 通用工具函数
 */

/**
 * 防抖：delay ms 内重复调用只执行最后一次
 */
export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 300,
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: T) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * 节流：interval ms 内最多执行一次
 */
export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  interval = 300,
): (...args: T) => void {
  let last = 0
  return (...args: T) => {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn(...args)
    }
  }
}

/**
 * 安全解析 JSON，解析失败时返回 fallback
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T
  } catch {
    return fallback
  }
}
