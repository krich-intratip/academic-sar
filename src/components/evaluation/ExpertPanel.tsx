'use client';

import { experts } from '@/types/evaluation';

export default function ExpertPanel() {
    const expertList = Object.values(experts);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {expertList.map(expert => (
                <div
                    key={expert.id}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: expert.color }}
                >
                    <p className="font-semibold">
                        {expert.avatar} {expert.name}
                    </p>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                </div>
            ))}
        </div>
    );
}
