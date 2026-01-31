'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { experts, getCriteriaByRubric, ExpertEvaluation } from '@/types/evaluation';
import { getScoreBgClass, getPriorityColor, getPriorityLabel } from '@/lib/utils';

export default function ExpertDetailTabs() {
    const { state } = useApp();
    const [activeTab, setActiveTab] = useState(1);
    const results = state.evaluationResults;

    if (!results?.experts || !results.rubricType) return null;

    const evaluationCriteria = getCriteriaByRubric(results.rubricType);

    const tabs = [
        { id: 1, expertId: 'expert1', data: results.experts.expert1 },
        { id: 2, expertId: 'expert2', data: results.experts.expert2 },
        { id: 3, expertId: 'expert3', data: results.experts.expert3 }
    ];

    const renderExpertDetail = (expertId: string, data?: ExpertEvaluation) => {
        if (!data) return null;
        const expert = experts[expertId];

        return (
            <div className="animate-fadeIn">
                <h3 className="text-xl font-semibold mb-4" style={{ color: expert.borderColor }}>
                    {expert.avatar} มุมมองจาก {expert.name}
                </h3>

                <div className="bg-white p-5 rounded-xl mb-5">
                    <h4 className="font-semibold mb-2">📝 ความเห็นโดยรวม</h4>
                    <p className="text-gray-700">{data.overallComment}</p>
                </div>

                <div className="mb-5">
                    <h4 className="font-semibold mb-3">📊 คะแนนรายหัวข้อ</h4>
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-left">หัวข้อ</th>
                                <th className="p-2 border text-center w-20">คะแนน</th>
                                <th className="p-2 border text-left">เหตุผล</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.scores.map(scoreItem => {
                                const criteria = evaluationCriteria.find(c => c.id === scoreItem.criteriaId);
                                return (
                                    <tr key={scoreItem.criteriaId}>
                                        <td className="p-2 border">{scoreItem.criteriaId}. {criteria?.name}</td>
                                        <td className={`p-2 border text-center font-bold ${getScoreBgClass(scoreItem.score)}`}>
                                            {scoreItem.score}/4
                                        </td>
                                        <td className="p-2 border text-gray-600">{scoreItem.reason}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="bg-green-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-green-800 mb-3">✅ จุดแข็งที่พบ</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-orange-800 mb-3">⚠️ จุดที่ต้องปรับปรุง</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl">
                    <h4 className="font-semibold mb-4">💡 คำแนะนำเฉพาะทาง</h4>
                    {data.recommendations.map((rec, i) => (
                        <div key={i} className="mb-4 p-3 border-l-4 bg-gray-50 rounded-r-lg"
                            style={{ borderColor: rec.priority === 'critical' ? '#E53935' : rec.priority === 'high' ? '#FB8C00' : '#43A047' }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <strong>{i + 1}. {rec.title}</strong>
                                <span className={`px-2 py-1 text-white text-xs rounded-full ${getPriorityColor(rec.priority)}`}>
                                    {getPriorityLabel(rec.priority)}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-1">{rec.detail}</p>
                            <p className="text-sm text-green-700">
                                <strong>ผลลัพธ์ที่คาดหวัง:</strong> {rec.expectedResult}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <div className="flex gap-1 p-2 bg-gray-100 flex-wrap">
                {tabs.map(tab => {
                    const expert = experts[tab.expertId];
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-[150px] px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${activeTab === tab.id
                                    ? 'opacity-100 shadow-lg -translate-y-0.5'
                                    : 'opacity-70 hover:opacity-90'
                                }`}
                            style={{ backgroundColor: expert.color }}
                        >
                            {expert.avatar} {expert.name.split(' ')[0]}
                        </button>
                    );
                })}
            </div>
            <div className="p-6" style={{ backgroundColor: `${experts[tabs.find(t => t.id === activeTab)?.expertId || 'expert1'].color}20` }}>
                {tabs.map(tab => (
                    <div key={tab.id} className={activeTab === tab.id ? '' : 'hidden'}>
                        {renderExpertDetail(tab.expertId, tab.data)}
                    </div>
                ))}
            </div>
        </div>
    );
}
