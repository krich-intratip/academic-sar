// Report Export Utility
// Generates standalone HTML report with inline styling

import { EvaluationResults, experts, getCriteriaByRubric, RubricCriteria } from '@/types/evaluation';
import { RubricType } from '@/types/app';
import { generateOverallSummary, getExpertTotalScore, collectAllRecommendations } from '@/lib/evaluation';
import { getQualityColor } from '@/lib/utils';

const CSS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Prompt', sans-serif;
    background: #FAFAFA;
    color: #333333;
    line-height: 1.6;
    padding: 20px;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.header {
    background: linear-gradient(to right, #E3F2FD, #F3E5F5);
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 24px;
}

.header h1 {
    color: #1565C0;
    font-size: 28px;
    margin-bottom: 8px;
}

.header p {
    color: #666;
    font-size: 14px;
}

.rubric-badge {
    display: inline-block;
    padding: 8px 20px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 12px;
}

.summary-score {
    background: linear-gradient(to right, #E8F5E9, #E3F2FD);
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 24px;
}

.summary-score h2 {
    font-size: 24px;
    margin-bottom: 16px;
}

.score-value {
    font-size: 56px;
    font-weight: bold;
    color: #2E7D32;
    margin: 16px 0;
}

.score-percent {
    font-size: 20px;
    color: #666;
    margin-bottom: 16px;
}

.progress-bar {
    width: 100%;
    max-width: 500px;
    height: 24px;
    background: #e0e0e0;
    border-radius: 12px;
    margin: 16px auto;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(to right, #FFD54F, #81C784);
    border-radius: 12px;
}

.quality-badge {
    display: inline-block;
    padding: 12px 32px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 999px;
    margin-top: 16px;
}

.card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card h3 {
    font-size: 20px;
    margin-bottom: 16px;
    color: #333;
}

.card h4 {
    font-size: 16px;
    margin: 16px 0 8px 0;
}

.expert-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

@media (max-width: 768px) {
    .expert-grid {
        grid-template-columns: 1fr;
    }
}

.expert-card {
    padding: 20px;
    border-radius: 16px;
    text-align: center;
}

.expert-avatar {
    font-size: 40px;
    margin-bottom: 8px;
}

.expert-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
}

.expert-title {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
}

.expert-score {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
}

.expert-quote {
    font-size: 12px;
    font-style: italic;
    color: #666;
    padding: 12px;
    background: rgba(255,255,255,0.5);
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    background: #f5f5f5;
    font-weight: 600;
}

.score-cell {
    text-align: center;
    font-weight: 600;
}

.chapter-header {
    background: linear-gradient(to right, #E3F2FD, #F5F5F5);
    font-weight: 600;
    color: #1565C0;
}

.score-detail-table {
    font-size: 13px;
}

.score-detail-table td {
    padding: 10px;
}

.score-detail-table .reason-cell {
    font-size: 12px;
    color: #666;
    font-style: italic;
}

.recommendation-section {
    margin-top: 16px;
}

.recommendation-section h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.recommendation-item {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 12px;
}

.recommendation-critical {
    background: #FFEBEE;
    border-left: 4px solid #EF5350;
}

.recommendation-high {
    background: #FFF3E0;
    border-left: 4px solid #FF9800;
}

.recommendation-enhancement {
    background: #E3F2FD;
    border-left: 4px solid #2196F3;
}

.recommendation-title {
    font-weight: 600;
    margin-bottom: 8px;
}

.recommendation-detail {
    font-size: 14px;
    color: #666;
}

.footer {
    text-align: center;
    padding: 24px;
    margin-top: 24px;
    background: white;
    border-radius: 16px;
}

.footer p {
    color: #666;
    font-size: 12px;
    margin-bottom: 8px;
}

.footer .developer {
    color: #1565C0;
    font-weight: 600;
}

@media print {
    body { background: white; }
    .card { box-shadow: none; border: 1px solid #ddd; }
}
`;

function getScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#81C784';
    if (percentage >= 60) return '#FFD54F';
    if (percentage >= 40) return '#FFB74D';
    return '#E57373';
}

function getRubricBadgeStyle(rubricType: RubricType): { bg: string; color: string; text: string } {
    if (rubricType === 'proposal') {
        return { bg: '#E3F2FD', color: '#1976D2', text: 'โครงร่างวิทยานิพนธ์ (บทที่ 1-3)' };
    }
    return { bg: '#F3E5F5', color: '#7B1FA2', text: 'วิทยานิพนธ์ฉบับเต็ม (5 บท)' };
}

export function generateHtmlReport(results: EvaluationResults): string {
    const { summary, projectName, organizationName, evaluationDate, rubricType } = results;

    if (!summary) return '';

    const criteria = getCriteriaByRubric(rubricType);
    const expertEntries = Object.entries(results.experts).filter(([, data]) => data);
    const allRecommendations = collectAllRecommendations(results.experts);

    const qualityColorClass = getQualityColor(summary.qualityLevel);
    const qualityBgColor = qualityColorClass.includes('green') ? '#4CAF50' :
        qualityColorClass.includes('yellow') ? '#FFC107' :
            qualityColorClass.includes('orange') ? '#FF9800' : '#F44336';

    const rubricBadge = getRubricBadgeStyle(rubricType);

    // Group criteria by chapter
    const groupedCriteria: Record<string, RubricCriteria[]> = {};
    criteria.forEach(c => {
        const chapter = c.chapter || 'อื่นๆ';
        if (!groupedCriteria[chapter]) groupedCriteria[chapter] = [];
        groupedCriteria[chapter].push(c);
    });

    const html = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>รายงานผลการประเมิน - ${projectName}</title>
    <style>${CSS_STYLES}</style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>รายงานผลการประเมินงานวิจัย</h1>
            <p>SAR for Academic Research Paper</p>
            <span class="rubric-badge" style="background: ${rubricBadge.bg}; color: ${rubricBadge.color};">
                ${rubricType === 'proposal' ? '📝' : '📚'} ${rubricBadge.text}
            </span>
        </div>

        <!-- Summary Score -->
        <div class="summary-score">
            <h2>สรุปผลการประเมิน</h2>
            <p><strong>งานวิจัย:</strong> ${projectName}</p>
            <p><strong>ผู้แต่ง:</strong> ${organizationName} | <strong>วันที่ประเมิน:</strong> ${evaluationDate}</p>
            <div class="score-value">${summary.totalScore.toFixed(1)}/${summary.maxPossibleScore}</div>
            <div class="score-percent">${summary.percentage.toFixed(1)}%</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(summary.percentage, 100)}%"></div>
            </div>
            <span class="quality-badge" style="background: ${qualityBgColor}">${summary.qualityLevel}</span>
            <p style="margin-top: 16px; color: #666; max-width: 600px; margin-left: auto; margin-right: auto;">
                ${generateOverallSummary(summary, results.experts, rubricType)}
            </p>
        </div>

        <!-- Expert Cards -->
        <div class="card">
            <h3>คณะผู้เชี่ยวชาญประเมิน</h3>
            <div class="expert-grid">
                ${expertEntries.map(([expertId, expertData]) => {
        const expert = experts[expertId];
        if (!expert || !expertData) return '';
        const totalScore = getExpertTotalScore(expertData, rubricType);
        return `
                    <div class="expert-card" style="border-top: 5px solid ${expert.borderColor}; background: linear-gradient(180deg, ${expert.color} 0%, white 30%)">
                        <div class="expert-avatar">${expert.avatar}</div>
                        <div class="expert-name">${expert.name}</div>
                        <div class="expert-title">${expert.title}</div>
                        <div class="expert-score" style="color: ${expert.borderColor}">${totalScore.toFixed(1)}/100</div>
                        <div class="expert-quote" style="border-left: 3px solid ${expert.borderColor}">"${expertData.summaryQuote}"</div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>

        <!-- Score Comparison Table -->
        <div class="card">
            <h3>คะแนนเปรียบเทียบแยกตามหัวข้อ (${criteria.length} เกณฑ์)</h3>
            <table>
                <thead>
                    <tr>
                        <th style="width: 40%;">หัวข้อ</th>
                        <th style="width: 10%;">คะแนนเต็ม</th>
                        ${expertEntries.map(([expertId]) => {
        const expert = experts[expertId];
        return `<th class="score-cell" style="width: 12%;">${expert?.avatar || ''}</th>`;
    }).join('')}
                        <th class="score-cell" style="width: 14%;">ค่าเฉลี่ย</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(groupedCriteria).map(([chapter, items]) => {
        const chapterTotal = items.reduce((sum, item) => sum + item.maxScore, 0);
        return `
                        <tr class="chapter-header">
                            <td colspan="${3 + expertEntries.length}">${chapter} (${chapterTotal} คะแนน)</td>
                        </tr>
                        ${items.map((criterion) => {
            const scores = expertEntries.map(([, expertData]) => {
                const scoreItem = expertData?.scores?.find(s => s.criteriaId === criterion.id);
                return scoreItem?.score || 0;
            });
            const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            const avgPercentage = (avg / criterion.maxScore) * 100;
            return `
                            <tr>
                                <td>${criterion.id}. ${criterion.name}</td>
                                <td style="text-align: center;">${criterion.maxScore}</td>
                                ${scores.map(score => {
                const bgColor = getScoreColor(score, criterion.maxScore);
                return `<td class="score-cell" style="background: ${bgColor};">${score}</td>`;
            }).join('')}
                                <td class="score-cell" style="background: #1565C0; color: white">${avg.toFixed(1)}</td>
                            </tr>
                            `;
        }).join('')}
                        `;
    }).join('')}
                </tbody>
            </table>
        </div>

        <!-- Expert Detailed Evaluation -->
        ${expertEntries.map(([expertId, expertData]) => {
        const expert = experts[expertId];
        if (!expert || !expertData) return '';
        return `
            <div class="card" style="border-top: 5px solid ${expert.borderColor}">
                <h3>${expert.avatar} ความเห็นจาก ${expert.name}</h3>
                <p style="color: #666; margin-bottom: 16px; font-style: italic;">${expertData.overallComment}</p>

                <!-- Score Details with Reasons -->
                <h4 style="color: ${expert.borderColor};">คะแนนรายข้อพร้อมเหตุผล</h4>
                <table class="score-detail-table">
                    <tbody>
                        ${expertData.scores?.map(scoreItem => {
            const criterion = criteria.find(c => c.id === scoreItem.criteriaId);
            if (!criterion) return '';
            const bgColor = getScoreColor(scoreItem.score, criterion.maxScore);
            return `
                                <tr>
                                    <td style="width: 35%; font-weight: 500;">${criterion.name}</td>
                                    <td style="width: 15%; text-align: center; background: ${bgColor}; font-weight: 600;">${scoreItem.score}/${criterion.maxScore}</td>
                                    <td class="reason-cell">${scoreItem.reason}</td>
                                </tr>
                            `;
        }).join('') || ''}
                    </tbody>
                </table>

                <h4 style="color: #388E3C; margin-top: 20px;">จุดแข็ง</h4>
                <ul style="padding-left: 20px;">
                    ${expertData.strengths?.map(s => `<li>${s}</li>`).join('') || '<li>-</li>'}
                </ul>

                <h4 style="color: #E53935;">จุดอ่อน</h4>
                <ul style="padding-left: 20px;">
                    ${expertData.weaknesses?.map(w => `<li>${w}</li>`).join('') || '<li>-</li>'}
                </ul>

                <!-- Expert Recommendations -->
                ${expertData.recommendations && expertData.recommendations.length > 0 ? `
                <div class="recommendation-section">
                    <h4 style="color: ${expert.borderColor};">คำแนะนำจาก ${expert.name}</h4>
                    ${expertData.recommendations.map(rec => `
                        <div class="recommendation-item recommendation-${rec.priority}">
                            <div class="recommendation-title">
                                ${rec.priority === 'critical' ? '🚨 [วิกฤต]' : rec.priority === 'high' ? '⚠️ [สำคัญ]' : '💡 [เสริม]'}
                                ${rec.title}
                            </div>
                            <div class="recommendation-detail">${rec.detail}</div>
                            <div class="recommendation-detail" style="margin-top: 8px; color: #388E3C;">
                                <strong>ผลที่คาดหวัง:</strong> ${rec.expectedResult}
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
            `;
    }).join('')}

        <!-- All Recommendations Summary -->
        <div class="card">
            <h3>สรุปคำแนะนำสำคัญจากผู้เชี่ยวชาญทั้งหมด</h3>

            <!-- Critical -->
            ${allRecommendations.filter(r => r.priority === 'critical').length > 0 ? `
            <h4 style="color: #E53935; margin-bottom: 12px;">🚨 คำแนะนำระดับวิกฤต (Critical)</h4>
            ${allRecommendations.filter(r => r.priority === 'critical').map(rec => `
                <div class="recommendation-item recommendation-critical">
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-detail">${rec.detail}</div>
                    <div class="recommendation-detail" style="margin-top: 8px; color: #388E3C;">
                        <strong>ผลที่คาดหวัง:</strong> ${rec.expectedResult}
                    </div>
                    <div class="recommendation-detail" style="margin-top: 4px; color: #999;">
                        — ${experts[rec.source]?.name || rec.source}
                    </div>
                </div>
            `).join('')}
            ` : ''}

            <!-- High -->
            ${allRecommendations.filter(r => r.priority === 'high').length > 0 ? `
            <h4 style="color: #FF9800; margin: 20px 0 12px 0;">⚠️ คำแนะนำระดับสำคัญ (High)</h4>
            ${allRecommendations.filter(r => r.priority === 'high').map(rec => `
                <div class="recommendation-item recommendation-high">
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-detail">${rec.detail}</div>
                    <div class="recommendation-detail" style="margin-top: 8px; color: #388E3C;">
                        <strong>ผลที่คาดหวัง:</strong> ${rec.expectedResult}
                    </div>
                    <div class="recommendation-detail" style="margin-top: 4px; color: #999;">
                        — ${experts[rec.source]?.name || rec.source}
                    </div>
                </div>
            `).join('')}
            ` : ''}

            <!-- Enhancement -->
            ${allRecommendations.filter(r => r.priority === 'enhancement').length > 0 ? `
            <h4 style="color: #2196F3; margin: 20px 0 12px 0;">💡 คำแนะนำเสริม (Enhancement)</h4>
            ${allRecommendations.filter(r => r.priority === 'enhancement').map(rec => `
                <div class="recommendation-item recommendation-enhancement">
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-detail">${rec.detail}</div>
                    <div class="recommendation-detail" style="margin-top: 8px; color: #388E3C;">
                        <strong>ผลที่คาดหวัง:</strong> ${rec.expectedResult}
                    </div>
                    <div class="recommendation-detail" style="margin-top: 4px; color: #999;">
                        — ${experts[rec.source]?.name || rec.source}
                    </div>
                </div>
            `).join('')}
            ` : ''}
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>จัดทำโดยระบบประเมินงานวิจัย Academic SAR อัตโนมัติ</p>
            <p>วันที่สร้างรายงาน: ${new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
            <p style="color: #FF9800; font-size: 11px; margin-top: 8px;">
                หมายเหตุ: รีวิวนี้เป็นการประเมินเบื้องต้นโดย AI ควรใช้ร่วมกับการรีวิวจากผู้เชี่ยวชาญมนุษย์
            </p>
            <p class="developer" style="margin-top: 12px;">
                ระบบประเมินโครงร่างและวิทยานิพนธ์<br/>
                โดย พล.ท.ดร.กริช อินทราทิพย์<br/>
                License @2025
            </p>
        </div>
    </div>
</body>
</html>`;

    return html;
}
