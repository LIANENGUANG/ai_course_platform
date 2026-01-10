from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, UserProfile, StudentProfile


class StudentProfileSerializer(serializers.ModelSerializer):
    """学生档案序列化器"""

    class Meta:
        model = StudentProfile
        fields = ['grade', 'school', 'class_name', 'parent_phone']


class UserProfileSerializer(serializers.ModelSerializer):
    """用户档案序列化器"""

    class Meta:
        model = UserProfile
        fields = [
            'nickname', 'avatar', 'gender', 'birthday',
            'bio', 'role', 'is_profile_completed',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    """用户序列化器"""
    profile = UserProfileSerializer(read_only=True)
    student_profile = StudentProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'profile', 'student_profile',
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']


class RegisterSerializer(serializers.ModelSerializer):
    """注册序列化器"""
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate_username(self, value):
        """验证用户名"""
        if len(value) < 3 or len(value) > 20:
            raise serializers.ValidationError('用户名长度必须在 3-20 个字符之间')
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('该用户名已被使用')
        return value

    def validate_email(self, value):
        """验证邮箱"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('该邮箱已被注册')
        return value

    def validate(self, attrs):
        """验证密码一致性"""
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': '两次输入的密码不一致'})
        return attrs

    def create(self, validated_data):
        """创建用户"""
        # 移除 confirm_password
        validated_data.pop('confirm_password')

        # 创建用户
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # 自动创建用户档案
        UserProfile.objects.create(user=user)

        return user


class UpdateUserProfileSerializer(serializers.Serializer):
    """更新用户信息序列化器"""
    # UserProfile 字段
    nickname = serializers.CharField(max_length=50, required=False)
    gender = serializers.ChoiceField(
        choices=['male', 'female', 'other'],
        required=False
    )
    birthday = serializers.DateField(required=False, allow_null=True)
    bio = serializers.CharField(max_length=500, required=False)
    role = serializers.ChoiceField(
        choices=['student', 'teacher', 'parent', 'admin'],
        required=False
    )

    # StudentProfile 字段（仅学生）
    grade = serializers.IntegerField(
        min_value=1,
        max_value=12,
        required=False,
        allow_null=True
    )
    school = serializers.CharField(max_length=100, required=False)
    class_name = serializers.CharField(max_length=50, required=False)

    def update(self, instance, validated_data):
        """更新用户信息"""
        user = instance

        # 提取 Profile 字段
        profile_fields = ['nickname', 'gender', 'birthday', 'bio', 'role']
        profile_data = {k: v for k, v in validated_data.items() if k in profile_fields}

        # 提取 StudentProfile 字段
        student_fields = ['grade', 'school', 'class_name']
        student_data = {k: v for k, v in validated_data.items() if k in student_fields}

        # 更新 UserProfile
        if profile_data:
            profile = user.profile
            for key, value in profile_data.items():
                setattr(profile, key, value)

            # 如果设置了角色和昵称，标记为已完善
            if profile.nickname and profile.role:
                profile.is_profile_completed = True

            profile.save()

        # 更新或创建 StudentProfile
        if student_data and (hasattr(user, 'profile') and user.profile.role == 'student'):
            student_profile, created = StudentProfile.objects.get_or_create(user=user)
            for key, value in student_data.items():
                setattr(student_profile, key, value)
            student_profile.save()

        return user


class ChangePasswordSerializer(serializers.Serializer):
    """修改密码序列化器"""
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
    )
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        """验证旧密码"""
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('当前密码错误')
        return value

    def validate(self, attrs):
        """验证新密码一致性"""
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': '两次输入的密码不一致'})
        return attrs

    def save(self):
        """保存新密码"""
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
