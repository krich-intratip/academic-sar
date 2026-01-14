'use client';

interface StatusMessageProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    show: boolean;
}

export default function StatusMessage({ type, message, show }: StatusMessageProps) {
    if (!show) return null;

    const styles = {
        success: 'bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-[#2E7D32]',
        error: 'bg-[#FCE4EC] text-[#C62828] border-l-4 border-[#C62828]',
        info: 'bg-[#E3F2FD] text-[#1565C0] border-l-4 border-[#1565C0]',
        warning: 'bg-[#FFF3E0] text-[#E65100] border-l-4 border-[#E65100]'
    };

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    return (
        <div className={`p-4 rounded-lg mt-4 animate-fadeIn ${styles[type]}`}>
            <span className="mr-2">{icons[type]}</span>
            <span dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    );
}
