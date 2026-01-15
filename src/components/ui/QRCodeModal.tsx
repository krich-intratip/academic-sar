'use client';

import { useEffect, useCallback } from 'react';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    imageAlt?: string;
    downloadFileName?: string;
}

export default function QRCodeModal({
    isOpen,
    onClose,
    imageSrc,
    imageAlt = 'QR Code',
    downloadFileName = 'qrcode.jpg'
}: QRCodeModalProps) {

    // Handle ESC key to close modal
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    const handleDownload = async () => {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = downloadFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-[90%] mx-4 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
                    aria-label="ปิด"
                >
                    ✕
                </button>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                    ☕ QR Code สนับสนุนผู้พัฒนา
                </h3>

                {/* QR Image */}
                <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-xl border-2 border-gray-100 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-64 h-64 object-contain rounded-lg"
                        />
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center mb-5">
                    สแกน QR Code เพื่อสนับสนุนค่าเช่า Server<br />
                    ขอบคุณสำหรับการสนับสนุน 🙏
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleDownload}
                        className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2"
                    >
                        💾 บันทึกภาพ
                    </button>
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    );
}
