'use client';

import { useApp } from '@/context/AppContext';
import { generateOverallSummary } from '@/lib/evaluation';
import { getQualityColor } from '@/lib/utils';
import { RubricBadge } from '@/components/rubric';

export default function SummaryScore() {
    const { state } = useApp();
    const results = state.evaluationResults;

    if (!results?.summary || !results.rubricType) return null;

    const { summary, projectName, organizationName, evaluationDate, rubricType } = results;

    return (
        <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E3F2FD] p-8 md:p-10 rounded-2xl text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">📊 สรุปผลการประเมิน</h2>

            <div className="mb-6">
                <RubricBadge rubricType={rubricType} size="lg" />
            </div>

            <div className="mb-4">
                <p className="text-lg"><strong>งานวิจัย:</strong> {projectName}</p>
                <p><strong>ผู้แต่ง:</strong> {organizationName} | <strong>วันที่ประเมิน:</strong> {evaluationDate}</p>
            </div>

            <div className="text-6xl md:text-7xl font-bold text-[#2E7D32] my-4">
                {summary.totalScore.toFixed(1)}/{summary.maxPossibleScore}
            </div>

            <div className="text-2xl text-gray-600 mb-6">
                {summary.percentage.toFixed(1)}%
            </div>

            <div className="max-w-2xl mx-auto mb-6">
                <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#FFD54F] to-[#81C784] rounded-full transition-all duration-1000"
                        style={{ width: `${summary.percentage}%` }}
                    />
                </div>
            </div>

            <span className={`inline-block px-8 py-4 text-white text-xl font-semibold rounded-full shadow-lg ${getQualityColor(summary.qualityLevel)}`}>
                {summary.qualityLevel}
            </span>

            <p className="mt-6 max-w-3xl mx-auto text-gray-600">
                {generateOverallSummary(summary, results.experts, rubricType)}
            </p>
        </div>
    );
}
