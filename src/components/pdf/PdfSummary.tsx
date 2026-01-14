'use client';

import { useState } from 'react';
import { useEvaluation } from '@/hooks';
import { Button } from '@/components/ui';

export default function PdfSummary() {
    const { summarizePdf } = useEvaluation();
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = async () => {
        setIsLoading(true);
        setError(null);

        const result = await summarizePdf();

        if (result) {
            setSummary(result);
        } else {
            setError('ไม่สามารถสรุปเนื้อหาได้ กรุณาลองใหม่');
        }

        setIsLoading(false);
    };

    if (summary) {
        return (
            <div className="mt-6">
                <h4 className="font-semibold text-lg mb-4">📝 สรุปประเด็นสำคัญจากเอกสาร</h4>
                <div
                    className="bg-white p-6 rounded-lg border shadow-sm"
                    dangerouslySetInnerHTML={{ __html: summary }}
                />
            </div>
        );
    }

    return (
        <div className="mt-6 text-center">
            <Button
                onClick={handleSummarize}
                isLoading={isLoading}
                variant="secondary"
            >
                ✨ สรุปประเด็นสำคัญจากเอกสาร (AI)
            </Button>
            <p className="text-sm text-gray-500 mt-2">
                คลิกเพื่อให้ AI วิเคราะห์และสรุปเนื้อหาเป็นประเด็นสำคัญ
            </p>
            {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}
