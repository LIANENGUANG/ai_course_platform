from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    用户基础模型
    继承 Django AbstractUser，添加平台特定字段
    """
    email = models.EmailField('邮箱', unique=True)

    class Meta:
        db_table = 'users'
        verbose_name = '用户'
        verbose_name_plural = verbose_name
        ordering = ['-date_joined']

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    """
    用户档案
    存储用户的个人信息
    """
    ROLE_CHOICES = [
        ('student', '学生'),
        ('teacher', '教师'),
        ('parent', '家长'),
        ('admin', '管理员'),
    ]

    GENDER_CHOICES = [
        ('male', '男'),
        ('female', '女'),
        ('other', '其他'),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='用户'
    )
    nickname = models.CharField('昵称', max_length=50, blank=True, default='')
    avatar = models.URLField('头像', blank=True, default='')
    gender = models.CharField('性别', max_length=10, choices=GENDER_CHOICES, blank=True, default='')
    birthday = models.DateField('生日', null=True, blank=True)
    bio = models.TextField('个人简介', max_length=500, blank=True, default='')
    role = models.CharField('角色', max_length=20, choices=ROLE_CHOICES, default='student')
    is_profile_completed = models.BooleanField('信息已完善', default=False)
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)

    class Meta:
        db_table = 'user_profiles'
        verbose_name = '用户档案'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f'{self.user.username} 的档案'


class StudentProfile(models.Model):
    """
    学生档案
    学生用户的额外信息
    """
    GRADE_CHOICES = [(i, f'{i}年级') for i in range(1, 13)]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
        verbose_name='用户'
    )
    grade = models.IntegerField('年级', choices=GRADE_CHOICES, null=True, blank=True)
    school = models.CharField('学校', max_length=100, blank=True, default='')
    class_name = models.CharField('班级', max_length=50, blank=True, default='')
    parent_phone = models.CharField('家长电话', max_length=11, blank=True, default='')
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)

    class Meta:
        db_table = 'student_profiles'
        verbose_name = '学生档案'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f'{self.user.username} 的学生档案'
