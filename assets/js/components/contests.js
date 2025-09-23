/**
 * 周赛记录组件
 * 处理周赛记录的显示和交互逻辑
 */

import { formatTime, getRankingClass, showError } from '../utils.js';
import { contestsAPI } from '../api.js';
import { mockData } from '../mockData.js';

/**
 * 周赛记录组件类
 */
export class ContestsComponent {
    constructor(container, apiClient = contestsAPI) {
        this.container = container;
        this.apiClient = apiClient;
        this.contests = [];
        this.filters = {};
    }

    /**
     * 初始化组件
     */
    async init() {
        await this.loadContests();
        this.bindEvents();
    }

    /**
     * 加载周赛记录
     * @param {Object} filters - 筛选条件
     */
    async loadContests(filters = {}) {
        try {
            this.filters = filters;
            this.showLoading();
            
            // 使用真实API数据
            const contests = await this.apiClient.getContests();
            this.contests = contests;
            this.renderContests();
        } catch (error) {
            this.showError('加载周赛记录失败: ' + error.message);
        }
    }

    /**
     * 渲染周赛记录
     */
    renderContests() {
        const contestsTimeline = document.getElementById('contests-timeline');
        const noData = document.getElementById('no-data');
        
        if (!contestsTimeline) return;

        let filteredContests = [...this.contests];

        // 按时间排序，最新的周在最上面
        filteredContests.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 应用筛选
        if (this.filters.week) {
            filteredContests = filteredContests.filter(week => week.week === this.filters.week);
        }

        if (filteredContests.length === 0) {
            contestsTimeline.style.display = 'none';
            if (noData) noData.style.display = 'block';
            return;
        }

        contestsTimeline.style.display = 'flex';
        if (noData) noData.style.display = 'none';

        contestsTimeline.innerHTML = filteredContests.map(week => {
            let weekContests = week.contests;
            
            // 应用项目筛选
            if (this.filters.project) {
                weekContests = weekContests.filter(contest => contest.project === this.filters.project);
            }

            if (weekContests.length === 0) return '';

            // 获取所有项目列表
            const allProjects = week.contests.map(contest => contest.project);
            const uniqueProjects = [...new Set(allProjects)];

            return this.generateWeekCard(week, weekContests, uniqueProjects);
        }).filter(html => html).join('');
    }

