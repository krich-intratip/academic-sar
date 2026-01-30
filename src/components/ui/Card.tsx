'use client';

import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: ReactNode;
    icon?: string;
}

export default function Card({ children, className = '', title, icon }: CardProps) {
    return (
        <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-md mb-6 ${className}`}>
            {title && (
                <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2">
                    {icon && <span>{icon}</span>}
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}
