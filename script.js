// 模拟数据
const mockData = {
    // 校记录数据（当前记录）
    schoolRecords: [
        // 三阶
        {
            project: "三阶",
            name: "薛思远",
            grade: "20级本",
            date: "2023.04.02",
            competition: "Wiler Würfel Fäscht 2023",
            single: "5.89",
            average: ""
        },
        {
            project: "三阶",
            name: "石焱泽",
            grade: "24级本",
            date: "2025.08.10",
            competition: "2025WCA淄博魔方公开赛",
            single: "",
            average: "7.98"
        },
        // 二阶
        {
            project: "二阶",
            name: "石焱泽",
            grade: "24级本",
            date: "2025.08.10",
            competition: "2025WCA淄博魔方公开赛",
            single: "1.46",
            average: ""
        },
        {
            project: "二阶",
            name: "石焱泽",
            grade: "24级本",
            date: "2025.08.10",
            competition: "2025WCA淄博魔方公开赛",
            single: "",
            average: "3.22"
        },
        // 四阶
        {
            project: "四阶",
            name: "贾若桐",
            grade: "22级本",
            date: "2025.07.26",
            competition: "2025WCA台州仙居魔方公开赛",
            single: "27.25",
            average: ""
        },
        {
            project: "四阶",
            name: "贾若桐",
            grade: "22级本",
            date: "2025.07.26",
            competition: "2025WCA台州仙居魔方公开赛",
            single: "",
            average: "31.33"
        },
        // 五阶
        {
            project: "五阶",
            name: "王子云",
            grade: "23级本",
            date: "2025.04.26",
            competition: "2025WCA南昌春季魔方赛",
            single: "56.42",
            average: ""
        },
        {
            project: "五阶",
            name: "王子云",
            grade: "23级本",
            date: "2025.04.19",
            competition: "2025WCA德清春季魔方赛",
            single: "",
            average: "1:04.69"
        },
        // 六阶
        {
            project: "六阶",
            name: "王子云",
            grade: "23级本",
            date: "2025.02.08",
            competition: "2025WCA成都春季魔方公开赛",
            single: "1:50.94",
            average: ""
        },
        {
            project: "六阶",
            name: "王子云",
            grade: "23级本",
            date: "2025.02.08",
            competition: "2025WCA成都春季魔方公开赛",
            single: "",
            average: "1:57.44"
        },
        // 七阶
        {
            project: "七阶",
            name: "樊榕",
            grade: "14级本",
            date: "2017.08.06",
            competition: "2017WCA无锡魔方公开赛",
            single: "2:50.07",
            average: ""
        },
        {
            project: "七阶",
            name: "樊榕",
            grade: "14级本",
            date: "2017.08.06",
            competition: "2017WCA无锡魔方公开赛",
            single: "",
            average: "2:58.10"
        },
        // 三阶盲拧
        {
            project: "三阶盲拧",
            name: "侯晓博",
            grade: "17级研",
            date: "2018.06.17",
            competition: "2018WCA 唐山魔方公开赛",
            single: "45.54",
            average: ""
        },
        {
            project: "三阶盲拧",
            name: "侯晓博",
            grade: "23级本",
            date: "2018.06.17",
            competition: "2018WCA 唐山魔方公开赛",
            single: "",
            average: "53.32"
        },
        // 最少步
        {
            project: "最少步",
            name: "苏涵",
            grade: "23级研",
            date: "2024.12.14",
            competition: "2024WCA粗饼最少步联赛",
            single: "26",
            average: ""
        },
        {
            project: "最少步",
            name: "苏涵",
            grade: "23级研",
            date: "2025.04.12",
            competition: "2025WCA上海安静赛",
            single: "",
            average: "30"
        },
        // 三阶单手
        {
            project: "三阶单手",
            name: "王子云",
            grade: "23级本",
            date: "2025.07.26",
            competition: "2025WCA台州仙居魔方公开赛",
            single: "13.67",
            average: ""
        },
        {
            project: "三阶单手",
            name: "王子云",
            grade: "23级本",
            date: "2025.02.08",
            competition: "2025WCA成都春季魔方公开赛",
            single: "",
            average: "16.62"
        },
        // 魔表
        {
            project: "魔表",
            name: "王子云",
            grade: "23级本",
            date: "2025.07.26",
            competition: "2025WCA台州仙居魔方公开赛",
            single: "4.01",
            average: ""
        },
        {
            project: "魔表",
            name: "王子云",
            grade: "23级本",
            date: "2025.04.26",
            competition: "2025WCA南昌春季魔方赛",
            single: "",
            average: "4.63"
        },
        // 五魔方
        {
            project: "五魔方",
            name: "王子云",
            grade: "23级本",
            date: "2025.01.04",
            competition: "2025WCA北京冬季魔方赛",
            single: "46.32",
            average: ""
        },
        {
            project: "五魔方",
            name: "王子云",
            grade: "23级本",
            date: "2025.01.04",
            competition: "2025WCA北京冬季魔方赛",
            single: "",
            average: "52.79"
        },
        // 金字塔
        {
            project: "金字塔",
            name: "王子云",
            grade: "23级本",
            date: "2025.03.15",
            competition: "2025WCA临海新人魔方赛",
            single: "2.44",
            average: ""
        },
        {
            project: "金字塔",
            name: "王子云",
            grade: "23级本",
            date: "2025.07.26",
            competition: "2025WCA台州仙居魔方公开赛",
            single: "",
            average: "4.76"
        },
        // 斜转
        {
            project: "斜转",
            name: "王子云",
            grade: "23级本",
            date: "2024.12.21",
            competition: "2024WCA盐城魔方公开赛",
            single: "2.46",
            average: ""
        },
        {
            project: "斜转",
            name: "张嘉伟",
            grade: "24级本",
            date: "2025.03.15",
            competition: "2025WCA临海新人魔方赛",
            single: "",
            average: "2.97"
        },
        // SQ1
        {
            project: "SQ1",
            name: "王子云",
            grade: "23级本",
            date: "2025.01.04",
            competition: "2025WCA北京冬季魔方赛",
            single: "14.31",
            average: ""
        },
        {
            project: "SQ1",
            name: "王子云",
            grade: "23级本",
            date: "2025.01.04",
            competition: "2025WCA北京冬季魔方赛",
            single: "",
            average: "16.80"
        },
        // 四阶盲拧
        {
            project: "四阶盲拧",
            name: "侯晓博",
            grade: "17级研",
            date: "2018.06.17",
            competition: "2018WCA 唐山魔方公开赛",
            single: "6:28.60",
            average: ""
        }
    ],

    // 历史记录数据
    historyRecords: [
        // 三阶历史记录
        
    ],

    // 周赛记录数据
    weeklyContests: [
        {
            week: "第1周",
            date: "2024-05-20",
            contests: [
                {
                    project: "三阶",
                     results: [
                         {
                             name: "A",
                             rounds: 1,
                             single: "8.45",
                             average: "10.23",
                             times: ["8.45", "9.67", "10.45", "11.23", "12.01"],
                             ranking: 1
                         },
                         {
                             name: "B",
                             rounds: 1,
                             single: "9.45",
                             average: "11.23",
                             times: ["9.45", "10.67", "11.89", "12.12", "12.78"],
                             ranking: 2
                         },
                         {
                             name: "C",
                             rounds: 1,
                             single: "10.67",
                             average: "12.45",
                             times: ["10.67", "11.23", "13.89", "12.45", "14.12"],
                             ranking: 3
                         }
                     ]
                },
                {
                    project: "四阶",
                    results: [
                        {
                            name: "D",
                            rounds: 1,
                            single: "35.67",
                            average: "38.90",
                            times: ["35.67", "37.23", "39.12", "40.45", "41.23"],
                            ranking: 1
                        },
                        {
                            name: "E",
                            rounds: 1,
                            single: "38.90",
                            average: "42.34",
                            times: ["38.90", "40.12", "43.45", "44.67", "45.23"],
                            ranking: 2
                        }
                    ]
                }
            ]
        },
        {
            week: "第2周",
            date: "2024-05-27",
            contests: [
                {
                    project: "三阶",
                     results: [
                         {
                             name: "A",
                             rounds: 1,
                             single: "7.89",
                             average: "9.45",
                             times: ["7.89", "8.34", "9.67", "10.23", "10.56"],
                             ranking: 1
                         },
                         {
                             name: "B",
                             rounds: 1,
                             single: "8.45",
                             average: "10.23",
                             times: ["8.45", "9.67", "10.89", "11.12", "11.78"],
                             ranking: 2
                         },
                         {
                             name: "C",
                             rounds: 1,
                             single: "9.12",
                             average: "11.67",
                             times: ["9.12", "10.45", "12.23", "13.45", "13.89"],
                             ranking: 3
                         }
                     ]
                },
                {
                    project: "五阶",
                    results: [
                        {
                            name: "F",
                            rounds: 1,
                            single: "1:15.45",
                            average: "1:18.90",
                            times: ["1:15.45", "1:17.67", "1:18.90", "1:22.12", "1:25.45"],
                            ranking: 1
                        }
                    ]
                }
            ]
        },
        {
            week: "第3周",
            date: "2024-06-03",
            contests: [
                {
                    project: "三阶",
                     results: [
                         {
                             name: "B",
                             rounds: 1,
                             single: "6.89",
                             average: "8.34",
                             times: ["6.89", "7.23", "8.45", "9.67", "9.89"],
                             ranking: 1
                         },
                         {
                             name: "A",
                             rounds: 1,
                             single: "7.45",
                             average: "9.12",
                             times: ["7.45", "8.67", "9.89", "10.23", "10.56"],
                             ranking: 2
                         }
                     ]
                },
                {
                    project: "四阶",
                    results: [
                        {
                            name: "C",
                            rounds: 1,
                            single: "33.12",
                            average: "36.78",
                            times: ["33.12", "35.67", "37.89", "39.23", "40.45"],
                            ranking: 1
                        },
                        {
                            name: "D",
                            rounds: 1,
                            single: "35.67",
                            average: "39.12",
                            times: ["35.67", "37.89", "40.12", "41.45", "42.78"],
                            ranking: 2
                        }
                    ]
                }
            ]
        },
        {
            week: "第4周",
            date: "2024-06-10",
            contests: [
                {
                    project: "三阶",
                     results: [
                         {
                             name: "A",
                             rounds: 1,
                             single: "6.23",
                             average: "7.89",
                             times: ["6.23", "7.45", "8.67", "9.12", "9.45"],
                             ranking: 1
                         },
                         {
                             name: "B",
                             rounds: 1,
                             single: "7.12",
                             average: "8.67",
                             times: ["7.12", "8.34", "9.45", "10.23", "10.67"],
                             ranking: 2
                         },
                         {
                             name: "C",
                             rounds: 1,
                             single: "8.45",
                             average: "10.23",
                             times: ["8.45", "9.67", "10.89", "11.12", "11.78"],
                             ranking: 3
                         }
                     ]
                },
                {
                    project: "金字塔",
                    results: [
                        {
                            name: "E",
                            rounds: 1,
                            single: "6.45",
                            average: "7.12",
                            times: ["6.45", "6.67", "7.12", "7.45", "7.78"],
                            ranking: 1
                        }
                    ]
                }
            ]
        }
    ]
};

