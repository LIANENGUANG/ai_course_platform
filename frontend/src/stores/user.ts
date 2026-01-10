import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, LoginParams, RegisterParams } from '@/api/auth'
import * as authApi from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))

  // Getters
  const isLoggedIn = computed(() => !!accessToken.value && !!user.value)
  const isProfileCompleted = computed(() => user.value?.profile.is_profile_completed ?? false)
  const userRole = computed(() => user.value?.profile.role ?? 'student')

  // Actions

  /**
   * 用户注册
   */
  async function register(params: RegisterParams) {
    try {
      const response = await authApi.register(params)

      // 保存 tokens
      accessToken.value = response.tokens.access
      refreshToken.value = response.tokens.refresh
      localStorage.setItem('access_token', response.tokens.access)
      localStorage.setItem('refresh_token', response.tokens.refresh)

      // 保存用户信息
      user.value = response.user

      return response
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  }

  /**
   * 用户登录
   */
  async function login(params: LoginParams) {
    try {
      const response = await authApi.login(params)

      // 保存 tokens
      accessToken.value = response.tokens.access
      refreshToken.value = response.tokens.refresh
      localStorage.setItem('access_token', response.tokens.access)
      localStorage.setItem('refresh_token', response.tokens.refresh)

      // 保存用户信息
      user.value = response.user

      return response
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  /**
   * 退出登录
   */
  async function logout() {
    try {
      if (refreshToken.value) {
        await authApi.logout(refreshToken.value)
      }
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      // 无论接口成功与否，都清除本地数据
      user.value = null
      accessToken.value = null
      refreshToken.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }

  /**
   * 获取当前用户信息
   */
  async function fetchUserInfo() {
    try {
      const userData = await authApi.getCurrentUser()
      user.value = userData
      return userData
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  /**
   * 更新用户资料
   */
  async function updateUserProfile(data: any) {
    try {
      const response = await authApi.updateProfile(data)
      user.value = response.user
      return response
    } catch (error) {
      console.error('更新用户资料失败:', error)
      throw error
    }
  }

  /**
   * 修改密码
   */
  async function updatePassword(data: any) {
    try {
      const response = await authApi.changePassword(data)
      // 修改密码成功后，建议重新登录
      return response
    } catch (error) {
      console.error('修改密码失败:', error)
      throw error
    }
  }

  /**
   * 初始化用户状态（从 localStorage 恢复）
   */
  async function initUserState() {
    if (accessToken.value) {
      try {
        await fetchUserInfo()
      } catch (error) {
        // Token 无效，清除登录状态
        console.error('Token 无效，清除登录状态')
        logout()
      }
    }
  }

  return {
    // State
    user,
    accessToken,
    refreshToken,

    // Getters
    isLoggedIn,
    isProfileCompleted,
    userRole,

    // Actions
    register,
    login,
    logout,
    fetchUserInfo,
    updateUserProfile,
    updatePassword,
    initUserState,
  }
})
