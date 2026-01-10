import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: '/api', // 通过 Vite 代理转发到后端
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response

      // Token 过期，尝试刷新
      if (status === 401) {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          try {
            const response = await axios.post('/api/auth/refresh/', {
              refresh: refreshToken,
            })
            const { access } = response.data
            localStorage.setItem('access_token', access)

            // 重试原请求
            error.config.headers.Authorization = `Bearer ${access}`
            return service.request(error.config)
          } catch (refreshError) {
            // 刷新失败，清除 token 并跳转到登录页
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login'
          }
        } else {
          window.location.href = '/login'
        }
      }

      // 其他错误处理
      console.error(`API Error [${status}]:`, error.response.data)
    }
    return Promise.reject(error)
  }
)

export default service
