'use client';

import { useState } from 'react';
import { APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/app';
import { Card, QRCodeModal } from '@/components/ui';

const DEVELOPER_LINK = 'https://portfolio-two-sepia-33.vercel.app/';

export default function About() {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#F3E5F5] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#7B1FA2] mb-4">
                    ℹ️ เกี่ยวกับโปรแกรม
                </h2>
                <p className="text-gray-600">
                    ข้อมูลเกี่ยวกับ{APP_NAME}
                </p>
            </div>

            {/* Program Description */}
            <Card title="วัตถุประสงค์ของโปรแกรม" icon="🎯">
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        <strong>{APP_NAME}</strong> เป็นเครื่องมือที่พัฒนาขึ้นเพื่อช่วยในการประเมินคุณภาพ
                        โครงร่างวิทยานิพนธ์และวิทยานิพนธ์ฉบับเต็มระดับปริญญาโท โดยใช้ปัญญาประดิษฐ์ (AI)
                        เป็นผู้เชี่ยวชาญทางวิชาการในการให้คำแนะนำ
                    </p>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-semibold text-blue-800 mb-2">🎓 กลุ่มเป้าหมาย</h4>
                        <p className="text-blue-700">
                            ระบบนี้มุ่งเน้นการนำไปใช้ในการศึกษาระดับอุดมศึกษาเป็นหลัก
                            เพื่อช่วยอาจารย์และนักศึกษาในการประเมินและพัฒนาคุณภาพงานวิจัย
                        </p>
                    </div>
                </div>
            </Card>

            {/* Features */}
            <Card title="คุณสมบัติของระบบ" icon="✨">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-[#E3F2FD] to-white rounded-lg">
                        <div className="text-2xl mb-2">📋</div>
                        <h4 className="font-semibold mb-1">รองรับ 2 ประเภทการประเมิน</h4>
                        <p className="text-sm text-gray-600">
                            โครงร่างวิทยานิพนธ์ (บทที่ 1-3) และวิทยานิพนธ์ฉบับเต็ม (5 บท)
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#BBDEFB] to-white rounded-lg">
                        <div className="text-2xl mb-2">👨‍🔬</div>
                        <h4 className="font-semibold mb-1">ผู้เชี่ยวชาญ AI 3 ท่าน</h4>
                        <p className="text-sm text-gray-600">
                            ประเมินโดยผู้เชี่ยวชาญด้านระเบียบวิธีวิจัย, เนื้อหาและทฤษฎี, และการเขียนวิชาการ
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#C8E6C9] to-white rounded-lg">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold mb-1">เกณฑ์มาตรฐาน</h4>
                        <p className="text-sm text-gray-600">
                            ใช้เกณฑ์การประเมินมาตรฐานระดับบัณฑิตศึกษา (Descriptive Rubric)
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#D1C4E9] to-white rounded-lg">
                        <div className="text-2xl mb-2">💡</div>
                        <h4 className="font-semibold mb-1">คำแนะนำและ Roadmap</h4>
                        <p className="text-sm text-gray-600">
                            ให้คำแนะนำที่เป็นรูปธรรมและแผนการพัฒนางานวิจัย
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#FFE0B2] to-white rounded-lg">
                        <div className="text-2xl mb-2">🤖</div>
                        <h4 className="font-semibold mb-1">รองรับหลาย AI Provider</h4>
                        <p className="text-sm text-gray-600">
                            Google Gemini (ฟรี), OpenAI, และ OpenRouter
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#F3E5F5] to-white rounded-lg">
                        <div className="text-2xl mb-2">📄</div>
                        <h4 className="font-semibold mb-1">บันทึกรายงาน</h4>
                        <p className="text-sm text-gray-600">
                            ส่งออกผลการประเมินเป็นไฟล์ HTML พร้อมใช้งาน
                        </p>
                    </div>
                </div>
            </Card>

            {/* Rubric Types */}
            <Card title="ประเภทการประเมินที่รองรับ" icon="📝">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#E3F2FD] to-white rounded-lg border-2 border-[#1976D2]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-3xl">📝</span>
                            <div>
                                <h4 className="font-bold text-[#1976D2]">โครงร่างวิทยานิพนธ์</h4>
                                <span className="text-xs bg-[#1976D2] text-white px-2 py-0.5 rounded-full">Proposal</span>
                            </div>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✓ บทที่ 1: บทนำ (25 คะแนน)</li>
                            <li>✓ บทที่ 2: เอกสารและงานวิจัย (25 คะแนน)</li>
                            <li>✓ บทที่ 3: ระเบียบวิธีวิจัย (40 คะแนน)</li>
                            <li>✓ มาตรฐานวิชาการ (10 คะแนน)</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#F3E5F5] to-white rounded-lg border-2 border-[#7B1FA2]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-3xl">📚</span>
                            <div>
                                <h4 className="font-bold text-[#7B1FA2]">วิทยานิพนธ์ฉบับเต็ม</h4>
                                <span className="text-xs bg-[#7B1FA2] text-white px-2 py-0.5 rounded-full">Full Thesis</span>
                            </div>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✓ บทที่ 1-3: เช่นเดียวกับ Proposal</li>
                            <li>✓ บทที่ 4: ผลการวิจัย (20 คะแนน)</li>
                            <li>✓ บทที่ 5: อภิปรายและสรุป (20 คะแนน)</li>
                            <li>✓ มาตรฐานและจริยธรรม (10 คะแนน)</li>
                        </ul>
                    </div>
                </div>
            </Card>

            {/* Technology */}
            <Card title="เทคโนโลยี" icon="🔧">
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                        Next.js 16
                    </span>
                    <span className="px-4 py-2 bg-[#61DAFB] text-black rounded-full text-sm font-medium">
                        React 19
                    </span>
                    <span className="px-4 py-2 bg-[#3178C6] text-white rounded-full text-sm font-medium">
                        TypeScript
                    </span>
                    <span className="px-4 py-2 bg-[#06B6D4] text-white rounded-full text-sm font-medium">
                        Tailwind CSS
                    </span>
                </div>
            </Card>

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

            {/* Disclaimer */}
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm text-orange-700">
                    <strong>⚠️ หมายเหตุ:</strong> ระบบนี้เป็นเครื่องมือช่วยประเมินเบื้องต้นโดย AI
                    ผลการประเมินควรใช้ประกอบการพิจารณาร่วมกับการรีวิวจากผู้เชี่ยวชาญมนุษย์
                </p>
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