    /**
     * 生成周次卡片HTML
     * @param {Object} week - 周次数据
     * @param {Array} weekContests - 周次比赛数据
     * @param {Array} uniqueProjects - 唯一项目列表
     * @returns {string} HTML字符串
     */
    generateWeekCard(week, weekContests, uniqueProjects) {
        // 默认显示三阶项目，如果没有三阶则显示第一个有数据的项目
        let defaultProject = weekContests.find(contest => contest.project === '三阶');
        if (!defaultProject || !defaultProject.results || defaultProject.results.length === 0) {
            defaultProject = weekContests.find(contest => contest.results && contest.results.length > 0) || weekContests[0];
        }
        
        // 找到默认项目的索引
        const defaultProjectIndex = uniqueProjects.findIndex(project => project === defaultProject?.project);
        
        return `
            <div class="week-card fade-in-up">
                <div class="week-header">
                    <div class="week-title">${week.week}</div>
                    <div class="week-date">${week.date}</div>
                </div>
                
                <!-- 项目标签栏 -->
                <div class="project-tabs">
                    ${uniqueProjects.map((project, index) => {
                        const contest = weekContests.find(c => c.project === project);
                        const hasResults = contest && contest.results && contest.results.length > 0;
                        const isActive = project === defaultProject?.project;
                        return `
                            <button class="project-tab ${isActive ? 'active' : ''}" 
                                    onclick="switchProject('${week.week}', '${project}')" 
                                    data-project="${project}">
                                ${project}
                                ${hasResults ? `<span class="result-count">(${contest.results.length})</span>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
                
                <div class="week-content" id="content-${week.week}">
                    ${weekContests.map((contest, index) => {
                        const isActive = contest.project === defaultProject?.project;
                        return `
                            <div class="project-section ${isActive ? 'active' : ''}" data-project="${contest.project}">
                                <div class="project-header">
                                    <h3 class="project-title">${contest.project}</h3>
                                    <div class="round-filter">
                                        <label for="round-filter-${week.week}-${contest.project}">轮数：</label>
                                        <select id="round-filter-${week.week}-${contest.project}" class="round-select" onchange="filterByRound('${week.week}', '${contest.project}', this.value)">
                                            <option value="1" selected>初赛 (第1轮)</option>
                                            <option value="2">复赛 (第2轮)</option>
                                            <option value="3">决赛 (第3轮)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="contest-table-container" id="table-${week.week}-${contest.project}">
                                    ${this.generateContestTable(contest, '1')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 生成比赛表格HTML
     * @param {Object} contest - 比赛数据
     * @param {string} roundFilter - 轮数筛选条件
     * @returns {string} HTML字符串
     */
    generateContestTable(contest, roundFilter = '') {
        // 根据轮数筛选结果
        let filteredResults = contest.results || [];
        if (roundFilter) {
            filteredResults = filteredResults.filter(result => result.round == roundFilter);
        }
        
        // 对结果进行排名计算
        const rankedResults = this.calculateRankings(filteredResults);
        
        return `
            <table class="contest-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>姓名</th>
                        <th>单次</th>
                        <th>平均</th>
                        <th>五次成绩</th>
                        <th>轮数</th>
                    </tr>
                </thead>
                <tbody>
                    ${rankedResults.map(result => this.generateResultRow(result)).join('')}
                </tbody>
            </table>
        `;
    }

    /**
     * 计算排名
     * @param {Array} results - 结果数组
     * @returns {Array} 带排名的结果数组
     */
    calculateRankings(results) {
        if (!results || results.length === 0) return [];
        
        // 为每个结果计算平均成绩
        const resultsWithAverage = results.map(result => {
            const times = result.times || [];
            if (times.length === 0) {
                return { ...result, average: null, single: null };
            }
            
            // 转换时间格式并排序
            const numericTimes = times.map(time => {
                if (typeof time === 'string' && time.includes(':')) {
                    const parts = time.split(':');
                    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
                }
                return parseFloat(time) || 0;
            }).filter(time => time > 0);
            
            if (numericTimes.length === 0) {
                return { ...result, average: null, single: null };
            }
            
            // 计算单次最好成绩
            const single = Math.min(...numericTimes);
            
            // 计算平均成绩（去掉最好和最差，取中间三个的平均）
            let average = null;
            if (numericTimes.length >= 3) {
                const sortedTimes = [...numericTimes].sort((a, b) => a - b);
                const middleTimes = sortedTimes.slice(1, -1); // 去掉最好和最差
                average = middleTimes.reduce((sum, time) => sum + time, 0) / middleTimes.length;
            } else if (numericTimes.length >= 1) {
                average = numericTimes.reduce((sum, time) => sum + time, 0) / numericTimes.length;
            }
            
            return {
                ...result,
                single: single,
                average: average,
                numericTimes: numericTimes
            };
        });
        
        // 按平均成绩排序（平均成绩越小排名越高）
        const sortedResults = resultsWithAverage.sort((a, b) => {
            if (a.average === null && b.average === null) return 0;
            if (a.average === null) return 1;
            if (b.average === null) return -1;
            return a.average - b.average;
        });
        
        // 添加排名
        let currentRank = 1;
        let lastAverage = null;
        
        return sortedResults.map((result, index) => {
            if (result.average !== null) {
                if (lastAverage !== null && Math.abs(result.average - lastAverage) > 0.01) {
                    currentRank = index + 1;
                }
                lastAverage = result.average;
            } else {
                currentRank = index + 1;
            }
            
            return {
                ...result,
                ranking: currentRank
            };
        });
    }

    /**
     * 生成结果行HTML
     * @param {Object} result - 结果数据
     * @returns {string} HTML字符串
     */
    generateResultRow(result) {
        // 使用计算出的单次和平均成绩
        const single = result.single;
        const average = result.average;
        
        // 对原始时间进行排序用于显示
        const sortedTimes = [...(result.times || [])].sort((a, b) => {
            const timeA = typeof a === 'string' ? parseFloat(a.replace(':', '.')) : a;
            const timeB = typeof b === 'string' ? parseFloat(b.replace(':', '.')) : b;
            return timeA - timeB;
        });

        // 轮数显示
        const roundText = result.round ? `第${result.round}轮` : '-';

        return `
            <tr>
                <td>
                    <span class="ranking ${getRankingClass(result.ranking)}">
                        ${result.ranking}
                    </span>
                </td>
                <td>${result.name}</td>
                <td>${single ? this.formatTime(single) : '-'}</td>
                <td>${average ? this.formatTime(average) : '-'}</td>
                <td>
                    <div class="times-list">
                        ${(result.times || []).map(time => {
                            const isBest = time === sortedTimes[0];
                            const isWorst = time === sortedTimes[sortedTimes.length - 1];
                            const displayTime = isBest || isWorst ? 
                                `( ${this.formatTime(time)} )` : this.formatTime(time);
                            return `
                                <span class="time-item ${isBest ? 'best' : isWorst ? 'worst' : ''}">
                                    ${displayTime}
                                </span>
                            `;
                        }).join('')}
                    </div>
                </td>
                <td>${roundText}</td>
            </tr>
        `;
    }

    /**
     * 格式化时间显示
     * @param {number|string} time - 时间（秒）
     * @returns {string} 格式化后的时间字符串
     */
    formatTime(time) {
        if (!time || time === 0) return '-';
        
        const numTime = typeof time === 'string' ? parseFloat(time) : time;
        if (isNaN(numTime)) return '-';
        
        if (numTime < 60) {
            return numTime.toFixed(2);
        } else {
            const minutes = Math.floor(numTime / 60);
            const seconds = (numTime % 60).toFixed(2);
            return `${minutes}:${seconds.padStart(5, '0')}`;
        }
    }

    /**
     * 切换项目显示
     * @param {string} week - 周次
     * @param {string} project - 项目名称
     */
    switchProject(week, project) {
        const weekContent = document.getElementById(`content-${week}`);
        if (!weekContent) return;

        const projectSections = weekContent.querySelectorAll('.project-section');
        const projectTabs = document.querySelectorAll(`[onclick*="${week}"]`);
        
        // 隐藏所有项目
        projectSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示选中的项目
        const selectedSection = weekContent.querySelector(`[data-project="${project}"]`);
        if (selectedSection) {
            selectedSection.classList.add('active');
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

    /**
     * 绑定事件
     */
    bindEvents() {
        // 周次筛选器
        const weekFilter = document.getElementById('week-filter');
        if (weekFilter) {
            weekFilter.addEventListener('change', (e) => {
                this.filters.week = e.target.value;
                this.loadContests(this.filters);
            });
        }

        // 项目筛选器
        const projectFilter = document.getElementById('project-filter');
        if (projectFilter) {
            projectFilter.addEventListener('change', (e) => {
                this.filters.project = e.target.value;
                this.loadContests(this.filters);
            });
        }

        // 重置筛选器
        const resetBtn = document.querySelector('.filter-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetFilters());
        }

        // 将切换项目函数挂载到全局
        window.switchProject = (week, project) => {
            this.switchProject(week, project);
        };

        // 将轮数筛选函数挂载到全局
        window.filterByRound = (week, project, roundValue) => {
            this.filterByRound(week, project, roundValue);
        };
    }

    /**
     * 轮数筛选
     * @param {string} week - 周次
     * @param {string} project - 项目
     * @param {string} roundValue - 轮数值
     */
    filterByRound(week, project, roundValue) {
        // 找到对应的周次数据
        const weekData = this.contests.find(contest => contest.week === week);
        if (!weekData) return;

        // 找到对应的项目数据
        const projectData = weekData.contests.find(contest => contest.project === project);
        if (!projectData) return;

        // 更新表格内容
        const tableContainer = document.getElementById(`table-${week}-${project}`);
        if (tableContainer) {
            tableContainer.innerHTML = this.generateContestTable(projectData, roundValue);
        }
    }

    /**
     * 重置筛选器
     */
    resetFilters() {
        this.filters = {};
        
        const weekFilter = document.getElementById('week-filter');
        const projectFilter = document.getElementById('project-filter');
        
        if (weekFilter) weekFilter.value = '';
        if (projectFilter) projectFilter.value = '';
        
        // 重置所有轮数筛选为第一轮
        const roundSelects = document.querySelectorAll('.round-select');
        roundSelects.forEach(select => {
            select.value = '1';
        });
        
        this.loadContests();
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        const contestsTimeline = document.getElementById('contests-timeline');
        if (contestsTimeline) {
            contestsTimeline.innerHTML = `
                <div class="week-card">
                    <div class="week-content" style="text-align: center; padding: 40px;">
                        <div class="loading"></div>
                        <p style="margin-top: 16px; color: var(--text-secondary);">加载中...</p>
                    </div>
                </div>
            `;
        }
    }

    /**
     * 显示错误信息
     * @param {string} message - 错误消息
     */
    showError(message) {
        const contestsTimeline = document.getElementById('contests-timeline');
        if (contestsTimeline) {
            contestsTimeline.innerHTML = `
                <div class="week-card">
                    <div class="week-content" style="text-align: center; padding: 40px; color: var(--danger-color);">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 16px; display: block;"></i>
                        <h3 style="margin: 0 0 8px 0;">加载失败</h3>
                        <p style="margin: 0; font-size: 0.9rem;">${message}</p>
                    </div>
                </div>
            `;
        }
    }

    /**
     * 创建新周赛记录
     * @param {Object} contestData - 周赛记录数据
     */
    async createContest(contestData) {
        try {
            await this.apiClient.createContest(contestData);
            await this.loadContests(this.filters);
        } catch (error) {
            // 错误已在 API 中处理
        }
    }

    /**
     * 更新周赛记录
     * @param {string} id - 记录ID
     * @param {Object} contestData - 更新数据
     */
    async updateContest(id, contestData) {
        try {
            await this.apiClient.updateContest(id, contestData);
            await this.loadContests(this.filters);
        } catch (error) {
            // 错误已在 API 中处理
        }
    }

    /**
     * 删除周赛记录
     * @param {string} id - 记录ID
     */
    async deleteContest(id) {
        try {
            await this.apiClient.deleteContest(id);
            await this.loadContests(this.filters);
        } catch (error) {
            // 错误已在 API 中处理
        }
    }
}

// 全局函数，用于 HTML 中的 onclick 事件
window.switchProject = function(week, project) {
    if (window.contestsComponent) {
        window.contestsComponent.switchProject(week, project);
    }
};

window.resetFilters = function() {
    if (window.contestsComponent) {
        window.contestsComponent.resetFilters();
    }
};
