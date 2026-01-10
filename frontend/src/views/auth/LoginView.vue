<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">登录</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名/邮箱</label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名或邮箱"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="footer-links">
        <span>还没有账号？</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { LoginParams } from '@/api/auth'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginForm = ref<LoginParams>({
  username: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    await userStore.login(loginForm.value)

    // 登录成功，跳转到目标页面或首页
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error: any) {
    console.error('登录失败:', error)
    errorMessage.value = error.response?.data?.error || '登录失败，请检查用户名和密码'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  padding: 12px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
  font-size: 14px;
  text-align: center;
}

.submit-btn {
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer-links {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #666;
}

.footer-links a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-left: 8px;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
