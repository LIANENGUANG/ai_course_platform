<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <h1>个人信息</h1>
        <div class="header-actions">
          <router-link to="/profile/edit" class="edit-btn">编辑资料</router-link>
          <router-link to="/profile/change-password" class="change-password-btn"
            >修改密码</router-link
          >
          <button @click="handleLogout" class="logout-btn">退出登录</button>
        </div>
      </div>

      <div v-if="loading" class="loading">加载中...</div>

      <div v-else-if="user" class="profile-content">
        <div class="avatar-section">
          <div class="avatar">
            <img v-if="user.profile.avatar" :src="user.profile.avatar" alt="头像" />
            <div v-else class="avatar-placeholder">{{ user.username[0].toUpperCase() }}</div>
          </div>
        </div>

        <div class="info-section">
          <div class="info-item">
            <span class="label">用户名：</span>
            <span class="value">{{ user.username }}</span>
          </div>

          <div class="info-item">
            <span class="label">邮箱：</span>
            <span class="value">{{ user.email }}</span>
          </div>

          <div class="info-item">
            <span class="label">昵称：</span>
            <span class="value">{{ user.profile.nickname || '未设置' }}</span>
          </div>

          <div class="info-item">
            <span class="label">性别：</span>
            <span class="value">{{ getGenderText(user.profile.gender) }}</span>
          </div>

          <div class="info-item">
            <span class="label">生日：</span>
            <span class="value">{{ user.profile.birthday || '未设置' }}</span>
          </div>

          <div class="info-item">
            <span class="label">角色：</span>
            <span class="value">{{ getRoleText(user.profile.role) }}</span>
          </div>

          <div class="info-item">
            <span class="label">个人简介：</span>
            <span class="value">{{ user.profile.bio || '未填写' }}</span>
          </div>

          <div v-if="user.student_profile && user.profile.role === 'student'" class="student-info">
            <h3>学生信息</h3>
            <div class="info-item">
              <span class="label">年级：</span>
              <span class="value">{{ user.student_profile.grade || '未设置' }}年级</span>
            </div>
            <div class="info-item">
              <span class="label">学校：</span>
              <span class="value">{{ user.student_profile.school || '未设置' }}</span>
            </div>
            <div class="info-item">
              <span class="label">班级：</span>
              <span class="value">{{ user.student_profile.class_name || '未设置' }}</span>
            </div>
          </div>

          <div class="info-item">
            <span class="label">注册时间：</span>
            <span class="value">{{ formatDate(user.date_joined) }}</span>
          </div>

          <div class="info-item">
            <span class="label">最后登录：</span>
            <span class="value">{{ user.last_login ? formatDate(user.last_login) : '未记录' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { User } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const user = ref<User | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    if (userStore.user) {
      user.value = userStore.user
    } else {
      await userStore.fetchUserInfo()
      user.value = userStore.user
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  } finally {
    loading.value = false
  }
})

function getGenderText(gender: string) {
  const genderMap: Record<string, string> = {
    male: '男',
    female: '女',
    other: '其他',
  }
  return genderMap[gender] || '未设置'
}

function getRoleText(role: string) {
  const roleMap: Record<string, string> = {
    student: '学生',
    teacher: '教师',
    parent: '家长',
    admin: '管理员',
  }
  return roleMap[role] || role
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('zh-CN')
}

async function handleLogout() {
  if (confirm('确定要退出登录吗？')) {
    await userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 40px 20px;
}

.profile-card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.profile-header {
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-header h1 {
  margin: 0;
  font-size: 24px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.edit-btn,
.change-password-btn,
.logout-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  border: none;
}

.edit-btn,
.change-password-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: inline-block;
}

.edit-btn:hover,
.change-password-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
}

.logout-btn:hover {
  background: white;
}

.loading {
  padding: 60px;
  text-align: center;
  color: #999;
}

.profile-content {
  padding: 40px;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #667eea;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 48px;
  font-weight: 600;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item .label {
  width: 120px;
  font-weight: 500;
  color: #666;
}

.info-item .value {
  flex: 1;
  color: #333;
}

.student-info {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #f0f0f0;
}

.student-info h3 {
  margin-bottom: 20px;
  color: #667eea;
  font-size: 18px;
}
</style>
