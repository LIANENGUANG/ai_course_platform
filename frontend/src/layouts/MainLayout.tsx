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
  const { token } = theme.useToken();
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
      key: 'learning',
      icon: <BookOutlined />,
      label: '学习中心',
      children: [
        { key: '/learning/video', label: '视频课程' },
        { key: '/learning/live', label: '直播课程' },
        { key: '/learning/offline', label: '线下课程' },
        { key: '/learning/history', label: '学习历史' },
        { key: '/learning/notes', label: '我的笔记' },
      ],
    },
    {
      key: 'homework',
      icon: <BookOutlined />,
      label: '作业管理',
      children: [
        { key: '/homework/pending', label: '待完成' },
        { key: '/homework/submitted', label: '已提交' },
        { key: '/homework/graded', label: '已批改' },
      ],
    },
    {
      key: 'exam',
      icon: <BookOutlined />,
      label: '考试中心',
      children: [
        { key: '/exam/upcoming', label: '即将开始' },
        { key: '/exam/history', label: '考试记录' },
        { key: '/exam/certificate', label: '证书管理' },
      ],
    },
    {
      key: 'community',
      icon: <BookOutlined />,
      label: '社区交流',
      children: [
        { key: '/community/discussion', label: '讨论区' },
        { key: '/community/qa', label: '问答' },
        { key: '/community/activities', label: '活动' },
      ],
    },
    {
      key: 'resources',
      icon: <BookOutlined />,
      label: '资源库',
      children: [
        { key: '/resources/documents', label: '文档资料' },
        { key: '/resources/videos', label: '视频资源' },
        { key: '/resources/downloads', label: '下载中心' },
      ],
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
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: token.colorBgContainer,
          borderBottom: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
          padding: `0 ${token.paddingLG}px`,
        }}
      >
        <div style={{ marginRight: token.marginLG, fontSize: token.fontSizeLG, fontWeight: 'bold' }}>
          AI 课程平台
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={getSelectedKeys()}
          items={headerMenuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: token.margin }}>
          <Tooltip title={mode === 'dark' ? '切换到浅色模式' : '切换到深色模式'}>
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
            />
          </Tooltip>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: token.marginXS, cursor: 'pointer' }}>
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
      <Layout style={{ height: `calc(100vh - ${token.sizeXXL}px)`, overflow: 'hidden' }}>
        <Sider width={200} style={{ overflowY: 'auto', height: '100%' }}>
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            defaultOpenKeys={getOpenKeys()}
            style={{ borderInlineEnd: 0, height: '100%' }}
            items={siderMenuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: `0 ${token.paddingLG}px ${token.paddingLG}px` }}>
            <Breadcrumb items={getBreadcrumbItems()} style={{ margin: `${token.margin}px 0` }} />
            <Content
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <Outlet />
            </Content>
          </div>
          <Footer style={{ textAlign: 'center', padding: `${token.paddingXS}px ${token.paddingLG}px` }}>
            <div>
              AI 课程平台 ©2026 Created by AI Team
              {' | '}
              <Link to="/about">关于我们</Link>
              {' | '}
              <Link to="/contact">联系我们</Link>
              {' | '}
              <Link to="/privacy">隐私政策</Link>
            </div>
            <div style={{ marginTop: token.marginXS, color: token.colorTextSecondary }}>
              ICP备案号：京ICP备xxxxx号
            </div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
