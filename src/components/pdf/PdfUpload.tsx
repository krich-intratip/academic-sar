'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useApp } from '@/context/AppContext';
import { usePdfExtraction } from '@/hooks';
import { formatFileSize } from '@/lib/utils';
import { StatusMessage } from '@/components/ui';

export default function PdfUpload() {
    const { state } = useApp();
    const { extractText } = usePdfExtraction();
    const [isDragging, setIsDragging] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFile(file);
        } else {
            setError('กรุณาอัปโหลดไฟล์ PDF เท่านั้น');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

    const handleFile = async (file: File) => {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            setError(`ไฟล์มีขนาดใหญ่เกินไป (${formatFileSize(file.size)}) กรุณาเลือกไฟล์ขนาดไม่เกิน 25 MB`);
            return;
        }

        setIsExtracting(true);
        setError(null);

        try {
            await extractText(file);
            setIsExtracting(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ไม่สามารถอ่านไฟล์ PDF ได้');
            setIsExtracting(false);
        }
    };

    return (
        <div>
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          border-3 border-dashed p-10 text-center rounded-xl cursor-pointer
          transition-all duration-300
          ${isDragging
                        ? 'border-[#1976D2] bg-[#E3F2FD] scale-[1.02]'
                        : 'border-gray-300 hover:border-[#1976D2] hover:bg-[#E3F2FD]'
                    }
        `}
            >
                <div className="text-5xl mb-3">📁</div>
                <p className="font-semibold text-lg">คลิกหรือลากไฟล์ PDF งานวิจัยมาวางที่นี่</p>
                <p className="text-gray-500 text-sm mt-2">รองรับไฟล์ PDF ขนาดไม่เกิน 25 MB</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {isExtracting && (
                <div className="mt-4 p-4 bg-[#E3F2FD] text-[#1565C0] rounded-lg flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                    <span>กำลังอ่านเนื้อหา PDF...</span>
                </div>
            )}

            {state.pdfFileName && !isExtracting && (
                <div className="mt-4 p-4 bg-[#E8F5E9] rounded-lg animate-fadeIn">
                    <p><strong>📎 ไฟล์ที่เลือก:</strong> {state.pdfFileName}</p>
                    <p><strong>📊 ขนาด:</strong> {formatFileSize(state.pdfFileSize || 0)}</p>
                </div>
            )}

            <StatusMessage
                type="error"
                message={error || ''}
                show={!!error}
            />
        </div>
    );
}
