import apiClient from './client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ChangePasswordRequest,
  UpdateProfileRequest,
  User,
} from '../utils/types';

// ============ 认证相关 (RESTful) ============

// 登录 - POST /api/auth/sessions/ (创建会话)
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/sessions/', data);
  return response.data;
};

// 登出 - DELETE /api/auth/sessions/ (删除会话)
export const logout = async (refreshToken: string): Promise<void> => {
  await apiClient.delete('/api/auth/sessions/', {
    data: { refresh: refreshToken }
  });
};

// ============ 用户相关 (RESTful) ============

// 注册 - POST /api/users/ (创建用户)
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>('/api/users/', data);
  return response.data;
};

// 获取当前用户 - GET /api/users/me/
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/api/users/me/');
  return response.data;
};

// 更新个人信息 - PATCH /api/users/me/ (部分更新)
export const updateProfile = async (data: UpdateProfileRequest): Promise<User> => {
  const response = await apiClient.patch<User>('/api/users/me/', data);
  return response.data;
};

// 修改密码 - PUT /api/users/me/password/ (更新密码)
export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  await apiClient.put('/api/users/me/password/', data);
};
