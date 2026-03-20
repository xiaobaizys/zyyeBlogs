# zyye博客系统 - GitHub部署指南

## 前置条件

1. 确保已安装Git
2. 拥有GitHub账号：xiaobaizys
3. 邮箱：zys6606@163.com

## 方法一：使用Git命令行部署

### 1. 初始化Git仓库（已完成）

```bash
git init
```

### 2. 配置Git用户信息（已完成）

```bash
git config user.name "xiaobaizys"
git config user.email "zys6606@163.com"
```

### 3. 添加所有文件到Git（已完成）

```bash
git add .
```

### 4. 创建首次提交（已完成）

```bash
git commit -m "Initial commit: zyye博客系统"
```

### 5. 重命名主分支为main（已完成）

```bash
git branch -M main
```

### 6. 在GitHub上创建新仓库

1. 访问 https://github.com/new
2. 仓库名称：`zyyeBlogs`
3. 选择Public或Private（建议Public）
4. 不要初始化README
5. 点击"Create repository"

### 7. 添加远程仓库地址

```bash
git remote add origin https://github.com/xiaobaizys/zyyeBlogs.git
```

### 8. 推送代码到GitHub

```bash
git push -u origin main
```

**注意**：如果遇到认证错误，需要使用GitHub Personal Access Token：
1. 访问 https://github.com/settings/tokens
2. 生成新的Token（选择repo权限）
3. 使用以下命令：
```bash
git remote set-url origin https://<YOUR_TOKEN>@github.com/xiaobaizys/zyyeBlogs.git
git push -u origin main
```

## 方法二：使用GitHub Desktop（推荐）

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 打开GitHub Desktop
3. 点击 "File" → "Add Local Repository"
4. 选择你的博客项目文件夹：`D:\AA\测试\Blogs - 副本`
5. 点击"Add repository"
6. 输入仓库名称：`zyyeBlogs`
7. 点击"Create and Add Repository"
8. 在GitHub Desktop中提交并推送

## 方法三：使用VS Code集成

1. 在VS Code中安装"GitHub Pull Requests"扩展
2. 点击左侧的GitHub图标
3. 点击"Publish to GitHub"
4. 选择"Publish to a public repository"
5. 仓库名称：`zyyeBlogs`
6. 点击"Publish"

## 部署后的操作

### 启用GitHub Pages

1. 访问你的仓库：https://github.com/xiaobaizys/zyyeBlogs
2. 点击"Settings"
3. 在左侧菜单选择"Pages"
4. 在"Build and deployment"下选择：
   - Source：Deploy from a branch
   - Branch：main
   - Folder：/(root)
5. 点击"Save"

等待几分钟后，你的博客将可以通过以下地址访问：
```
https://xiaobaizys.github.io/zyyeBlogs/
```

### 自定义域名（可选）

如果你有自己的域名，可以在GitHub Pages设置中配置自定义域名。

## 项目文件说明

### 主要文件
- `index.html` - 首页
- `blog.html` - 文章列表页
- `post.html` - 文章详情页
- `about.html` - 关于页面
- `contact.html` - 联系页面
- `css/` - 样式文件目录
- `js/` - JavaScript文件目录
- `data/posts.json` - 文章数据
- `README.md` - 项目文档

### 数据文件
`data/posts.json` 包含6篇示例文章，使用占位图片服务：
- 图片URL格式：`https://placehold.co/600x400/<颜色>/ffffff?text=Blog+Post+N`

## 常见问题

### 1. CORS错误
如果直接用浏览器打开HTML文件，会看到CORS错误。这是正常的，因为：
- 浏览器不允许从`file://`协议fetch资源
- 解决方法：使用HTTP服务器（如Live Server）或部署到GitHub Pages

### 2. 图片加载失败
如果占位图片无法加载：
- 尝试替换为其他图片服务
- 或使用本地图片：`assets/images/`

### 3. Git推送失败
如果遇到认证错误：
- 检查GitHub Token权限
- 确保Token有repo权限
- 尝试使用HTTPS方式推送

## 验证部署

部署成功后，检查以下内容：

1. 访问 https://github.com/xiaobaizys/zyyeBlogs
2. 确认所有文件都已上传
3. 检查GitHub Pages是否正常生成
4. 访问 https://xiaobaizys.github.io/zyyeBlogs/

## 后续更新

更新博客内容后：

```bash
git add .
git commit -m "更新描述"
git push
```

GitHub Pages会自动重新部署。

## 技术支持

如遇到问题，可以：
1. 查看GitHub官方文档：https://docs.github.com/
2. 查看Git文档：https://git-scm.com/docs
3. 在GitHub上提交Issue：https://github.com/xiaobaizys/zyyeBlogs/issues