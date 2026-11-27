export type UserRole = '管理员' | '开发者' | '访客';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export type UserFormValues = Pick<UserItem, 'name' | 'email' | 'role' | 'active'>;

const seed: UserItem[] = [
  { id: 'U1001', name: '林知远', email: 'lin.zy@example.com', role: '管理员', active: true, createdAt: '2026-01-12' },
  { id: 'U1002', name: '陈可欣', email: 'chen.kx@example.com', role: '开发者', active: true, createdAt: '2026-02-03' },
  { id: 'U1003', name: '赵一帆', email: 'zhao.yf@example.com', role: '开发者', active: true, createdAt: '2026-03-18' },
  { id: 'U1004', name: '孙明哲', email: 'sun.mz@example.com', role: '访客', active: false, createdAt: '2026-04-07' },
  { id: 'U1005', name: '周雨桐', email: 'zhou.yt@example.com', role: '开发者', active: true, createdAt: '2026-05-22' },
  { id: 'U1006', name: '吴嘉树', email: 'wu.js@example.com', role: '访客', active: true, createdAt: '2026-06-11' },
  { id: 'U1007', name: '郑思宁', email: 'zheng.sn@example.com', role: '管理员', active: true, createdAt: '2026-07-30' },
  { id: 'U1008', name: '何清越', email: 'he.qy@example.com', role: '访客', active: false, createdAt: '2026-08-19' },
];

let db: UserItem[] = [...seed];

const delay = (ms = 260) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** 模拟 GET /api/users */
export async function queryUsers(): Promise<UserItem[]> {
  await delay();
  return db.map((item) => ({ ...item }));
}

/** 模拟 POST /api/users */
export async function createUser(values: UserFormValues): Promise<UserItem> {
  await delay(180);
  const item: UserItem = {
    ...values,
    id: `U${1000 + db.length + 1}`,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  db = [item, ...db];
  return { ...item };
}

/** 模拟 PUT /api/users/:id */
export async function updateUser(id: string, values: UserFormValues): Promise<UserItem> {
  await delay(180);
  let updated: UserItem | undefined;
  db = db.map((item) => {
    if (item.id !== id) return item;
    updated = { ...item, ...values };
    return updated;
  });
  if (!updated) throw new Error('用户不存在');
  return { ...updated };
}

/** 模拟 DELETE /api/users/:id */
export async function removeUser(id: string): Promise<void> {
  await delay(180);
  db = db.filter((item) => item.id !== id);
}
