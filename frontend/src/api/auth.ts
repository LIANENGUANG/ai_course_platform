import request from '@/utils/request'

// 登录接口
export interface LoginParams {
  username: string
  password: string
}

export interface TokenResponse {
  access: string
  refresh: string
}

export const login = (data: LoginParams) => {
  return request.post<TokenResponse>('/token/', data)
}

export const refreshToken = (refresh: string) => {
  return request.post<{ access: string }>('/token/refresh/', { refresh })
}
