'use client';

import { useState } from 'react';
import { APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/app';
import { Card, QRCodeModal } from '@/components/ui';

const DEVELOPER_LINK = 'https://portfolio-two-sepia-33.vercel.app/';

type TabId = 'functional' | 'nonfunctional' | 'timeline';

const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'functional', label: 'Functional', icon: '⚙️' },
    { id: 'nonfunctional', label: 'Non-functional', icon: '🔧' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
];

// Version history data
const versionHistory = [
    {
        version: 'v3.0.1',
        date: '30 มกราคม 2568',
        type: 'major',
        changes: [
            'รองรับการประเมิน 2 ประเภท: โครงร่างวิทยานิพนธ์ และวิทยานิพนธ์ฉบับเต็ม',
            'เปลี่ยนชื่อระบบเป็น "ระบบประเมินโครงร่างและวิทยานิพนธ์"',
            'เพิ่ม Card Selection UI สำหรับเลือกประเภทการประเมิน',
            'เพิ่ม Badge/Indicator แสดงประเภทที่เลือก',
            'ปรับปรุงหน้าคู่มือและ About ใหม่ทั้งหมด',
        ],
    },
    {
        version: 'v2.1.0',
        date: '15 มกราคม 2568',
        type: 'minor',
        changes: [
            'เพิ่ม QR Code Modal สำหรับการบริจาค',
            'ปรับปรุง UI/UX ให้ใช้งานง่ายขึ้น',
        ],
    },
    {
        version: 'v2.0.1',
        date: '14 มกราคม 2568',
        type: 'patch',
        changes: [
            'ปรับระบบคะแนนเป็น 100 คะแนนเต็ม',
            'แก้ไขการคำนวณคะแนนถ่วงน้ำหนัก',
        ],
    },
    {
        version: 'v2.0.0',
        date: '13 มกราคม 2568',
        type: 'major',
        changes: [
            'เปิดตัวระบบ SAR for Academic Research',
            'รองรับ AI Provider: Google Gemini, OpenAI, OpenRouter',
            'ประเมินโดย AI ผู้เชี่ยวชาญ 3 ท่าน',
            'Export รายงานเป็น HTML',
        ],
    },
];

