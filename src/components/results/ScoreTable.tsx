'use client';

import { useApp } from '@/context/AppContext';
import { experts, getCriteriaByRubric } from '@/types/evaluation';
import { getScoreBgClass } from '@/lib/utils';

export default function ScoreTable() {
    const { state } = useApp();
    const results = state.evaluationResults;

    if (!results?.experts || !results.summary || !results.rubricType) return null;

    const { experts: expertsData, summary, rubricType } = results;
    const criteria = getCriteriaByRubric(rubricType);

    // Group criteria by chapter for better organization
    const groupedCriteria = criteria.reduce((acc, c) => {
        const chapter = c.chapter || 'มาตรฐาน';
        if (!acc[chapter]) acc[chapter] = [];
        acc[chapter].push(c);
        return acc;
    }, {} as Record<string, typeof criteria>);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left border border-gray-200">หัวข้อ</th>
                        <th className="p-3 text-center border border-gray-200"
                            style={{ background: experts.expert1.color }}>
                            {experts.expert1.avatar} E1
                        </th>
                        <th className="p-3 text-center border border-gray-200"
                            style={{ background: experts.expert2.color }}>
                            {experts.expert2.avatar} E2
                        </th>
                        <th className="p-3 text-center border border-gray-200"
                            style={{ background: experts.expert3.color }}>
                            {experts.expert3.avatar} E3
                        </th>
                        <th className="p-3 text-center border border-gray-200">เฉลี่ย</th>
                        <th className="p-3 text-center border border-gray-200">น้ำหนัก</th>
                        <th className="p-3 text-center border border-gray-200">คะแนนรวม</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedCriteria).map(([chapter, items]) => (
                        <>
                            <tr key={`chapter-${chapter}`} className="bg-gray-50">
                                <td colSpan={7} className="p-2 border border-gray-200 font-semibold text-gray-700">
                                    📚 {chapter}
                                </td>
                            </tr>
                            {items.map(c => {
                                const s1 = expertsData.expert1?.scores.find(s => s.criteriaId === c.id)?.score || 0;
                                const s2 = expertsData.expert2?.scores.find(s => s.criteriaId === c.id)?.score || 0;
                                const s3 = expertsData.expert3?.scores.find(s => s.criteriaId === c.id)?.score || 0;
                                const avg = (s1 + s2 + s3) / 3;
                                const weighted = avg * c.weight;

                                return (
                                    <tr key={c.id} className="hover:bg-gray-50">
                                        <td className="p-3 border border-gray-200 text-left">
                                            {c.id}. {c.name}
                                        </td>
                                        <td className={`p-3 border border-gray-200 text-center font-semibold ${getScoreBgClass(s1)}`}>
                                            {s1}
                                        </td>
                                        <td className={`p-3 border border-gray-200 text-center font-semibold ${getScoreBgClass(s2)}`}>
                                            {s2}
                                        </td>
                                        <td className={`p-3 border border-gray-200 text-center font-semibold ${getScoreBgClass(s3)}`}>
                                            {s3}
                                        </td>
                                        <td className="p-3 border border-gray-200 text-center font-bold">
                                            {avg.toFixed(2)}
                                        </td>
                                        <td className="p-3 border border-gray-200 text-center">
                                            ×{c.weight}
                                        </td>
                                        <td className="p-3 border border-gray-200 text-center font-bold">
                                            {weighted.toFixed(2)}/{c.maxScore}
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-100 font-bold">
                        <td colSpan={5} className="p-3 border border-gray-200"></td>
                        <td className="p-3 border border-gray-200 text-center">รวม</td>
                        <td className="p-3 border border-gray-200 text-center">
                            {summary.totalScore.toFixed(2)}/100
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
