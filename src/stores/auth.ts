import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/modules/user'
import type { LoginParams, UserInfo } from '@/api/modules/user'

export const useAuthStore = defineStore('auth', () => {
  // --- state ---
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- getters ---
  const isLoggedIn = computed(() => !!token.value)

  // --- actions ---
  async function loginAction(params: LoginParams) {
    loading.value = true
    error.value = null
    try {
      const result = await login(params)
      token.value = result.token
      userInfo.value = result.user
      localStorage.setItem('token', result.token)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '登录失败，请重试'
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return { token, userInfo, loading, error, isLoggedIn, loginAction, logout }
})
