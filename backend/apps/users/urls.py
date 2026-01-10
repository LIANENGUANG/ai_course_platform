from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    SessionView,
    CurrentUserView,
    ChangePasswordView,
)

app_name = 'users'

urlpatterns = [
    # 认证相关 (RESTful)
    path('auth/sessions/', SessionView.as_view(), name='session'),  # POST - 创建会话 (登录), DELETE - 删除会话 (登出)
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # POST - 刷新 token

    # 用户相关 (RESTful)
    path('users/', RegisterView.as_view(), name='users'),  # POST - 创建用户 (注册)
    path('users/me/', CurrentUserView.as_view(), name='current_user'),  # GET - 获取, PUT - 完整更新, PATCH - 部分更新
    path('users/me/password/', ChangePasswordView.as_view(), name='change_password'),  # PUT - 更新密码
]
