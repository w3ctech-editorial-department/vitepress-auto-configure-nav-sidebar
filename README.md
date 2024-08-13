# @w3ctech-editorial-department/vitepress-auto-configure-nav-sidebar

vitepress 自动生成导航栏以及边栏

## Feature

- 支持功能
  - [x] 自动生成 nav 和 sidebar 配置
  - [x] TypeScript 支持
  - [x] 目录/文件前缀设置，默认为「📂」/「✏️」，目录前缀也可能会有「📜」
  - [x] 目录/文件的过滤

## Usage

### 安装插件

```bash
pnpm add --save-dev|-D @w3ctech-editorial-department/vitepress-auto-configure-nav-sidebar
```

### 在 `vitepress` 配置中使用插件，示例如下

```js
import AutoConfigureNavSidebar from '@w3ctech-editorial-department/vitepress-auto-configure-nav-sidebar'

const { nav, sidebar } = AutoConfigureNavSidebar({
  collapsed: true,
  isCollapse: true,
  showNavIcon: false,
  singleLayerNav: true,
  showSidebarIcon: true,
  ignoreFolders: ['.vuepress'],
})

module.exports = {
  themeConfig: {
    nav,
    sidebar,
  },
}
```

## Options

| 属性                      | 类型     | 默认值 | 描述                                                                   |
| ------------------------- | -------- | ------ | ---------------------------------------------------------------------- |
| entry                     | String   | 'docs' | 设置相对于项目根目录的检索入口                                         |
| singleLayerNav            | Boolean  | false  | 是否设置单层 nav                                                       |
| showTopLevelIndexUnderNav | Boolean  | false  | 是否在 nav 展示 index                                                  |
| showSidebarIcon           | Boolean  | false  | 显示 sidebar 修饰                                                      |
| showNavIcon               | Boolean  | true   | 显示 nav 修饰                                                          |
| isCollapsible             | Boolean  | true   | sidebar 是否可折叠                                                     |
| ignoreFolders             | String[] | []     | 需要排除的一些目录                                                     |
| ignoreFiles               | String[] | []     | 需要排除的一些文件                                                     |
| filePrefix                | String   | ✏️     | 文件前缀修饰，有助于区分                                               |
| dirPrefix                 | String   | 📂     | 目录前缀修饰，有助于区分                                               |
| collapsed                 | Boolean  | false  | sidebar 默认不折叠                                                     |
| customParentFolderName    | String   | ''     | 自定义侧边栏父文件夹的显示文本，不设置或为空还是默认显示原父文件夹名   |
| customIndexFileName       | String   | ''     | 自定义侧边栏 index.md 文件的显示文本，不设置或为空还是默认显示原文件名 |
