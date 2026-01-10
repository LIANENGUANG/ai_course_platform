import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api/auth';
import type { ChangePasswordRequest } from '../../utils/types';

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ChangePasswordRequest & { new_password_confirm: string }) => {
    try {
      setLoading(true);
      await changePassword({
        old_password: values.old_password,
        new_password: values.new_password,
      });
      message.success('密码修改成功！');
      form.resetFields();
      navigate('/profile');
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData?.old_password) {
        message.error('当前密码错误');
      } else if (errorData?.new_password) {
        message.error(errorData.new_password[0]);
      } else {
        message.error('修改密码失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="修改密码">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="当前密码"
          name="old_password"
          rules={[{ required: true, message: '请输入当前密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入当前密码"
          />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="new_password"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码至少6个字符' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入新密码（至少6个字符）"
          />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="new_password_confirm"
          dependencies={['new_password']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请再次输入新密码"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            修改密码
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/profile')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePasswordPage;
