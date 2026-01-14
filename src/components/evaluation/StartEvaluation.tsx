'use client';

import { useApp } from '@/context/AppContext';
import { useEvaluation } from '@/hooks';
import { Button, StatusMessage } from '@/components/ui';
import ExpertPanel from './ExpertPanel';

export default function StartEvaluation() {
    const { isReadyToEvaluate } = useApp();
    const { runEvaluation, isEvaluating, error } = useEvaluation();

    return (
        <div>
            <p className="text-gray-600 mb-5">
                ระบบจะใช้ผู้เชี่ยวชาญทางวิชาการ AI 3 ท่านในการรีวิวงานวิจัยของคุณ:
            </p>

            <ExpertPanel />

            <Button
                onClick={runEvaluation}
                isLoading={isEvaluating}
                disabled={!isReadyToEvaluate()}
                size="lg"
            >
                ▶️ เริ่มการรีวิว
            </Button>

            <StatusMessage
                type="error"
                message={error || ''}
                show={!!error}
            />
        </div>
    );
}
