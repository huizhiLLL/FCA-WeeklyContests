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
            
            // 使用静态数据
            this.contests = mockData.weeklyContests;
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
        return `
            <div class="week-card fade-in-up">
                <div class="week-header">
                    <div class="week-title">${week.week}</div>
                    <div class="week-date">${week.date}</div>
                </div>
                
                <!-- 项目标签栏 -->
                <div class="project-tabs">
                    ${uniqueProjects.map((project, index) => `
                        <button class="project-tab ${index === 0 ? 'active' : ''}" 
                                onclick="switchProject('${week.week}', '${project}')" 
                                data-project="${project}">
                            ${project}
                        </button>
                    `).join('')}
                </div>
                
                <div class="week-content" id="content-${week.week}">
                    ${weekContests.map((contest, index) => `
                        <div class="project-section ${index === 0 ? 'active' : ''}" data-project="${contest.project}">
                            <h3 class="project-title">${contest.project}</h3>
                            ${this.generateContestTable(contest)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 生成比赛表格HTML
     * @param {Object} contest - 比赛数据
     * @returns {string} HTML字符串
     */
    generateContestTable(contest) {
        return `
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
                    ${contest.results.map(result => this.generateResultRow(result)).join('')}
                </tbody>
            </table>
        `;
    }

    /**
     * 生成结果行HTML
     * @param {Object} result - 结果数据
     * @returns {string} HTML字符串
     */
    generateResultRow(result) {
        const sortedTimes = [...result.times].sort((a, b) => {
            const timeA = typeof a === 'string' ? parseFloat(a.replace(':', '.')) : a;
            const timeB = typeof b === 'string' ? parseFloat(b.replace(':', '.')) : b;
            return timeA - timeB;
        });

        return `
            <tr>
                <td>
                    <span class="ranking ${getRankingClass(result.ranking)}">
                        ${result.ranking}
                    </span>
                </td>
                <td>${result.name}</td>
                <td>${formatTime(result.single)}</td>
                <td>${formatTime(result.average)}</td>
                <td>
                    <div class="times-list">
                        ${result.times.map(time => {
                            const isBest = time === sortedTimes[0];
                            const isWorst = time === sortedTimes[sortedTimes.length - 1];
                            const displayTime = isBest || isWorst ? 
                                `( ${formatTime(time)} )` : formatTime(time);
                            return `
                                <span class="time-item ${isBest ? 'best' : isWorst ? 'worst' : ''}">
                                    ${displayTime}
                                </span>
                            `;
                        }).join('')}
                    </div>
                </td>
            </tr>
        `;
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
