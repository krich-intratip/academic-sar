'use client';

import { useApp } from '@/context/AppContext';
import { getScoreColorHex } from '@/lib/utils';

export default function BarChart() {
    const { state } = useApp();
    const summary = state.evaluationResults?.summary;

    if (!summary) return null;

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">กราฟแท่งเปรียบเทียบคะแนนเฉลี่ยรายหัวข้อ</h3>
            <div className="space-y-4">
                {summary.criteriaAverages.map(criteria => {
                    const percentage = (criteria.averageScore / 4) * 100;

                    return (
                        <div key={criteria.criteriaId}>
                            <div className="text-sm font-medium mb-1">
                                {criteria.criteriaId}. {criteria.name}
                            </div>
                            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: getScoreColorHex(criteria.averageScore)
                                    }}
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold">
                                    {criteria.averageScore.toFixed(2)}/4
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