// 工具函数
const utils = {
    // 格式化时间
    formatTime: (time) => {
        if (!time || time === '') {
            return '';
        }
        if (typeof time === 'string' && time.includes(':')) {
            return time;
        }
        const num = parseFloat(time);
        if (isNaN(num)) {
            return '';
        }
        if (num < 60) {
            return num.toFixed(2);
        } else {
            const minutes = Math.floor(num / 60);
            const seconds = (num % 60).toFixed(2);
            return `${minutes}:${seconds.padStart(5, '0')}`;
        }
    },

    // 获取排名样式类
    getRankingClass: (ranking) => {
        if (ranking === 1) return 'ranking-1';
        if (ranking === 2) return 'ranking-2';
        if (ranking === 3) return 'ranking-3';
        return 'ranking-other';
    },

    // 动画计数器
    animateCounter: (element, start, end, duration) => {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
};

// 首页功能
const homePage = {
    // 初始化首页
    init: () => {
        homePage.loadStats();
        homePage.loadRecentActivity();
    },

    // 加载统计数据
    loadStats: () => {
        const totalContests = mockData.weeklyContests.length;
        const totalParticipants = new Set();
        const totalRecords = mockData.schoolRecords.length;

        // 计算参赛选手数量
        mockData.weeklyContests.forEach(week => {
            week.contests.forEach(contest => {
                contest.results.forEach(result => {
                    totalParticipants.add(result.name);
                });
            });
        });

        // 动画显示数字
        const contestElement = document.getElementById('total-contests');
        const participantElement = document.getElementById('total-participants');
        const recordElement = document.getElementById('total-records');

        if (contestElement) utils.animateCounter(contestElement, 0, totalContests, 1000);
        if (participantElement) utils.animateCounter(participantElement, 0, totalParticipants.size, 1200);
        if (recordElement) utils.animateCounter(recordElement, 0, totalRecords, 800);
    },

    // 加载最新动态
    loadRecentActivity: () => {
        const activityList = document.getElementById('recent-activity-list');
        if (!activityList) return;

        const activities = [
            {
                type: 'record',
                title: '---',
                description: '---',
                time: '2小时前'
            },
            {
                type: 'contest',
                title: '---',
                description: '---',
                time: '1天前'
            },
            {
                type: 'achievement',
                title: '---',
                description: '---',
                time: '3天前'
            }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item fade-in-up">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <h4 style="color: var(--primary-color); font-weight: 600;">${activity.title}</h4>
                    <span style="color: var(--text-secondary); font-size: 0.875rem;">${activity.time}</span>
                </div>
                <p style="color: var(--text-secondary); margin: 0;">${activity.description}</p>
            </div>
        `).join('');
    }
};

// 校记录页面功能
const schoolRecordsPage = {
    currentView: 'current', // 当前视图：'current' 或 'history'
    
    // 初始化校记录页面
    init: () => {
        schoolRecordsPage.loadRecords();
        schoolRecordsPage.bindFilters();
    },

    // 加载校记录
    loadRecords: (filters = {}) => {
        if (schoolRecordsPage.currentView === 'current') {
            schoolRecordsPage.loadCurrentRecords(filters);
        } else {
            schoolRecordsPage.loadHistoryRecords(filters);
        }
    },

    // 加载当前记录
    loadCurrentRecords: () => {
        const currentRecords = document.getElementById('current-records');
        const historyRecords = document.getElementById('history-records');
        const currentTableBody = document.getElementById('current-records-table-body');
        const noData = document.getElementById('no-data');
        
        if (!currentRecords || !currentTableBody) return;

        // 显示当前记录，隐藏历史记录
        currentRecords.style.display = 'block';
        if (historyRecords) historyRecords.style.display = 'none';

        const records = mockData.schoolRecords;

        if (records.length === 0) {
            currentRecords.style.display = 'none';
            noData.style.display = 'block';
            return;
        }

        noData.style.display = 'none';

        // 按项目分组数据
        const groupedRecords = {};
        records.forEach(record => {
            if (!groupedRecords[record.project]) {
                groupedRecords[record.project] = [];
            }
            groupedRecords[record.project].push(record);
        });
        
        // 生成合并项目列的表格
        let tableHTML = '';
        Object.keys(groupedRecords).forEach(project => {
            const projectRecords = groupedRecords[project];
            projectRecords.forEach((record, index) => {
                if (index === 0) {
                    // 第一个记录显示项目名称并设置rowspan
                    tableHTML += `
                        <tr class="fade-in-up">
                            <td rowspan="${projectRecords.length}" class="project-cell">${record.project}</td>
                            <td>${record.name}</td>
                            <td>${record.grade}</td>
                            <td>${utils.formatTime(record.single)}</td>
                            <td>${utils.formatTime(record.average)}</td>
                            <td>${record.date}</td>
                            <td>${record.competition}</td>
                        </tr>
                    `;
                } else {
                    // 其他记录不显示项目列
                    tableHTML += `
                        <tr class="fade-in-up">
                            <td>${record.name}</td>
                            <td>${record.grade}</td>
                            <td>${utils.formatTime(record.single)}</td>
                            <td>${utils.formatTime(record.average)}</td>
                            <td>${record.date}</td>
                            <td>${record.competition}</td>
                        </tr>
                    `;
                }
            });
        });
        
        currentTableBody.innerHTML = tableHTML;
    },

    // 加载历史记录
    loadHistoryRecords: (filters = {}) => {
        const currentRecords = document.getElementById('current-records');
        const historyRecords = document.getElementById('history-records');
        const historyTableBody = document.getElementById('history-records-table-body');
        const noData = document.getElementById('no-data');
        
        if (!historyRecords || !historyTableBody) return;

        // 显示历史记录，隐藏当前记录
        if (currentRecords) currentRecords.style.display = 'none';
        historyRecords.style.display = 'block';
        if (noData) noData.style.display = 'none';

        // 显示开发中提示
        historyTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-tools" style="font-size: 2rem; margin-bottom: 16px; display: block; color: var(--primary-color);"></i>
                    <h3 style="margin: 0 0 8px 0; color: var(--text-primary);">功能开发中</h3>
                    <p style="margin: 0; font-size: 0.9rem;">历史记录功能正在开发中，敬请期待！</p>
                </td>
            </tr>
        `;
    },

    // 绑定筛选器
    bindFilters: () => {
        const projectFilter = document.getElementById('project-filter');

        const applyFilters = () => {
            const filters = {
                project: projectFilter?.value || '三阶'
            };
            schoolRecordsPage.loadHistoryRecords(filters);
        };

        if (projectFilter) projectFilter.addEventListener('change', applyFilters);
    }
};

// 切换记录类型函数
function switchRecordType(type) {
    const currentBtn = document.getElementById('current-records-btn');
    const historyBtn = document.getElementById('history-records-btn');
    const historyFilterGroup = document.getElementById('history-filter-group');
    
    if (type === 'current') {
        schoolRecordsPage.currentView = 'current';
        currentBtn.classList.add('active');
        historyBtn.classList.remove('active');
        if (historyFilterGroup) historyFilterGroup.style.display = 'none';
        schoolRecordsPage.loadCurrentRecords();
    } else {
        schoolRecordsPage.currentView = 'history';
        historyBtn.classList.add('active');
        currentBtn.classList.remove('active');
        if (historyFilterGroup) historyFilterGroup.style.display = 'flex';
        
        // 加载历史记录，默认三阶
        const projectFilter = document.getElementById('project-filter');
        const filters = {
            project: projectFilter?.value || '三阶'
        };
        schoolRecordsPage.loadHistoryRecords(filters);
    }
}

// 周赛记录页面功能
const weeklyContestsPage = {
    // 初始化周赛记录页面
    init: () => {
        weeklyContestsPage.loadContests();
        weeklyContestsPage.bindFilters();
    },

    // 加载周赛记录
    loadContests: (filters = {}) => {
        const contestsTimeline = document.getElementById('contests-timeline');
        const noData = document.getElementById('no-data');
        
        if (!contestsTimeline) return;

        let filteredContests = mockData.weeklyContests;

        // 按时间排序，最新的周在最上面
        filteredContests.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 应用筛选
        if (filters.week) {
            filteredContests = filteredContests.filter(week => week.week === filters.week);
        }

        if (filteredContests.length === 0) {
            contestsTimeline.style.display = 'none';
            noData.style.display = 'block';
            return;
        }

        contestsTimeline.style.display = 'flex';
        noData.style.display = 'none';

        contestsTimeline.innerHTML = filteredContests.map(week => {
            let weekContests = week.contests;
            
            // 应用项目筛选
            if (filters.project) {
                weekContests = weekContests.filter(contest => contest.project === filters.project);
            }

            if (weekContests.length === 0) return '';

            // 获取所有项目列表
            const allProjects = week.contests.map(contest => contest.project);
            const uniqueProjects = [...new Set(allProjects)];

            return `
                <div class="week-card fade-in-up">
                    <div class="week-header">
                        <div class="week-title">${week.week}</div>
                        <div class="week-date">${week.date}</div>
                    </div>
                    
                    <!-- 项目标签栏 -->
                    <div class="project-tabs">
                        ${uniqueProjects.map((project, index) => `
                            <button class="project-tab ${index === 0 ? 'active' : ''}" onclick="switchProject('${week.week}', '${project}')" data-project="${project}">
                                ${project}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="week-content" id="content-${week.week}">
                        ${weekContests.map((contest, index) => `
                            <div class="project-section" data-project="${contest.project}" style="display: ${index === 0 ? 'block' : 'none'}">
                                <h3 class="project-title">${contest.project}</h3>
                                <table class="contest-table">
                                    <thead>
                                        <tr>
                                            <th>排名</th>
                                            <th>姓名</th>
                                            <th>单次</th>
                                            <th>平均</th>
                                            <th>五次成绩</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${contest.results.map(result => `
                                            <tr>
                                                <td>
                                                    <span class="ranking ${utils.getRankingClass(result.ranking)}">
                                                        ${result.ranking}
                                                    </span>
                                                </td>
                                                <td>${result.name}</td>
                                                <td>${utils.formatTime(result.single)}</td>
                                                <td>${utils.formatTime(result.average)}</td>
                                                <td>
                                                    <div class="times-list">
                                                        ${result.times.map((time, index) => {
                                                            const sortedTimes = [...result.times].sort((a, b) => {
                                                                const timeA = typeof a === 'string' ? parseFloat(a.replace(':', '.')) : a;
                                                                const timeB = typeof b === 'string' ? parseFloat(b.replace(':', '.')) : b;
                                                                return timeA - timeB;
                                                            });
                                                            const isBest = time === sortedTimes[0];
                                                            const isWorst = time === sortedTimes[sortedTimes.length - 1];
                                                            const displayTime = isBest || isWorst ? `( ${utils.formatTime(time)} )` : utils.formatTime(time);
                                                            return `
                                                                <span class="time-badge ${isBest ? 'best' : ''}">
                                                                    ${displayTime}
                                                                </span>
                                                            `;
                                                        }).join('')}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).filter(html => html).join('');
    },

    // 绑定筛选器
    bindFilters: () => {
        const weekFilter = document.getElementById('week-filter');
        const projectFilter = document.getElementById('project-filter');

        const applyFilters = () => {
            const filters = {
                week: weekFilter?.value || '',
                project: projectFilter?.value || ''
            };
            weeklyContestsPage.loadContests(filters);
        };

        if (weekFilter) weekFilter.addEventListener('change', applyFilters);
        if (projectFilter) projectFilter.addEventListener('change', applyFilters);
    }
};

// 切换项目显示
function switchProject(week, project) {
    const weekContent = document.getElementById(`content-${week}`);
    const projectSections = weekContent.querySelectorAll('.project-section');
    const projectTabs = document.querySelectorAll(`[onclick*="${week}"]`);
    
    // 隐藏所有项目
    projectSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示选中的项目
    const selectedSection = weekContent.querySelector(`[data-project="${project}"]`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // 更新标签状态
    projectTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[onclick*="${week}"][onclick*="${project}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// 重置筛选器函数
function resetFilters() {
    // 重置校记录页面筛选器
    const projectFilter = document.getElementById('project-filter');
    const weekFilter = document.getElementById('week-filter');

    if (projectFilter) projectFilter.value = '';
    if (weekFilter) weekFilter.value = '';

    // 重新加载数据
    if (window.location.pathname.includes('school-records')) {
        schoolRecordsPage.loadRecords();
    } else if (window.location.pathname.includes('weekly-contests')) {
        weeklyContestsPage.loadContests();
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/') || currentPage.endsWith('/WeekContest/')) {
        homePage.init();
    } else if (currentPage.includes('school-records')) {
        schoolRecordsPage.init();
    } else if (currentPage.includes('weekly-contests')) {
        weeklyContestsPage.init();
    }

    // 移动端导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加页面加载动画
    const elements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// 显示成绩统计开发中提示
function showStatsDevelopment() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            animation: slideUp 0.3s ease;
        ">
            <div style="
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 24px;
            ">
                <i class="fas fa-tools" style="font-size: 2rem; color: white;"></i>
            </div>
            <h3 style="
                margin: 0 0 16px 0;
                color: #333;
                font-size: 1.5rem;
                font-weight: 600;
            ">功能开发中</h3>
            <p style="
                margin: 0 0 24px 0;
                color: #666;
                line-height: 1.6;
            ">成绩统计功能正在开发中，敬请期待！</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                知道了
            </button>
        </div>
    `;
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 导出数据功能（未来扩展）
function exportData(type) {
    let data, filename;
    
    if (type === 'school-records') {
        data = mockData.schoolRecords;
        filename = 'school-records.json';
    } else if (type === 'weekly-contests') {
        data = mockData.weeklyContests;
        filename = 'weekly-contests.json';
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
