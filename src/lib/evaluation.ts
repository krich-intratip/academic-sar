// Evaluation Calculation Functions

import { RubricType } from '@/types/app';
import {
    EvaluationSummary,
    CriteriaAverage,
    ExpertEvaluation,
    RubricCriteria,
    getCriteriaByRubric
} from '@/types/evaluation';

// Get quality level based on rubric type and percentage
function getQualityLevel(rubricType: RubricType, percentage: number): string {
    if (rubricType === 'proposal') {
        if (percentage >= 80) return 'อนุมัติ (Approve)';
        if (percentage >= 60) return 'อนุมัติแบบมีเงื่อนไข (Approve with Conditions)';
        return 'ไม่อนุมัติ (Disapprove)';
    } else {
        if (percentage >= 80) return 'ดีมาก (ผ่านฉลุย)';
        if (percentage >= 70) return 'ดี (ผ่าน)';
        if (percentage >= 60) return 'พอใช้ (แก้ไขมาก)';
        return 'ไม่ผ่าน';
    }
}

export function calculateSummary(
    expertsData: {
        expert1?: ExpertEvaluation;
        expert2?: ExpertEvaluation;
        expert3?: ExpertEvaluation;
    },
    rubricType: RubricType
): EvaluationSummary {
    const criteria = getCriteriaByRubric(rubricType);
    const maxPossibleScore = criteria.reduce((sum, c) => sum + c.maxScore, 0);

    const summary: EvaluationSummary = {
        totalScore: 0,
        maxPossibleScore,
        percentage: 0,
        qualityLevel: '',
        criteriaAverages: []
    };

    criteria.forEach(criterion => {
        let totalScore = 0;
        let count = 0;

        Object.values(expertsData).forEach(expert => {
            if (expert) {
                const scoreObj = expert.scores.find(s => s.criteriaId === criterion.id);
                if (scoreObj) {
                    totalScore += scoreObj.score;
                    count++;
                }
            }
        });

        const averageScore = count > 0 ? totalScore / count : 0;
        const weightedScore = averageScore;

        summary.criteriaAverages.push({
            criteriaId: criterion.id,
            name: criterion.name,
            chapter: criterion.chapter,
            averageScore: averageScore,
            weightedScore: weightedScore,
            maxWeightedScore: criterion.maxScore,
            weight: criterion.weight
        });

        summary.totalScore += weightedScore;
    });

    summary.percentage = (summary.totalScore / summary.maxPossibleScore) * 100;
    summary.qualityLevel = getQualityLevel(rubricType, summary.percentage);

    return summary;
}

export function getExpertTotalScore(expertData: ExpertEvaluation, rubricType: RubricType): number {
    const criteria = getCriteriaByRubric(rubricType);
    return expertData.scores.reduce((sum, s) => {
        const criterion = criteria.find(c => c.id === s.criteriaId);
        return sum + (criterion ? s.score : 0);
    }, 0);
}

export function generateOverallSummary(
    summary: EvaluationSummary,
    expertsData: { expert1?: ExpertEvaluation; expert2?: ExpertEvaluation; expert3?: ExpertEvaluation },
    rubricType: RubricType
): string {
    const sorted = [...summary.criteriaAverages].sort((a, b) =>
        (b.averageScore / b.maxWeightedScore) - (a.averageScore / a.maxWeightedScore)
    );
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    const documentType = rubricType === 'proposal' ? 'โครงร่างวิทยานิพนธ์' : 'วิทยานิพนธ์ฉบับเต็ม';

    return `${documentType}นี้ได้รับการประเมินในระดับ "${summary.qualityLevel}" โดยมีจุดแข็งที่โดดเด่นในด้าน "${highest.name}" และควรเน้นการพัฒนาในด้าน "${lowest.name}" ผู้เชี่ยวชาญทั้ง 3 ท่านเห็นตรงกันว่างานวิจัยมีศักยภาพในการปรับปรุงให้ดียิ่งขึ้น`;
}

export interface CollectedRecommendation {
    priority: 'critical' | 'high' | 'enhancement';
    title: string;
    detail: string;
    expectedResult: string;
    source: string;
}

export function collectAllRecommendations(
    expertsData: { expert1?: ExpertEvaluation; expert2?: ExpertEvaluation; expert3?: ExpertEvaluation }
): CollectedRecommendation[] {
    const allRecs: CollectedRecommendation[] = [];

    Object.entries(expertsData).forEach(([expertId, expertData]) => {
        if (expertData?.recommendations) {
            expertData.recommendations.forEach(rec => {
                allRecs.push({
                    ...rec,
                    source: expertId
                });
            });
        }
    });

    // Sort by priority: critical first, then high, then enhancement
    const priorityOrder = { critical: 0, high: 1, enhancement: 2 };
    return allRecs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
