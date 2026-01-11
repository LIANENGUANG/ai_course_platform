import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Flex, Typography, Layout, theme } from 'antd';
import { User, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../../api/auth';
import { useUserStore } from '../../store/useUserStore';
import type { LoginRequest } from '../../utils/types';

const LoginPage: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginRequest) => {
    try {
      setLoading(true);
      const response = await loginApi(values);
      login(response.user, response.tokens.access, response.tokens.refresh);
      message.success('登录成功！');
      navigate('/dashboard');
    } catch (error: any) {
      message.error(error.response?.data?.error || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <Flex justify="center" align="center" style={{ minHeight: '100vh', padding: token.padding }}>
        <Card title="登录" style={{ width: '100%', maxWidth: 450 }}>
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<User size={token.fontSizeLG} />}
                placeholder="用户名"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<Lock size={token.fontSizeLG} />}
                placeholder="密码"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                登录
              </Button>
            </Form.Item>

            <Flex justify="center" gap="small">
              <Typography.Text>还没有账号？</Typography.Text>
              <Link to="/register">立即注册</Link>
            </Flex>
          </Form>
        </Card>
      </Flex>
    </Layout>
  );
};

export default LoginPage;
