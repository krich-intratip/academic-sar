'use client';

import { useApp } from '@/context/AppContext';

export default function Roadmap() {
    const { state } = useApp();
    const results = state.evaluationResults;

    if (!results?.experts) return null;

    const phase1: string[] = [];
    const phase2: string[] = [];
    const phase3: string[] = [];

    Object.values(results.experts).forEach(data => {
        if (!data) return;
        data.recommendations.forEach(rec => {
            if (rec.priority === 'critical') phase1.push(rec.title);
            else if (rec.priority === 'high') phase2.push(rec.title);
            else phase3.push(rec.title);
        });
    });

    const phases = [
        {
            title: 'ระยะที่ 1: สัปดาห์ที่ 1-2',
            subtitle: 'งานที่ต้องทำ (เร่งด่วน)',
            items: phase1,
            color: '#E53935',
            bg: 'bg-red-50'
        },
        {
            title: 'ระยะที่ 2: สัปดาห์ที่ 3-4',
            subtitle: 'งานที่ต้องทำ (สำคัญ)',
            items: phase2,
            color: '#FB8C00',
            bg: 'bg-orange-50'
        },
        {
            title: 'ระยะที่ 3: เดือนที่ 2 เป็นต้นไป',
            subtitle: 'งานที่ต้องทำ (พัฒนาต่อเนื่อง)',
            items: phase3,
            color: '#43A047',
            bg: 'bg-green-50'
        }
    ];

    return (
        <div className="pl-8">
            {phases.map((phase, idx) => (
                <div
                    key={idx}
                    className={`pl-5 mb-6 ${idx < phases.length - 1 ? 'pb-6' : ''}`}
                    style={{ borderLeft: `4px solid ${phase.color}` }}
                >
                    <span
                        className="text-white px-4 py-1.5 rounded-full font-semibold text-sm"
                        style={{ backgroundColor: phase.color }}
                    >
                        {phase.title}
                    </span>
                    <div className={`${phase.bg} p-4 rounded-xl mt-3`}>
                        <h4 className="font-semibold mb-3">{phase.subtitle}</h4>
                        <ul className="space-y-2">
                            {phase.items.map((task, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4" />
                                    <span>{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
