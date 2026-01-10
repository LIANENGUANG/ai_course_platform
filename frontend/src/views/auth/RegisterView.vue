<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="register-title">注册</h1>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            placeholder="3-20个字符"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            placeholder="请输入邮箱地址"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirm_password">确认密码</label>
          <input
            id="confirm_password"
            v-model="registerForm.confirm_password"
            type="password"
            placeholder="请再次输入密码"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>

      <div class="footer-links">
        <span>已有账号？</span>
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { RegisterParams } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const registerForm = ref<RegisterParams>({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
})

const loading = ref(false)
const errorMessage = ref('')

async function handleRegister() {
  // 验证密码一致性
  if (registerForm.value.password !== registerForm.value.confirm_password) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await userStore.register(registerForm.value)

    // 注册成功，跳转到首页或个人资料页
    router.push('/profile/edit')
  } catch (error: any) {
    console.error('注册失败:', error)

    // 处理后端返回的错误信息
    const responseData = error.response?.data
    if (responseData) {
      // Django REST Framework 返回的错误格式
      if (responseData.username) {
        errorMessage.value = responseData.username[0]
      } else if (responseData.email) {
        errorMessage.value = responseData.email[0]
      } else if (responseData.password) {
        errorMessage.value = responseData.password[0]
      } else if (responseData.confirm_password) {
        errorMessage.value = responseData.confirm_password[0]
      } else {
        errorMessage.value = '注册失败，请检查输入信息'
      }
    } else {
      errorMessage.value = '注册失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-box {
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.register-form {
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
