<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const usernameError = ref('')
const passwordError = ref('')

function validate(): boolean {
  usernameError.value = ''
  passwordError.value = ''
  let valid = true
  if (!username.value.trim()) {
    usernameError.value = '请输入用户名'
    valid = false
  }
  if (!password.value) {
    passwordError.value = '请输入密码'
    valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  try {
    await authStore.loginAction({ username: username.value.trim(), password: password.value })
    router.push('/')
  } catch {
    // error 已由 store 记录，页面直接展示 authStore.error
  }
}
</script>

<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h1 class="login-title">登录</h1>

      <div class="form-item">
        <label class="form-label" for="username">用户名</label>
        <input
          id="username"
          v-model="username"
          class="form-input"
          type="text"
          placeholder="请输入用户名"
          autocomplete="username"
        />
        <span v-if="usernameError" class="form-error">{{ usernameError }}</span>
      </div>

      <div class="form-item">
        <label class="form-label" for="password">密码</label>
        <input
          id="password"
          v-model="password"
          class="form-input"
          type="password"
          placeholder="请输入密码"
          autocomplete="current-password"
        />
        <span v-if="passwordError" class="form-error">{{ passwordError }}</span>
      </div>

      <p v-if="authStore.error" class="login-error">{{ authStore.error }}</p>

      <button class="login-btn" type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? '登录中…' : '登录' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
}

.login-form {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-soft);
}

.login-title {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-heading);
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.875rem;
  color: var(--color-text);
}

.form-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
  outline: none;
  transition: border-color 0.15s;
}

.form-input:focus {
  border-color: var(--color-heading);
}

.form-error {
  font-size: 0.75rem;
  color: #e53e3e;
}

.login-error {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #e53e3e;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 0.625rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--color-heading);
  cursor: pointer;
  transition: opacity 0.15s;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
