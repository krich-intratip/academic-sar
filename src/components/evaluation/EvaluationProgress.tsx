'use client';

import { Card, ProgressSteps } from '@/components/ui';
import { useApp } from '@/context/AppContext';

const steps = [
    { label: 'วิเคราะห์เอกสาร' },
    { label: 'Expert 1' },
    { label: 'Expert 2' },
    { label: 'Expert 3' },
    { label: 'สรุปผล' }
];

const stepMessages: Record<number, string> = {
    1: 'กำลังวิเคราะห์โครงสร้างเอกสาร Academic SAR...',
    2: 'กำลังประเมินโดย ศ.ดร.สุรชัย วิธีการวิจัย...',
    3: 'กำลังประเมินโดย รศ.ดร.ปิยะนุช เนื้อหาลึกซึ้ง...',
    4: 'กำลังประเมินโดย ผศ.ดร.วิชิต การเขียนวิชาการ...',
    5: 'กำลังสรุปผลการประเมิน...'
};

export default function EvaluationProgress() {
    const { state } = useApp();

    if (!state.isEvaluating && state.currentStep === 0) {
        return null;
    }

    return (
        <Card title="📊 ความคืบหน้าการประเมิน" icon="">
            <ProgressSteps currentStep={state.currentStep} steps={steps} />
            <p className="text-center text-gray-600">
                {stepMessages[state.currentStep] || ''}
            </p>
        </Card>
    );
}
