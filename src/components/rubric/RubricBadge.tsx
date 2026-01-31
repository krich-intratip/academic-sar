'use client';

import { useApp } from '@/context/AppContext';
import { getRubricInfo } from '@/lib/rubrics';
import { RubricType } from '@/types/app';

interface RubricBadgeProps {
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
    rubricType?: RubricType; // Optional: use this if passed, otherwise use from state
}

export default function RubricBadge({ size = 'md', showIcon = true, rubricType: propRubricType }: RubricBadgeProps) {
    const { state } = useApp();
    const rubricType = propRubricType || state.config.rubricType;

    if (!rubricType) return null;

    const rubricInfo = getRubricInfo(rubricType);
    if (!rubricInfo) return null;

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <div
            className={`
                inline-flex items-center gap-1.5 font-medium rounded-full
                ${sizeClasses[size]}
            `}
            style={{
                backgroundColor: rubricInfo.color,
                color: rubricInfo.borderColor,
                border: `1px solid ${rubricInfo.borderColor}`
            }}
        >
            {showIcon && <span>{rubricInfo.icon}</span>}
            <span>{rubricInfo.shortName}</span>
        </div>
    );
}
