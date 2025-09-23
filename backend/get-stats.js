import cloud from '@lafjs/cloud'

export default async function (ctx) { // FunctionContext
  try {
    const db = cloud.database();
    
    // 获取校记录总数
    const recordsResult = await db.collection('schoolRecords')
      .where({ isCurrent: true })
      .count();
    
    // 获取周赛总数
    const contestsResult = await db.collection('weeklyContests')
      .count();
    
    // 获取参赛选手数量（从周赛记录中统计）
    const allContests = await db.collection('weeklyContests').get();
    const participants = new Set();
    
    allContests.data.forEach(week => {
      week.contests.forEach(contest => {
        contest.results.forEach(result => {
          participants.add(result.name);
        });
      });
    });
    
    // 获取活跃用户数（最近30天有活动的用户）
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRecords = await db.collection('schoolRecords')
      .where({
        createdAt: db.command.gte(thirtyDaysAgo)
      })
      .get();
    
    const activeUsers = new Set();
    recentRecords.data.forEach(record => {
      activeUsers.add(record.name);
    });
    
    const stats = {
      totalRecords: recordsResult.total,
      totalContests: contestsResult.total,
      totalParticipants: participants.size,
      activeUsers: activeUsers.size
    };
    
    return {
      code: 200,
      message: '获取统计数据成功',
      data: stats
    };
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return {
      code: 500,
      message: '获取统计数据失败',
      error: error.message
    };
  }
}
