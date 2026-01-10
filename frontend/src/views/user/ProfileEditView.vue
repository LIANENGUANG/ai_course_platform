<template>
  <div class="profile-edit-container">
    <div class="profile-edit-card">
      <div class="header">
        <h1>编辑个人资料</h1>
        <router-link to="/profile" class="back-btn">返回</router-link>
      </div>

      <form @submit.prevent="handleSubmit" class="edit-form">
        <div class="form-section">
          <h3>基本信息</h3>

          <div class="form-group">
            <label for="nickname">昵称 *</label>
            <input
              id="nickname"
              v-model="formData.nickname"
              type="text"
              placeholder="请输入昵称"
              required
            />
          </div>

          <div class="form-group">
            <label for="gender">性别</label>
            <select id="gender" v-model="formData.gender">
              <option value="">请选择</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div class="form-group">
            <label for="birthday">生日</label>
            <input id="birthday" v-model="formData.birthday" type="date" />
          </div>

          <div class="form-group">
            <label for="bio">个人简介</label>
            <textarea
              id="bio"
              v-model="formData.bio"
              rows="4"
              placeholder="介绍一下自己吧"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="role">角色 *</label>
            <select id="role" v-model="formData.role" required>
              <option value="student">学生</option>
              <option value="teacher">教师</option>
              <option value="parent">家长</option>
            </select>
          </div>
        </div>

        <div v-if="formData.role === 'student'" class="form-section">
          <h3>学生信息</h3>

          <div class="form-group">
            <label for="grade">年级</label>
            <select id="grade" v-model="formData.grade">
              <option :value="null">请选择</option>
              <option v-for="i in 12" :key="i" :value="i">{{ i }}年级</option>
            </select>
          </div>

          <div class="form-group">
            <label for="school">学校</label>
            <input id="school" v-model="formData.school" type="text" placeholder="请输入学校名称" />
          </div>

          <div class="form-group">
            <label for="class_name">班级</label>
            <input
              id="class_name"
              v-model="formData.class_name"
              type="text"
              placeholder="例如：一年级3班"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '保存中...' : '保存' }}
          </button>
          <router-link to="/profile" class="cancel-btn">取消</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { UpdateProfileParams } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const formData = ref<UpdateProfileParams>({
  nickname: '',
  gender: undefined,
  birthday: undefined,
  bio: '',
  role: 'student',
  grade: undefined,
  school: '',
  class_name: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(async () => {
  try {
    if (!userStore.user) {
      await userStore.fetchUserInfo()
    }

    if (userStore.user) {
      const user = userStore.user
      formData.value = {
        nickname: user.profile.nickname || '',
        gender: user.profile.gender || undefined,
        birthday: user.profile.birthday || undefined,
        bio: user.profile.bio || '',
        role: user.profile.role,
        grade: user.student_profile?.grade || undefined,
        school: user.student_profile?.school || '',
        class_name: user.student_profile?.class_name || '',
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await userStore.updateUserProfile(formData.value)
    successMessage.value = '保存成功！'

    // 2秒后跳转到个人信息页
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  } catch (error: any) {
    console.error('更新失败:', error)
    errorMessage.value = error.response?.data?.error || '保存失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-edit-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 40px 20px;
}

.profile-edit-card {
  max-width: 700px;
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

.edit-form {
  padding: 40px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
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
  margin-top: 32px;
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
</style>
