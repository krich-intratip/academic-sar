'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: ReactNode;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white shadow-lg shadow-blue-300/40 hover:shadow-xl hover:-translate-y-0.5 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed',
        secondary: 'bg-[#FFF3E0] text-gray-800 hover:bg-[#FFE0B2] hover:-translate-y-0.5',
        success: 'bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] hover:-translate-y-0.5',
        danger: 'bg-[#FFEBEE] text-[#C62828] hover:bg-[#FFCDD2] hover:-translate-y-0.5'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    กำลังดำเนินการ...
                </>
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
}
