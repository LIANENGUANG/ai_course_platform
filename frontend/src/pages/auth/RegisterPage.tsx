import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Flex, Typography, Layout, theme } from 'antd';
import { User, Lock, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../../api/auth';
import { useUserStore } from '../../store/useUserStore';
import type { RegisterRequest } from '../../utils/types';

const RegisterPage: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterRequest) => {
    try {
      setLoading(true);
      const response = await registerApi(values);
      login(response.user, response.tokens.access, response.tokens.refresh);
      message.success('注册成功！');
      navigate('/dashboard');
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData) {
        // 显示具体的错误信息
        Object.keys(errorData).forEach((key) => {
          const messages = errorData[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) => message.error(msg));
          } else {
            message.error(messages);
          }
        });
      } else {
        message.error('注册失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <Flex justify="center" align="center" style={{ minHeight: '100vh', padding: token.padding }}>
        <Card title="注册" style={{ width: '100%', maxWidth: 450 }}>
          <Form
            name="register"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 3, message: '用户名至少3个字符' },
              ]}
            >
              <Input
                prefix={<User size={token.fontSizeLG} />}
                placeholder="用户名"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                prefix={<Mail size={token.fontSizeLG} />}
                placeholder="邮箱"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="nickname"
              rules={[{ required: false }]}
            >
              <Input
                prefix={<User size={token.fontSizeLG} />}
                placeholder="昵称（可选）"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Input.Password
                prefix={<Lock size={token.fontSizeLG} />}
                placeholder="密码"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password_confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock size={token.fontSizeLG} />}
                placeholder="确认密码"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                注册
              </Button>
            </Form.Item>

            <Flex justify="center" gap="small">
              <Typography.Text>已有账号？</Typography.Text>
              <Link to="/login">立即登录</Link>
            </Flex>
          </Form>
        </Card>
      </Flex>
    </Layout>
  );
};

export default RegisterPage;
