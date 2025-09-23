# 魔方周赛记录系统 - 前端

## 项目概述

这是一个基于纯 HTML、CSS、JavaScript 的魔方周赛记录系统前端，采用模块化架构设计，支持 PWA 功能。

## 文件结构

```
frontend/
├── index.html                 # 首页
├── school-records.html        # 校记录页面
├── weekly-contests.html       # 周赛记录页面
├── admin.html                 # 管理后台页面
├── manifest.json              # PWA 清单文件
├── sw.js                      # Service Worker
├── assets/
│   ├── css/
│   │   ├── styles.css         # 全局样式
│   │   ├── components.css     # 组件样式
│   │   └── responsive.css     # 响应式样式
│   ├── js/
│   │   ├── app.js             # 主应用逻辑
│   │   ├── utils.js           # 工具函数
│   │   ├── api.js             # API 调用模块
│   │   ├── pwa.js             # PWA 功能模块
│   │   └── components/
│   │       ├── records.js     # 校记录组件
│   │       └── contests.js    # 周赛记录组件
│   └── images/                # 图片资源
└── README.md                  # 说明文档
```

## 技术特性

### 前端技术
- **HTML5**: 语义化标签，SEO 友好
- **CSS3**: 现代 CSS 特性，CSS 变量，Flexbox/Grid 布局
- **JavaScript ES6+**: 模块化架构，async/await，类语法
- **PWA**: Service Worker，离线缓存，安装提示

### 架构设计
- **模块化**: 按功能拆分 JavaScript 模块
- **组件化**: 可复用的 UI 组件
- **响应式**: 适配各种设备尺寸
- **可维护**: 清晰的代码结构和注释

## 功能模块

### 1. 首页 (index.html)
- 系统概览和统计数据
- 功能模块导航
- 最新动态展示

### 2. 校记录页面 (school-records.html)
- 当前记录展示
- 历史记录查询
- 项目筛选功能

### 3. 周赛记录页面 (weekly-contests.html)
- 周赛记录时间线
- 项目标签切换
- 成绩排名展示

### 4. 管理后台 (admin.html)
- 数据管理界面
- 记录添加/编辑/删除
- 系统统计概览

## 开发说明

### 本地开发
1. 使用支持 ES6 模块的现代浏览器
2. 通过 HTTP 服务器访问（不能直接打开文件）
3. 推荐使用 Live Server 等开发工具

### 部署
1. 将整个 `frontend` 目录上传到 GitHub Pages
2. 确保所有资源路径正确
3. 配置 Service Worker 缓存策略

### API 集成
- 当前使用模拟数据
- 需要配置 `assets/js/api.js` 中的 API 端点
- 支持 Sealos 云函数调用

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 许可证

© 2024 魔方周赛记录系统. 保留所有权利.
