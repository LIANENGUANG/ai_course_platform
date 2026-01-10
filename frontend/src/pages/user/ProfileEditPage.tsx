import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Radio, DatePicker, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useUserStore } from '../../store/useUserStore';
import { updateProfile } from '../../api/auth';
import type { UpdateProfileRequest } from '../../utils/types';

const { TextArea } = Input;

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUserStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        nickname: user.profile.nickname,
        gender: user.profile.gender,
        birthday: user.profile.birthday ? dayjs(user.profile.birthday) : null,
        bio: user.profile.bio,
        avatar: user.profile.avatar,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const data: UpdateProfileRequest = {
        nickname: values.nickname,
        gender: values.gender,
        birthday: values.birthday ? dayjs(values.birthday).format('YYYY-MM-DD') : null,
        bio: values.bio,
        avatar: values.avatar,
      };

      const updatedUser = await updateProfile(data);
      updateUser(updatedUser);
      message.success('个人信息更新成功！');
      navigate('/profile');
    } catch (error: any) {
      message.error('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="编辑个人资料">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
            <Radio value="other">其他</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="生日"
          name="birthday"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="头像 URL"
          name="avatar"
        >
          <Input placeholder="请输入头像图片链接" />
        </Form.Item>

        <Form.Item
          label="个人简介"
          name="bio"
        >
          <TextArea
            rows={4}
            placeholder="介绍一下自己吧"
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存修改
            </Button>
            <Button onClick={() => navigate('/profile')}>
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileEditPage;
