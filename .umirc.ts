import { defineConfig } from 'umi';

export default defineConfig({
  npmClient: 'npm',
  title: 'React 18 · antd 6 · Umi 4',
  favicons: ['/favicon.svg'],
  // 配置式路由：所有页面共享 src/layouts/index.tsx 全局布局
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index', name: '概览' },
        { path: '/users', component: '@/pages/users', name: '用户管理' },
        { path: '/about', component: '@/pages/about', name: '关于项目' },
      ],
    },
  ],
  // 关闭 MFSU 预编译，避免 antd 6 纯 CSS Variables 产物在预编译缓存中出现样式缺失
  mfsu: false,
  // 路由分包后 esbuild 压缩的 helper 变量名可能重复，开启 IIFE 包裹消除冲突
  esbuildMinifyIIFE: true,
  // 需要后端时打开：
  // proxy: {
  //   '/api': { target: 'http://127.0.0.1:8080', changeOrigin: true },
  // },
});
