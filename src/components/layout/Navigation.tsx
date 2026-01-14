'use client';

import { useState } from 'react';
import { APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/app';

export type TabId = 'home' | 'guide' | 'about';

interface NavigationProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}

const tabs = [
    { id: 'home' as TabId, label: 'หน้าหลัก', icon: '🏠' },
    { id: 'guide' as TabId, label: 'คู่มือการใช้งาน', icon: '📖' },
    { id: 'about' as TabId, label: 'เกี่ยวกับโปรแกรม', icon: 'ℹ️' },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
        <div className="w-full">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#E3F2FD] to-[#F3E5F5] p-8 md:p-10 rounded-t-2xl text-center shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1565C0] mb-2">
                    📚 {APP_NAME}
                </h1>
                <p className="text-lg text-gray-600">
                    โดยผู้เชี่ยวชาญทางวิชาการ 3 ท่าน
                </p>
                <p className="text-sm text-gray-500 mt-3">
                    {APP_VERSION} | อัปเดตล่าสุด: {APP_LAST_UPDATE}
                </p>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white shadow-md rounded-b-2xl mb-8">
                <div className="flex justify-center flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                px-6 py-4 text-sm md:text-base font-medium transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'text-[#1565C0] border-b-3 border-[#1565C0] bg-[#E3F2FD]/50'
                                    : 'text-gray-600 hover:text-[#1565C0] hover:bg-gray-50'
                                }
                            `}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}
