import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * 统一管理异步请求的 loading / error 状态
 *
 * @example
 * const { loading, error, run } = useRequest(getUserInfo)
 * onMounted(() => run())
 */
export function useRequest<T>(fn: (...args: unknown[]) => Promise<T>): {
  loading: Ref<boolean>
  error: Ref<string | null>
  data: Ref<T | null>
  run: (...args: unknown[]) => Promise<void>
} {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<T | null>(null) as Ref<T | null>

  async function run(...args: unknown[]) {
    loading.value = true
    error.value = null
    try {
      data.value = await fn(...args)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '未知错误'
    } finally {
      loading.value = false
    }
  }

  return { loading, error, data, run }
}
