import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // 认证相关路由
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    // 用户相关路由
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/user/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'profile-edit',
      component: () => import('../views/user/ProfileEditView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/change-password',
      name: 'change-password',
      component: () => import('../views/user/ChangePasswordView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 初始化用户状态（仅首次访问）
  if (!userStore.user && userStore.accessToken) {
    try {
      await userStore.initUserState()
    } catch (error) {
      console.error('初始化用户状态失败:', error)
    }
  }

  // 需要认证的路由
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户访问登录/注册页，重定向到首页
  if (to.meta.requiresGuest && userStore.isLoggedIn) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
