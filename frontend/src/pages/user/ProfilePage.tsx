import React, { useEffect, useState } from 'react';
import { Card, Avatar, Descriptions, Tag, Button, Space, message } from 'antd';
import { User as UserIcon, Edit, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { getCurrentUser } from '../../api/auth';
import type { User } from '../../utils/types';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user: storeUser, updateUser } = useUserStore();
  const [user, setUser] = useState<User | null>(storeUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await getCurrentUser();
        setUser(data);
        updateUser(data);
      } catch (error: any) {
        message.error('获取用户信息失败');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoleText = (role: string) => {
    const roleMap: Record<string, string> = {
      student: '学生',
      teacher: '教师',
      admin: '管理员',
    };
    return roleMap[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colorMap: Record<string, string> = {
      student: 'blue',
      teacher: 'green',
      admin: 'red',
    };
    return colorMap[role] || 'default';
  };

  const getGenderText = (gender: string) => {
    const genderMap: Record<string, string> = {
      male: '男',
      female: '女',
      other: '其他',
    };
    return genderMap[gender] || '未设置';
  };

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <Space direction="vertical" size="large">
      <Card loading={loading}>
        <Space direction="horizontal" size="large" align="start">
          <Avatar
            size={120}
            src={user.profile.avatar}
            icon={!user.profile.avatar && <UserIcon size={48} />}
          />
          <Space direction="vertical">
            <Space direction="vertical" size="small">
              <Space>
                <h2>{user.profile.nickname || user.username}</h2>
                <Tag color={getRoleColor(user.profile.role)}>
                  {getRoleText(user.profile.role)}
                </Tag>
              </Space>
              <p>{user.profile.bio || '这个人很懒，什么都没有留下...'}</p>
            </Space>
            <Space>
              <Button
                type="primary"
                icon={<Edit size={16} />}
                onClick={() => navigate('/profile/edit')}
              >
                编辑资料
              </Button>
              <Button
                icon={<Lock size={16} />}
                onClick={() => navigate('/profile/password')}
              >
                修改密码
              </Button>
            </Space>
          </Space>
        </Space>
      </Card>

      <Card title="基本信息" loading={loading}>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
            <Descriptions.Item label="昵称">
              {user.profile.nickname || '未设置'}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {getGenderText(user.profile.gender)}
            </Descriptions.Item>
            <Descriptions.Item label="生日">
              {user.profile.birthday || '未设置'}
            </Descriptions.Item>
            <Descriptions.Item label="角色">
              <Tag color={getRoleColor(user.profile.role)}>
                {getRoleText(user.profile.role)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="个人简介" span={2}>
              {user.profile.bio || '未设置'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
  );
};

export default ProfilePage;
