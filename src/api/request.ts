import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string | undefined,
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message, data } = response.data
    if (code === 0 || code === 200) {
      return data as unknown as AxiosResponse
    }
    return Promise.reject(new Error(message ?? '请求失败'))
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status === 401) {
        // Token 过期或未授权：此处可跳转登录页
        console.warn('[request] 401 未授权')
      } else if (status === 403) {
        console.warn('[request] 403 无权限')
      } else if (status && status >= 500) {
        console.error('[request] 服务器错误', status)
      }
    }
    return Promise.reject(error)
  },
)

export function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return service(config) as unknown as Promise<T>
}

export default service
