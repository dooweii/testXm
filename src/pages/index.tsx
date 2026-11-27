import React from 'react';
import { Button, Card, Col, Descriptions, Row, Space, Statistic, Tag, Timeline, Typography, theme } from 'antd';
import {
  ArrowUpOutlined,
  CloudServerOutlined,
  RocketOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'umi';
import { STACK_VERSIONS } from '@/constants/versions';

const TREND = [32, 41, 38, 52, 47, 63, 58, 72, 68, 84, 79, 96];
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const CARDS = [
  { title: '活跃用户', value: 1286, suffix: '人', icon: <TeamOutlined />, color: '#1677ff', bg: 'rgba(22,119,255,.12)', rate: '12.5%' },
  { title: '今日请求', value: 48632, suffix: '次', icon: <ThunderboltOutlined />, color: '#722ed1', bg: 'rgba(114,46,209,.12)', rate: '8.2%' },
  { title: '服务可用率', value: 99.96, suffix: '%', icon: <CloudServerOutlined />, color: '#13a8a8', bg: 'rgba(19,168,168,.12)', rate: '0.03%' },
  { title: '已发布版本', value: 24, suffix: '个', icon: <RocketOutlined />, color: '#fa8c16', bg: 'rgba(250,140,22,.12)', rate: '3 个' },
];

function TrendChart() {
  const { token } = theme.useToken();
  const width = 640;
  const height = 220;
  const left = 42;
  const bottom = 186;
  const top = 20;
  const max = 110;
  const step = (width - left - 20) / (TREND.length - 1);
  const pts = TREND.map((v, i) => [left + i * step, bottom - (v / max) * (bottom - top)] as const);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${bottom} L ${left} ${bottom} Z`;




  return (
    <svg className="chart-wrap" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="年度活跃趋势折线图">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={token.colorPrimary} stopOpacity="0.28" />
          <stop offset="100%" stopColor={token.colorPrimary} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => {
        const y = top + ((bottom - top) / 3) * i;
        return (
          <g key={i}>
            <line x1={left} y1={y} x2={width - 20} y2={y} stroke={token.colorBorderSecondary} strokeDasharray="4 6" />
            <text x={left - 10} y={y + 4} textAnchor="end" fontSize="11" fill={token.colorTextTertiary}>
              {Math.round(max - (max / 3) * i)}
            </text>
          </g>
        );
      })}
      <path d={area} fill="url(#trendFill)" />
      <path d={line} fill="none" stroke={token.colorPrimary} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={token.colorBgContainer} stroke={token.colorPrimary} strokeWidth="2" />
      ))}
      {MONTHS.map((m, i) => (
        <text key={m} x={left + i * step} y={height - 10} textAnchor="middle" fontSize="10.5" fill={token.colorTextTertiary}>
          {m}
        </text>
      ))}
    </svg>
  );
}

export default function DashboardPage() {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <section className="hero-banner">
        <h1 className="hero-title">欢迎使用 Umi Admin 👋</h1>
        <p className="hero-desc">
          这是一个基于 React 18、Ant Design 6 与 Umi 4 的开箱即用的中后台模板，包含全局布局、暗色主题、路由、表格表单与模拟数据层。
        </p>
        <div className="hero-tags">
          <Space wrap size={[8, 8]}>
            <Tag>React {STACK_VERSIONS.react}</Tag>
            <Tag>antd {STACK_VERSIONS.antd}</Tag>
            <Tag>Umi {STACK_VERSIONS.umi}</Tag>
            <Tag>TypeScript {STACK_VERSIONS.typescript}</Tag>
            <Button type="link" style={{ color: '#fff', paddingInline: 4 }} onClick={() => navigate('/users')}>
              查看用户管理 →
            </Button>
          </Space>
        </div>
      </section>

      <Row gutter={[16, 16]}>
        {CARDS.map((item) => (
          <Col key={item.title} xs={24} sm={12} xl={6}>
            <Card className="stat-card" styles={{ body: { padding: 20 } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Statistic title={item.title} value={item.value} precision={item.title === '服务可用率' ? 2 : 0} suffix={item.suffix} />
                <span className="stat-icon" style={{ background: item.bg, color: item.color }}>
                  {item.icon}
                </span>
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: token.colorTextSecondary }}>
                <ArrowUpOutlined style={{ color: token.colorSuccess, marginRight: 6 }} />
                较上月 +{item.rate}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="年度活跃趋势" extra={<Tag color="blue">2026</Tag>}>
            <TrendChart />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="最近动态" style={{ height: '100%' }}>
            <Timeline
              items={[
                { color: 'blue', children: '项目脚手架初始化完成，依赖安装成功' },
                { color: 'green', children: '接入 antd 6 纯 CSS Variables 主题' },
                { color: 'green', children: '用户管理页面联调模拟数据层' },
                { children: '配置 Umi 4 路由与全局布局' },
                { color: 'gray', children: '等待接入真实后端 API' },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Card title="技术栈">
        <Descriptions
          column={{ xs: 1, sm: 2, lg: 3 }}
          items={[
            { key: 'react', label: 'React / React DOM', children: STACK_VERSIONS.react },
            { key: 'antd', label: 'Ant Design', children: STACK_VERSIONS.antd },
            { key: 'icons', label: '@ant-design/icons', children: STACK_VERSIONS.icons },
            { key: 'umi', label: 'Umi', children: STACK_VERSIONS.umi },
            { key: 'ts', label: 'TypeScript', children: STACK_VERSIONS.typescript },
            { key: 'node', label: 'Node.js', children: STACK_VERSIONS.node },
          ]}
        />
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          所有版本均已按 npm registry 实际可安装版本锁定在 6.x / 4.x / 18.x 范围内。
        </Typography.Paragraph>
      </Card>
    </Space>
  );
}