export default function About() {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabId>('functional');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'functional':
                return <FunctionalTab />;
            case 'nonfunctional':
                return <NonFunctionalTab />;
            case 'timeline':
                return <TimelineTab />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F3E5F5] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#7B1FA2] mb-4">
                    ℹ️ เกี่ยวกับโปรแกรม
                </h2>
                <p className="text-gray-600">
                    ข้อมูลเกี่ยวกับ{APP_NAME}
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex border-b">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex-1 px-4 py-4 text-sm md:text-base font-medium transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'text-[#7B1FA2] border-b-3 border-[#7B1FA2] bg-[#F3E5F5]/30'
                                    : 'text-gray-600 hover:text-[#7B1FA2] hover:bg-gray-50'
                                }
                            `}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>

            {/* Developer Info */}
            <Card title="ผู้พัฒนา" icon="👨‍💻">
                <div className="text-center py-4">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#1565C0] to-[#7B1FA2] rounded-full flex items-center justify-center">
                        <span className="text-4xl">👨‍🔬</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        <a
                            href={DEVELOPER_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1565C0] hover:text-[#7B1FA2] hover:underline transition-colors"
                        >
                            พล.ท.ดร.กริช อินทราทิพย์
                        </a>
                    </h3>
                </div>
            </Card>

            {/* Donation Support */}
            <Card title="สนับสนุนผู้พัฒนา" icon="☕">
                <div className="text-center py-4">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        สนับสนุนช่วยค่าเช่า Server ของ Web app นี้<br />
                        เพื่อให้สามารถบริการได้ต่อไป
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsQRModalOpen(true)}
                            className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white bg-white p-2 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 group"
                            title="คลิกเพื่อดูรูปขนาดใหญ่"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/donation-qr.jpg"
                                alt="QR Code สำหรับบริจาค"
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">🔍 ดูใหญ่</span>
                            </div>
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        คลิกที่ QR Code เพื่อดูขนาดใหญ่และบันทึกภาพ
                    </p>
                </div>
            </Card>

            {/* Version & License */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="flex flex-wrap justify-center gap-8 mb-4">
                    <div>
                        <p className="text-sm text-gray-500">เวอร์ชัน</p>
                        <p className="text-xl font-bold text-[#1565C0]">{APP_VERSION}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">อัปเดตล่าสุด</p>
                        <p className="text-xl font-bold text-[#388E3C]">{APP_LAST_UPDATE}</p>
                    </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600">
                        License @2025 -
                        <a
                            href={DEVELOPER_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1565C0] hover:underline ml-1"
                        >
                            พล.ท.ดร.กริช อินทราทิพย์
                        </a>
                    </p>
                </div>
            </div>

            {/* QR Code Modal */}
            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                imageSrc="/donation-qr.jpg"
                imageAlt="QR Code สำหรับบริจาค"
                downloadFileName="donation-qr-academic-sar.jpg"
            />
        </div>
    );
}

// Functional Tab Component
function FunctionalTab() {
    return (
        <div className="space-y-6">
            {/* Main Features */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">✨</span> คุณสมบัติหลัก
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard
                        icon="📋"
                        title="รองรับ 2 ประเภทการประเมิน"
                        description="โครงร่างวิทยานิพนธ์ (บทที่ 1-3) และวิทยานิพนธ์ฉบับเต็ม (5 บท)"
                        color="#E3F2FD"
                        borderColor="#1976D2"
                    />
                    <FeatureCard
                        icon="👨‍🔬"
                        title="ผู้เชี่ยวชาญ AI 3 ท่าน"
                        description="ด้านระเบียบวิธีวิจัย, เนื้อหาและทฤษฎี, การเขียนวิชาการ"
                        color="#E8F5E9"
                        borderColor="#388E3C"
                    />
                    <FeatureCard
                        icon="📊"
                        title="เกณฑ์มาตรฐานบัณฑิตศึกษา"
                        description="ใช้ Descriptive Rubric คะแนนเต็ม 100 คะแนน"
                        color="#FFF3E0"
                        borderColor="#F57C00"
                    />
                    <FeatureCard
                        icon="💾"
                        title="Export รายงาน HTML"
                        description="บันทึกผลการประเมินและคำแนะนำเป็นไฟล์ HTML"
                        color="#F3E5F5"
                        borderColor="#7B1FA2"
                    />
                </div>
            </div>

            {/* Use Cases */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">📖</span> กรณีการใช้งาน (Use Cases)
                </h3>
                <div className="space-y-3">
                    <UseCaseItem
                        step="1"
                        title="นักศึกษาตรวจสอบโครงร่างก่อนสอบ"
                        description="อัปโหลดโครงร่างวิทยานิพนธ์เพื่อรับข้อเสนอแนะจาก AI ก่อนยื่นสอบโครงร่าง"
                    />
                    <UseCaseItem
                        step="2"
                        title="อาจารย์ที่ปรึกษาใช้ประเมินเบื้องต้น"
                        description="ใช้เป็นเครื่องมือช่วยประเมินเบื้องต้นก่อนให้ feedback กับนักศึกษา"
                    />
                    <UseCaseItem
                        step="3"
                        title="ตรวจสอบวิทยานิพนธ์ฉบับร่าง"
                        description="ประเมินวิทยานิพนธ์ฉบับเต็มเพื่อหาจุดที่ต้องปรับปรุงก่อนส่งสอบ"
                    />
                    <UseCaseItem
                        step="4"
                        title="เรียนรู้เกณฑ์การประเมิน"
                        description="ใช้ดูเกณฑ์และคำอธิบายเพื่อทำความเข้าใจมาตรฐานการประเมินวิทยานิพนธ์"
                    />
                </div>
            </div>
        </div>
    );
}

// Non-Functional Tab Component
function NonFunctionalTab() {
    return (
        <div className="space-y-6">
            {/* Technology Stack */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🛠️</span> เทคโนโลยีที่ใช้
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <TechBadge name="Next.js 16" color="#000000" textColor="white" />
                    <TechBadge name="React 19" color="#61DAFB" textColor="black" />
                    <TechBadge name="TypeScript" color="#3178C6" textColor="white" />
                    <TechBadge name="Tailwind CSS" color="#06B6D4" textColor="white" />
                </div>

                <h4 className="text-md font-semibold text-gray-700 mt-6 mb-3">AI Providers ที่รองรับ</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                        <div className="font-semibold text-blue-700">🤖 Google Gemini</div>
                        <div className="text-sm text-gray-600">แนะนำ - ฟรี</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                        <div className="font-semibold text-green-700">🧠 OpenAI</div>
                        <div className="text-sm text-gray-600">GPT-4, GPT-4o</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200">
                        <div className="font-semibold text-purple-700">🔗 OpenRouter</div>
                        <div className="text-sm text-gray-600">หลากหลาย Models</div>
                    </div>
                </div>

                <h4 className="text-md font-semibold text-gray-700 mt-6 mb-3">Deployment</h4>
                <div className="flex flex-wrap gap-3">
                    <TechBadge name="Vercel" color="#000000" textColor="white" />
                    <TechBadge name="Cloudflare Pages" color="#F38020" textColor="white" />
                    <TechBadge name="GitHub" color="#181717" textColor="white" />
                </div>
            </div>

            {/* Limitations & Disclaimer */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">⚠️</span> ข้อจำกัดและคำเตือน
                </h3>
                <div className="space-y-3">
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                        <h4 className="font-semibold text-orange-800 mb-1">เครื่องมือช่วยประเมินเบื้องต้น</h4>
                        <p className="text-sm text-orange-700">
                            ระบบนี้เป็นเครื่องมือช่วยประเมินเบื้องต้นโดย AI ผลการประเมินควรใช้ประกอบการพิจารณาร่วมกับการรีวิวจากผู้เชี่ยวชาญมนุษย์
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-semibold text-blue-800 mb-1">ต้องใช้ API Key</h4>
                        <p className="text-sm text-blue-700">
                            ผู้ใช้ต้องมี API Key ของ AI Provider เอง ระบบไม่ได้เก็บ API Key ไว้ในเซิร์ฟเวอร์
                        </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                        <h4 className="font-semibold text-purple-800 mb-1">รองรับไฟล์ PDF เท่านั้น</h4>
                        <p className="text-sm text-purple-700">
                            ระบบรองรับเฉพาะไฟล์ PDF ที่มีข้อความสามารถ copy ได้ (ไม่ใช่ภาพสแกน) ขนาดไม่เกิน 25MB
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <h4 className="font-semibold text-green-800 mb-1">ความเป็นส่วนตัว</h4>
                        <p className="text-sm text-green-700">
                            เอกสารที่อัปโหลดจะถูกส่งไปยัง AI Provider ที่เลือกเท่านั้น ระบบไม่เก็บเอกสารไว้ในเซิร์ฟเวอร์
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Timeline Tab Component
function TimelineTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📜</span> ประวัติการพัฒนา (Changelog)
            </h3>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7B1FA2] to-[#1565C0]"></div>

                <div className="space-y-6">
                    {versionHistory.map((version, index) => (
                        <div key={version.version} className="relative pl-12">
                            {/* Timeline dot */}
                            <div
                                className={`absolute left-2 w-5 h-5 rounded-full border-4 border-white shadow-md ${version.type === 'major'
                                        ? 'bg-[#7B1FA2]'
                                        : version.type === 'minor'
                                            ? 'bg-[#1565C0]'
                                            : 'bg-[#388E3C]'
                                    }`}
                            ></div>

                            <div className={`p-4 rounded-lg ${index === 0 ? 'bg-gradient-to-r from-[#F3E5F5] to-white border-2 border-[#7B1FA2]' : 'bg-gray-50'}`}>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className={`text-lg font-bold ${index === 0 ? 'text-[#7B1FA2]' : 'text-gray-700'}`}>
                                        {version.version}
                                    </span>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${version.type === 'major'
                                            ? 'bg-purple-100 text-purple-700'
                                            : version.type === 'minor'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-green-100 text-green-700'
                                        }`}>
                                        {version.type}
                                    </span>
                                    {index === 0 && (
                                        <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                                            Latest
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{version.date}</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    {version.changes.map((change, changeIndex) => (
                                        <li key={changeIndex} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-0.5">•</span>
                                            {change}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper Components
function FeatureCard({ icon, title, description, color, borderColor }: {
    icon: string;
    title: string;
    description: string;
    color: string;
    borderColor: string;
}) {
    return (
        <div
            className="p-4 rounded-lg border-l-4"
            style={{ backgroundColor: color, borderColor: borderColor }}
        >
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{icon}</span>
                <h4 className="font-semibold" style={{ color: borderColor }}>{title}</h4>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function UseCaseItem({ step, title, description }: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {step}
            </span>
            <div>
                <h4 className="font-semibold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}

function TechBadge({ name, color, textColor }: {
    name: string;
    color: string;
    textColor: string;
}) {
    return (
        <span
            className="px-4 py-2 rounded-full text-sm font-medium text-center"
            style={{ backgroundColor: color, color: textColor }}
        >
            {name}
        </span>
    );
}
