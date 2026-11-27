/** 项目技术栈版本，安装前已通过 npm registry 校验 */
export const STACK_VERSIONS = {
  react: '18.3.1',
  reactDom: '18.3.1',
  antd: '6.7.0',
  icons: '6.3.4',
  umi: '4.7.32',
  typescript: '5.9.3',
  dayjs: '1.11.23',
  node: '22.x（要求 >= 18）',
} as const;

export const COMMANDS = [
  { cmd: 'npm install', desc: '安装依赖（含 umi setup 自动生成 src/.umi）' },
  { cmd: 'npm run dev', desc: '启动开发服务器，默认 http://localhost:8000' },
  { cmd: 'npm run build', desc: '生产构建，产物输出到 dist/' },
  { cmd: 'npm run typecheck', desc: 'TypeScript 类型检查' },
] as const;

export const PROJECT_TREE = `reactxm/
├── .umirc.ts                # Umi 4 全局配置（路由 / 标题 / 代理）
├── tsconfig.json            # TypeScript 配置（@ 指向 src）
├── public/favicon.svg
└── src/
    ├── global.css           # 全局样式
    ├── constants/           # 版本、命令等静态数据
    ├── layouts/index.tsx    # 全局布局 + ConfigProvider + 主题切换
    ├── services/user.ts     # 模拟数据层（换成真实接口即可）
    └── pages/
        ├── index.tsx        # 概览 Dashboard
        ├── users.tsx        # 用户管理（表格 / 表单 / 弹窗）
        └── about.tsx        # 关于项目`;

export const V6_NOTES = [
  'antd 6 要求 React >= 18，已移除对 React 17 及以下的支持。',
  '@ant-design/icons 必须同步升级到 6.x，与 antd 5 不兼容。',
  '默认启用纯 CSS Variables，不再支持 IE；主题切换无需重新注入样式。',
  'v6 保留了 v5 的组件 API，但大量属性改为 classNames / styles 语义化写法。',
  'Tag 不再自带右侧外边距；Modal、Drawer 的遮罩默认带模糊效果。',
] as const;
