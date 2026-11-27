import React from 'react';
import { Alert, Card, Descriptions, Divider, Space, Table, Tag, Typography } from 'antd';
import { STACK_VERSIONS, COMMANDS, PROJECT_TREE, V6_NOTES } from '@/constants/versions';

export default function AboutPage() {
  
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <h2 className="page-section-title">关于项目</h2>
        <Typography.Text type="secondary">
          一个保持版本克制、依赖精简的 React 中后台启动模板：不用 @umijs/max 或 ProLayout，避免它们自带的 antd 5 依赖与 antd 6 冲突。
        </Typography.Text>
      </div>

      <Card title="版本清单">
        <Descriptions
          bordered
          size="small"
          column={{ xs: 1, sm: 2, lg: 3 }}
          items={[
            { key: 'react', label: 'react / react-dom', children: <Tag color="blue">{STACK_VERSIONS.react}</Tag> },
            { key: 'antd', label: 'antd', children: <Tag color="blue">{STACK_VERSIONS.antd}</Tag> },
            { key: 'icons', label: '@ant-design/icons', children: <Tag color="blue">{STACK_VERSIONS.icons}</Tag> },
            { key: 'umi', label: 'umi', children: <Tag color="blue">{STACK_VERSIONS.umi}</Tag> },
            { key: 'ts', label: 'typescript', children: <Tag color="blue">{STACK_VERSIONS.typescript}</Tag> },
            { key: 'dayjs', label: 'dayjs', children: <Tag color="blue">{STACK_VERSIONS.dayjs}</Tag> },
            { key: 'node', label: 'Node.js', children: STACK_VERSIONS.node },
          ]}
        />
      </Card>

      <Card title="常用命令">
        <Table
          rowKey="cmd"
          size="small"
          pagination={false}
          dataSource={COMMANDS.map((item) => ({ ...item }))}
          columns={[
            { title: '命令', dataIndex: 'cmd', width: 200, render: (v: string) => <Typography.Text code>{v}</Typography.Text> },
            { title: '说明', dataIndex: 'desc' },
          ]}
        />
      </Card>

      <Card title="目录结构">
        <pre className="code-block">{PROJECT_TREE}</pre>
        <Divider style={{ margin: '16px 0' }} />
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          路由、标题、代理在 .umirc.ts 中配置；全局布局与主题在 src/layouts/index.tsx；业务页面放 src/pages。
        </Typography.Paragraph>
      </Card>

      <Alert
        type="info"
        showIcon
        title="Ant Design 6 注意事项"
        description={
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.9 }}>
            {V6_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        }
      />
    </Space>
  );
}
