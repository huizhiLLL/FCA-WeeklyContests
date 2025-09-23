# FCA 后端接口部署指南

## 部署环境

- **平台**: Sealos 云开发平台
- **后端域名**: `https://fcabackend.hzcubing.club`
- **数据库**: MongoDB (Sealos 云数据库)
- **云函数**: Laf 云函数

## 部署步骤

### 1. 创建数据库集合

在 Sealos 控制台中创建以下 MongoDB 集合：

#### schoolRecords 集合
```javascript
// 集合名称: schoolRecords
// 索引建议:
{
  "project": 1,
  "isCurrent": 1,
  "date": -1
}
```

#### weeklyContests 集合
```javascript
// 集合名称: weeklyContests
// 索引建议:
{
  "week": 1,
  "date": -1
}
```

### 2. 部署云函数

在 Sealos 控制台中为每个接口创建云函数：

#### 校记录相关接口
1. **get-records** - 获取校记录
2. **create-record** - 创建校记录
3. **update-record** - 更新校记录
4. **delete-record** - 删除校记录

#### 周赛记录相关接口
5. **get-contests** - 获取周赛记录
6. **create-contest** - 创建周赛记录
7. **update-contest** - 更新周赛记录
8. **delete-contest** - 删除周赛记录

#### 统计相关接口
9. **get-stats** - 获取统计数据

### 3. 云函数配置

每个云函数需要配置：

```javascript
// 函数名称: 接口名称 (如: get-records)
// 运行时: Node.js
// 入口文件: index.js
// 环境变量: 无特殊要求
```

### 4. 测试接口

部署完成后，可以通过以下方式测试：

```bash
# 测试获取校记录
curl "https://fcabackend.hzcubing.club/get-records"

# 测试创建校记录
curl -X POST "https://fcabackend.hzcubing.club/create-record" \
  -H "Content-Type: application/json" \
  -d '{
    "project": "三阶",
    "name": "测试用户",
    "grade": "24级本",
    "single": "10.00",
    "average": "12.00",
    "date": "2024-01-01",
    "competition": "测试比赛"
  }'

# 测试获取统计数据
curl "https://fcabackend.hzcubing.club/get-stats"
```

## 接口测试

### 1. 校记录接口测试

```javascript
// 获取所有校记录
fetch('https://fcabackend.hzcubing.club/get-records')
  .then(res => res.json())
  .then(data => console.log(data));

// 获取三阶记录
fetch('https://fcabackend.hzcubing.club/get-records?project=三阶')
  .then(res => res.json())
  .then(data => console.log(data));

// 创建新记录
fetch('https://fcabackend.hzcubing.club/create-record', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    project: '三阶',
    name: '张三',
    grade: '24级本',
    single: '8.50',
    average: '10.20',
    date: '2024-01-15',
    competition: '2024WCA测试赛'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### 2. 周赛记录接口测试

```javascript
// 获取所有周赛记录
fetch('https://fcabackend.hzcubing.club/get-contests')
  .then(res => res.json())
  .then(data => console.log(data));

// 创建周赛记录
fetch('https://fcabackend.hzcubing.club/create-contest', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    week: '第1周',
    date: '2024-01-15',
    contests: [{
      project: '三阶',
      results: [{
        name: '张三',
        rounds: 1,
        single: '8.50',
        average: '10.20',
        times: ['8.50', '9.80', '10.20', '11.00', '12.30'],
        ranking: 1
      }]
    }]
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 注意事项

1. **数据库权限**: 确保云函数有读写数据库的权限
2. **CORS 配置**: 如果前端和后端域名不同，需要配置 CORS
3. **错误处理**: 所有接口都包含完整的错误处理
4. **数据验证**: 创建和更新接口包含参数验证
5. **索引优化**: 建议为常用查询字段创建索引

## 监控和维护

1. **日志监控**: 查看云函数执行日志
2. **性能监控**: 监控接口响应时间
3. **错误监控**: 监控接口错误率
4. **数据备份**: 定期备份数据库数据

## 故障排除

### 常见问题

1. **接口返回 500 错误**
   - 检查云函数代码是否正确
   - 检查数据库连接是否正常
   - 查看云函数执行日志

2. **数据库连接失败**
   - 检查数据库连接字符串
   - 检查网络连接
   - 检查数据库权限

3. **CORS 错误**
   - 在云函数中添加 CORS 头
   - 检查前端请求域名

### 调试方法

1. 查看 Sealos 控制台中的云函数日志
2. 使用浏览器开发者工具查看网络请求
3. 使用 Postman 等工具测试接口
4. 检查数据库中的数据是否正确
