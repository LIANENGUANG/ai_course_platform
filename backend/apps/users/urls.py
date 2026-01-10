from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    CurrentUserView,
    UpdateUserProfileView,
    ChangePasswordView,
)

app_name = 'users'

urlpatterns = [
    # 认证相关
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 用户信息相关
    path('users/me/', CurrentUserView.as_view(), name='current_user'),
    path('users/me/update/', UpdateUserProfileView.as_view(), name='update_profile'),
    path('users/me/change-password/', ChangePasswordView.as_view(), name='change_password'),
]
