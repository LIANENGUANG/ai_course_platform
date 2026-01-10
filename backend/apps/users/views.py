from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    UpdateUserProfileSerializer,
    ChangePasswordSerializer
)


class RegisterView(generics.CreateAPIView):
    """
    用户注册
    POST /api/auth/register/
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # 生成 Token
        refresh = RefreshToken.for_user(user)

        # 返回用户信息和 Token
        user_serializer = UserSerializer(user)

        return Response({
            'user': user_serializer.data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            'message': '注册成功'
        }, status=status.HTTP_201_CREATED)


class SessionView(APIView):
    """
    会话管理 (RESTful)
    POST /api/auth/sessions/ - 创建会话 (登录)
    DELETE /api/auth/sessions/ - 删除会话 (登出)
    """
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def post(self, request):
        """登录 - 创建会话"""
        username_or_email = request.data.get('username')
        password = request.data.get('password')

        if not username_or_email or not password:
            return Response({
                'error': '请提供用户名/邮箱和密码'
            }, status=status.HTTP_400_BAD_REQUEST)

        # 支持用户名或邮箱登录
        user = None
        if '@' in username_or_email:
            # 邮箱登录
            try:
                user_obj = User.objects.get(email=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass
        else:
            # 用户名登录
            user = authenticate(username=username_or_email, password=password)

        if user is None:
            return Response({
                'error': '用户名/邮箱或密码错误'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'error': '账号已被禁用'
            }, status=status.HTTP_401_UNAUTHORIZED)

        # 生成 Token
        refresh = RefreshToken.for_user(user)

        # 返回用户信息和 Token
        user_serializer = UserSerializer(user)

        return Response({
            'user': user_serializer.data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            'message': '登录成功'
        }, status=status.HTTP_200_OK)

    def delete(self, request):
        """登出 - 删除会话"""
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({
                'message': '退出登录成功'
            }, status=status.HTTP_200_OK)
        except Exception:
            return Response({
                'error': '退出登录失败'
            }, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    """
    当前用户资源管理 (RESTful)
    GET /api/users/me/ - 获取当前用户信息
    PUT /api/users/me/ - 完整更新用户信息
    PATCH /api/users/me/ - 部分更新用户信息
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """获取当前用户信息"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        """完整更新用户信息"""
        serializer = UpdateUserProfileSerializer(
            instance=request.user,
            data=request.data,
            partial=False
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # 返回更新后的用户信息
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)

    def patch(self, request):
        """部分更新用户信息"""
        serializer = UpdateUserProfileSerializer(
            instance=request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # 返回更新后的用户信息
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)


class ChangePasswordView(APIView):
    """
    修改密码 (RESTful)
    PUT /api/users/me/password/ - 更新密码
    """
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        """更新密码"""
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'message': '密码修改成功，请重新登录'
        }, status=status.HTTP_200_OK)
