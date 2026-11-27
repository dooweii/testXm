import React, { useState } from 'react';
import {
  App as AntdApp,
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Space,
  Switch,
  Tooltip,
  Typography,
  theme,
} from 'antd';
import {
  AppstoreOutlined,
  BulbOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import zhCN from 'antd/locale/zh_CN';
import { Outlet, useLocation, useNavigate } from 'umi';

const { Header, Sider, Content, Footer } = Layout;

const MENU = [
  { key: '/', icon: <DashboardOutlined />, label: '概览' },
  { key: '/users', icon: <TeamOutlined />, label: '用户管理' },
  { key: '/about', icon: <InfoCircleOutlined />, label: '关于项目' },
];

const TITLE_MAP: Record<string, string> = {
  '/': '概览',
  '/users': '用户管理',
  '/about': '关于项目',
};

interface LayoutProps {
  children?: React.ReactNode;
}

function BasicLayout({ children, dark, onToggleTheme }: LayoutProps & {
  dark: boolean;
  onToggleTheme: (value: boolean) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const currentTitle = TITLE_MAP[location.pathname] ?? '页面';

  return (
    <div
      className="app-shell"
      style={{ background: token.colorBgLayout, color: token.colorText }}
    >
      <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          breakpoint="lg"
          width={224}
          collapsedWidth={72}
          onCollapse={setCollapsed}
          style={{
            background: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div className="app-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="app-brand-logo">
              <AppstoreOutlined />
            </span>
            {!collapsed && <span className="app-brand-text">Umi Admin</span>}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={MENU}
            onClick={({ key }) => navigate(key)}
            style={{ borderInlineEnd: 'none' }}
          />
        </Sider>

        <Layout style={{ background: 'transparent' }}>
          <Header
            className="app-header"
            style={{ background: token.colorBgContainer, borderColor: token.colorBorderSecondary }}
          >
            <div className="app-header-left">
              <Button
                type="text"
                aria-label="折叠侧边栏"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Breadcrumb items={[{ title: '首页' }, { title: currentTitle }]} />
            </div>
            <div className="app-header-right">
              <Space size={6}>
                <BulbOutlined style={{ color: token.colorTextSecondary }} />
                <Typography.Text style={{ fontSize: 13 }}>暗色</Typography.Text>
                <Switch size="small" checked={dark} onChange={onToggleTheme} />
              </Space>
              <Tooltip title="当前登录：Demo User">
                <Avatar style={{ background: token.colorPrimary }} icon={<UserOutlined />} />
              </Tooltip>
            </div>
          </Header>

          <Content className="app-content">{children ?? <Outlet />}</Content>

          <Footer className="app-footer">
            React 18 · Ant Design 6 · Umi 4 · TypeScript 5 — 示例模板
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default function RootLayout(props: LayoutProps) {
  const [dark, setDark] = useState(false);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      <AntdApp>
        <BasicLayout dark={dark} onToggleTheme={setDark} {...props} />
      </AntdApp>
    </ConfigProvider>
  );
}
