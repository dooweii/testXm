import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import {
  createUser,
  queryUsers,
  removeUser,
  updateUser,
  type UserFormValues,
  type UserItem,
  type UserRole,
} from '@/services/user';

type Columns = NonNullable<TableProps<UserItem>['columns']>;

const ROLE_COLORS: Record<UserRole, string> = {
  管理员: 'geekblue',
  开发者: 'blue',
  访客: 'default',
};

const INITIAL_VALUES: UserFormValues = {
  name: '',
  email: '',
  role: '开发者',
  active: true,
};

export default function UsersPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm<UserFormValues>();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UserItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setUsers(await queryUsers());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(k) || u.email.toLowerCase().includes(k) || u.id.toLowerCase().includes(k),
    );
  }, [keyword, users]);

  const openModal = (record?: UserItem) => {
    setEditing(record ?? null);
    form.setFieldsValue(record ?? INITIAL_VALUES);
    setOpen(true);
  };

  const handleSubmit = async (values: UserFormValues) => {
    setSubmitting(true);
    try {
      if (editing) {
        await updateUser(editing.id, values);
        message.success('用户信息已更新');
      } else {
        await createUser(values);
        message.success('新用户已创建');
      }
      setOpen(false);
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await removeUser(id);
    message.success('已删除该用户');
    await load();
  };

  const columns: Columns = [
    {
      title: '用户',
      dataIndex: 'name',
      width: 190,
      render: (name: string, record) => (
        <div className="user-cell">
          <Avatar style={{ background: '#1677ff' }} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>{record.id}</Typography.Text>
          </div>
        </div>
      ),
    },
    { title: '邮箱', dataIndex: 'email' },
    {
      title: '角色',
      dataIndex: 'role',
      width: 110,
      render: (role: UserRole) => <Tag color={ROLE_COLORS[role]}>{role}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'active',
      width: 110,
      render: (active: boolean) => <Badge status={active ? 'success' : 'default'} text={active ? '启用' : '停用'} />,
    },
    { title: '创建日期', dataIndex: 'createdAt', width: 130 },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size={4}>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openModal(record)}>
            编辑
          </Button>
          <Popconfirm title="删除用户" description={`确认删除「${record.name}」？`} onConfirm={() => handleDelete(record.id)} okText="删除" okButtonProps={{ danger: true }} cancelText="取消">
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <h2 className="page-section-title">用户管理</h2>
        <Typography.Text type="secondary">
          演示 Table、Form、Modal、Popconfirm 与 App.useApp() 消息用法；数据来自本地模拟服务，替换 services/user.ts 即可接入真实接口。
        </Typography.Text>
      </div>

      <Card>
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            <Input.Search
              allowClear
              placeholder="搜索姓名 / 邮箱 / 编号"
              style={{ width: 260 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>共 {filtered.length} 条记录</Typography.Text>
          </div>
          <div className="table-toolbar-right">
            <Button icon={<ReloadOutlined />} onClick={() => void load()} loading={loading}>刷新</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>新增用户</Button>
          </div>
        </div>

        <Table<UserItem>
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          loading={loading}
          scroll={{ x: 860 }}
          pagination={{ pageSize: 6, showSizeChanger: true, showTotal: (total) => `共 ${total} 人` }}
        />
      </Card>

      <Modal
        title={editing ? `编辑用户 · ${editing.name}` : '新增用户'}
        open={open}
        okText="保存"
        cancelText="取消"
        confirmLoading={submitting}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        afterClose={() => form.resetFields()}
      >
        <Form<UserFormValues> form={form} layout="vertical" initialValues={INITIAL_VALUES} onFinish={handleSubmit} style={{ marginTop: 20 }}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="例如：张三" maxLength={20} />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }]}>
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select
              options={(['管理员', '开发者', '访客'] as UserRole[]).map((role) => ({ label: role, value: role }))}
            />
          </Form.Item>
          <Form.Item name="active" label="账号状态" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="停用" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
