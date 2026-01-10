// 用户配置信息
export interface UserProfile {
  nickname: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  birthday: string | null;
  bio: string;
  role: 'student' | 'teacher' | 'admin';
}

// 用户信息
export interface User {
  id: number;
  username: string;
  email: string;
  profile: UserProfile;
}

// 登录请求
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应
export interface LoginResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
  message: string;
}

// 注册请求
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  nickname?: string;
}

// 注册响应
export interface RegisterResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
  message: string;
}

// 修改密码请求
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

// 更新个人信息请求
export interface UpdateProfileRequest {
  nickname?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string | null;
  bio?: string;
}
