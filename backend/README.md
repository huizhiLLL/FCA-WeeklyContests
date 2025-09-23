# FCA 后端接口文档

## 基础信息

- **后端域名**: `https://fcabackend.hzcubing.club`
- **技术栈**: Laf 云函数 + MongoDB
- **代码模板**: 
```javascript
import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  // 接口逻辑
}
```

## 数据库集合

### 1. schoolRecords (校记录集合)
```javascript
{
  _id: "记录ID",
  project: "项目名称", // 如: "三阶", "四阶" 等
  name: "姓名",
  grade: "年级", // 如: "23级本", "24级研" 等
  single: "单次成绩", // 如: "5.89"
  average: "平均成绩", // 如: "7.98"
  date: "日期", // 如: "2023.04.02"
  competition: "比赛名称",
  isCurrent: true, // 是否为当前记录
  createdAt: "创建时间",
  updatedAt: "更新时间"
}
```

### 2. weeklyContests (周赛记录集合)
```javascript
{
  _id: "周赛ID",
  week: "周次", // 如: "第1周"
  date: "日期", // 如: "2024-05-20"
  contests: [
    {
      project: "项目名称",
      results: [
        {
          name: "选手姓名",
          rounds: 1,
          single: "单次成绩",
          average: "平均成绩",
          times: ["8.45", "9.67", "10.45", "11.23", "12.01"],
          ranking: 1
        }
      ]
    }
  ],
  createdAt: "创建时间",
  updatedAt: "更新时间"
}
```

## 接口列表

### 校记录相关

#### 1. 获取校记录
- **接口名**: `get-records`
- **方法**: GET
- **URL**: `https://fcabackend.hzcubing.club/get-records`
- **参数**:
  - `project` (可选): 项目名称
  - `isCurrent` (可选): 是否当前记录 (true/false)
- **返回**: 校记录列表

#### 2. 创建校记录
- **接口名**: `create-record`
- **方法**: POST
- **URL**: `https://fcabackend.hzcubing.club/create-record`
- **参数**:
  - `project`: 项目名称 (必填)
  - `name`: 姓名 (必填)
  - `grade`: 年级 (必填)
  - `single`: 单次成绩 (可选)
  - `average`: 平均成绩 (可选)
  - `date`: 日期 (必填)
  - `competition`: 比赛名称 (必填)
- **返回**: 创建的记录信息

#### 3. 更新校记录
- **接口名**: `update-record`
- **方法**: POST
- **URL**: `https://fcabackend.hzcubing.club/update-record`
- **参数**:
  - `_id`: 记录ID (必填)
  - 其他字段同创建接口
- **返回**: 更新结果

#### 4. 删除校记录
- **接口名**: `delete-record`
- **方法**: GET
- **URL**: `https://fcabackend.hzcubing.club/delete-record`
- **参数**:
  - `_id`: 记录ID (必填)
- **返回**: 删除结果

### 周赛记录相关

#### 5. 获取周赛记录
- **接口名**: `get-contests`
- **方法**: GET
- **URL**: `https://fcabackend.hzcubing.club/get-contests`
- **参数**:
  - `week` (可选): 周次
  - `project` (可选): 项目名称
- **返回**: 周赛记录列表

#### 6. 创建周赛记录
- **接口名**: `create-contest`
- **方法**: POST
- **URL**: `https://fcabackend.hzcubing.club/create-contest`
- **参数**:
  - `week`: 周次 (必填)
  - `date`: 日期 (必填)
  - `contests`: 比赛数据数组 (必填)
- **返回**: 创建的周赛记录信息

#### 7. 更新周赛记录
- **接口名**: `update-contest`
- **方法**: POST
- **URL**: `https://fcabackend.hzcubing.club/update-contest`
- **参数**:
  - `_id`: 周赛ID (必填)
  - 其他字段同创建接口
- **返回**: 更新结果

#### 8. 删除周赛记录
- **接口名**: `delete-contest`
- **方法**: GET
- **URL**: `https://fcabackend.hzcubing.club/delete-contest`
- **参数**:
  - `_id`: 周赛ID (必填)
- **返回**: 删除结果

### 统计相关

#### 9. 获取统计数据
- **接口名**: `get-stats`
- **方法**: GET
- **URL**: `https://fcabackend.hzcubing.club/get-stats`
- **参数**: 无
- **返回**: 统计数据
  - `totalRecords`: 校记录总数
  - `totalContests`: 周赛总数
  - `totalParticipants`: 参赛选手总数
  - `activeUsers`: 活跃用户数

## 响应格式

所有接口都返回统一的响应格式：

```javascript
{
  code: 200, // 状态码: 200成功, 400参数错误, 404未找到, 409冲突, 500服务器错误
  message: "操作结果描述",
  data: {}, // 具体数据
  error: "错误信息" // 仅在错误时返回
}
```

## 部署说明

1. 在 Sealos 控制台中创建云函数
2. 将对应的接口代码复制到云函数中
3. 配置函数名称为接口名称（如：get-records）
4. 确保 MongoDB 集合已创建并配置索引
5. 测试接口功能

## 数据库索引建议

### schoolRecords 集合
- `project`: 1
- `isCurrent`: 1
- `date`: -1

### weeklyContests 集合
- `week`: 1
- `date`: -1
