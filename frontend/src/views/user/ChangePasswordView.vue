<template>
  <div class="change-password-container">
    <div class="change-password-card">
      <div class="header">
        <h1>修改密码</h1>
        <router-link to="/profile" class="back-btn">返回</router-link>
      </div>

      <form @submit.prevent="handleSubmit" class="password-form">
        <div class="form-group">
          <label for="old_password">当前密码</label>
          <input
            id="old_password"
            v-model="formData.old_password"
            type="password"
            placeholder="请输入当前密码"
            required
          />
        </div>

        <div class="form-group">
          <label for="new_password">新密码</label>
          <input
            id="new_password"
            v-model="formData.new_password"
            type="password"
            placeholder="请输入新密码"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirm_password">确认新密码</label>
          <input
            id="confirm_password"
            v-model="formData.confirm_password"
            type="password"
            placeholder="请再次输入新密码"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '修改中...' : '修改密码' }}
          </button>
          <router-link to="/profile" class="cancel-btn">取消</router-link>
        </div>

        <div class="password-tips">
          <h4>密码要求：</h4>
          <ul>
            <li>密码不能与用户名太相似</li>
            <li>密码长度至少8个字符</li>
            <li>密码不能是常用密码</li>
            <li>密码不能全是数字</li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { ChangePasswordParams } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const formData = ref<ChangePasswordParams>({
  old_password: '',
  new_password: '',
  confirm_password: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleSubmit() {
  // 验证新密码一致性
  if (formData.value.new_password !== formData.value.confirm_password) {
    errorMessage.value = '两次输入的新密码不一致'
    return
  }

  // 验证新密码不能与旧密码相同
  if (formData.value.old_password === formData.value.new_password) {
    errorMessage.value = '新密码不能与当前密码相同'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await userStore.updatePassword(formData.value)
    successMessage.value = '密码修改成功！即将跳转到登录页面...'

    // 清空表单
    formData.value = {
      old_password: '',
      new_password: '',
      confirm_password: '',
    }

    // 2秒后退出登录并跳转到登录页
    setTimeout(async () => {
      await userStore.logout()
      router.push('/login')
    }, 2000)
  } catch (error: any) {
    console.error('修改密码失败:', error)

    // 处理后端返回的错误信息
    const responseData = error.response?.data
    if (responseData) {
      if (responseData.old_password) {
        errorMessage.value = responseData.old_password[0]
      } else if (responseData.new_password) {
        errorMessage.value = responseData.new_password[0]
      } else if (responseData.confirm_password) {
        errorMessage.value = responseData.confirm_password[0]
      } else {
        errorMessage.value = '修改密码失败，请检查输入信息'
      }
    } else {
      errorMessage.value = '修改密码失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.change-password-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 40px 20px;
}

.change-password-card {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.header {
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.back-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.password-form {
  padding: 40px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  box-sizing: border-box;
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
  margin-bottom: 20px;
}

.success-message {
  padding: 12px;
  background-color: #efe;
  border: 1px solid #cfc;
  border-radius: 8px;
  color: #3c3;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.submit-btn,
.cancel-btn {
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  border: none;
  display: inline-block;
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.password-tips {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.password-tips h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 15px;
}

.password-tips ul {
  margin: 0;
  padding-left: 20px;
}

.password-tips li {
  color: #666;
  font-size: 14px;
  line-height: 1.8;
}
</style>
