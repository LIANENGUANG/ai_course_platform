import request from '@/utils/request'

// ==================== 类型定义 ====================

// 用户档案
export interface UserProfile {
  nickname: string
  avatar: string
  gender: 'male' | 'female' | 'other' | ''
  birthday: string | null
  bio: string
  role: 'student' | 'teacher' | 'parent' | 'admin'
  is_profile_completed: boolean
  created_at: string
  updated_at: string
}

// 学生档案
export interface StudentProfile {
  grade: number | null
  school: string
  class_name: string
  parent_phone: string
}

// 用户信息
export interface User {
  id: number
  username: string
  email: string
  profile: UserProfile
  student_profile: StudentProfile | null
  date_joined: string
  last_login: string | null
}

// Token 响应
export interface TokenResponse {
  access: string
  refresh: string
}

// 登录响应
export interface LoginResponse {
  user: User
  tokens: TokenResponse
  message: string
}

// 注册响应
export interface RegisterResponse {
  user: User
  tokens: TokenResponse
  message: string
}

// ==================== 请求参数 ====================

// 登录参数
export interface LoginParams {
  username: string  // 支持用户名或邮箱
  password: string
}

// 注册参数
export interface RegisterParams {
  username: string
  email: string
  password: string
  confirm_password: string
}

// 更新用户资料参数
export interface UpdateProfileParams {
  nickname?: string
  gender?: 'male' | 'female' | 'other'
  birthday?: string
  bio?: string
  role?: 'student' | 'teacher' | 'parent' | 'admin'
  grade?: number
  school?: string
  class_name?: string
}

// 修改密码参数
export interface ChangePasswordParams {
  old_password: string
  new_password: string
  confirm_password: string
}

// ==================== API 接口 ====================

// 用户注册
export const register = (data: RegisterParams) => {
  return request.post<RegisterResponse>('/auth/register/', data)
}

// 用户登录
export const login = (data: LoginParams) => {
  return request.post<LoginResponse>('/auth/login/', data)
}

// 退出登录
export const logout = (refresh: string) => {
  return request.post<{ message: string }>('/auth/logout/', { refresh })
}

// 刷新 Token
export const refreshToken = (refresh: string) => {
  return request.post<TokenResponse>('/auth/refresh/', { refresh })
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return request.get<User>('/users/me/')
}

// 更新用户资料
export const updateProfile = (data: UpdateProfileParams) => {
  return request.patch<{ message: string; user: User }>('/users/me/update/', data)
}

// 修改密码
export const changePassword = (data: ChangePasswordParams) => {
  return request.post<{ message: string }>('/users/me/change-password/', data)
}
