import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Breadcrumb, Switch, Tooltip, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useThemeStore } from '../store/useThemeStore';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUserStore();
  const { mode, toggleTheme } = useThemeStore();

  // Header 菜单项
  const headerMenuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      label: '首页',
    },
    {
      key: '/courses',
      label: '我的课程',
    },
  ];

  // Sider 菜单项
  const siderMenuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: '我的课程',
    },
    {
      key: 'user',
      icon: <UserOutlined />,
      label: '个人中心',
      children: [
        {
          key: '/profile',
          label: '个人信息',
        },
        {
          key: '/profile/edit',
          label: '编辑资料',
        },
        {
          key: '/profile/password',
          label: '修改密码',
        },
      ],
    },
  ];

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账号设置',
      onClick: () => navigate('/profile/edit'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: async () => {
        await logout();
        navigate('/login');
      },
    },
  ];

  // 处理菜单点击
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key && !key.startsWith('user')) {
      navigate(key);
    }
  };

  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.startsWith('/profile/edit')) return ['/profile/edit'];
    if (path.startsWith('/profile/password')) return ['/profile/password'];
    if (path.startsWith('/profile')) return ['/profile'];
    if (path.startsWith('/courses')) return ['/courses'];
    return ['/dashboard'];
  };

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.startsWith('/profile')) return ['user'];
    return [];
  };

  // 生成面包屑
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [{ title: '首页' }];

    if (path.startsWith('/courses')) {
      items.push({ title: '我的课程' });
    } else if (path.startsWith('/profile')) {
      items.push({ title: '个人中心' });
      if (path === '/profile/edit') {
        items.push({ title: '编辑资料' });
      } else if (path === '/profile/password') {
        items.push({ title: '修改密码' });
      } else {
        items.push({ title: '个人信息' });
      }
    }

    return items;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div>AI 课程平台</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={getSelectedKeys()}
          items={headerMenuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Tooltip title={mode === 'dark' ? '切换到浅色模式' : '切换到深色模式'}>
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
            />
          </Tooltip>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Avatar
                src={user?.profile.avatar}
                icon={!user?.profile.avatar && <UserOutlined />}
                size="default"
              />
              <span>{user?.profile.nickname || user?.username}</span>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout style={{ flex: 1 }}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            defaultOpenKeys={getOpenKeys()}
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={siderMenuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb items={getBreadcrumbItems()} style={{ margin: '16px 0' }} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center', padding: '8px 50px', background: '#001529', color: 'rgba(255, 255, 255, 0.85)' }}>
        <div>
          AI 课程平台 ©2026 Created by AI Team
          {' | '}
          <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>关于我们</Link>
          {' | '}
          <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>联系我们</Link>
          {' | '}
          <Link to="/privacy" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>隐私政策</Link>
        </div>
        <div>ICP备案号：京ICP备xxxxx号</div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
