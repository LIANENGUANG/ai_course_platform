from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile, StudentProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """用户管理"""
    list_display = ['username', 'email', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['is_staff', 'is_active', 'date_joined']
    search_fields = ['username', 'email']
    ordering = ['-date_joined']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """用户档案管理"""
    list_display = ['user', 'nickname', 'role', 'gender', 'is_profile_completed', 'created_at']
    list_filter = ['role', 'gender', 'is_profile_completed']
    search_fields = ['user__username', 'nickname']
    ordering = ['-created_at']


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    """学生档案管理"""
    list_display = ['user', 'grade', 'school', 'class_name', 'created_at']
    list_filter = ['grade']
    search_fields = ['user__username', 'school', 'class_name']
    ordering = ['-created_at']
