'use client';

import { Card } from '@/components/ui';
import { APP_NAME } from '@/types/app';

export default function UserGuide() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1565C0] mb-4">
                    📖 คู่มือการใช้งาน
                </h2>
                <p className="text-gray-600">
                    ขั้นตอนการใช้งาน{APP_NAME}
                </p>
            </div>

            {/* Step 1 */}
            <Card title="ขั้นตอนที่ 1: ตั้งค่า AI Provider" icon="⚙️">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก AI Provider</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก Provider ที่ต้องการใช้งาน ได้แก่ Google Gemini (แนะนำ - ฟรี), DeepSeek, Kimi หรือ OpenRouter
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">กรอก API Key</h4>
                            <p className="text-gray-600 text-sm">
                                กรอก API Key ของ Provider ที่เลือก สามารถขอรับ API Key ได้จากลิงก์ที่ระบุในแต่ละ Provider
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก Model</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก AI Model ที่ต้องการใช้ โดยระบบแนะนำให้ใช้ Gemini 2.5 Flash หรือ DeepSeek Chat
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">4</span>
                        <div>
                            <h4 className="font-semibold mb-1">ทดสอบการเชื่อมต่อ</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม &quot;ทดสอบการเชื่อมต่อ&quot; เพื่อตรวจสอบว่า API Key และ Model ทำงานได้ถูกต้อง
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* AI Providers Guide - NEW */}
            <Card title="วิธีสมัครและรับ API Key" icon="🔑">
                <div className="space-y-6">
                    {/* Gemini */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🔷</span>
                            <h4 className="font-semibold text-blue-700">Google Gemini (แนะนำ - ฟรี!)</h4>
                        </div>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                            <li>ไปที่ <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Google AI Studio</a></li>
                            <li>ลงชื่อเข้าใช้ด้วย Google Account</li>
                            <li>คลิก &quot;Create API Key&quot; เพื่อสร้าง API Key ใหม่</li>
                            <li>Copy API Key มาใช้งานได้เลย</li>
                        </ol>
                        <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
                            ✅ <strong>ฟรี!</strong> มี Free Tier ใช้งานได้ไม่จำกัด (มี rate limit)
                        </div>
                    </div>

                    {/* DeepSeek */}
                    <div className="p-4 bg-gradient-to-r from-cyan-50 to-white rounded-lg border-l-4 border-cyan-500">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🔵</span>
                            <h4 className="font-semibold text-cyan-700">DeepSeek (ราคาถูกมาก)</h4>
                        </div>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                            <li>ไปที่ <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">DeepSeek Platform</a></li>
                            <li>สมัครสมาชิกด้วย Email หรือ Google Account</li>
                            <li>ไปที่ <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">API Keys</a> และสร้าง API Key ใหม่</li>
                            <li><strong className="text-orange-600">สำคัญ!</strong> ต้อง <a href="https://platform.deepseek.com/top_up" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">เติมเงิน (Top Up)</a> ก่อนใช้งาน</li>
                        </ol>
                        <div className="mt-3 p-2 bg-orange-50 rounded text-xs text-orange-700">
                            💰 <strong>ราคาถูกมาก!</strong> เริ่มต้น $0.14/1M tokens - แนะนำเติม $2-5 ใช้ได้นาน
                        </div>
                    </div>

                    {/* Kimi */}
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-white rounded-lg border-l-4 border-indigo-500">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🌙</span>
                            <h4 className="font-semibold text-indigo-700">Kimi / Moonshot (1T params)</h4>
                        </div>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                            <li>ไปที่ <a href="https://platform.moonshot.ai/console" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Moonshot Platform</a></li>
                            <li>สมัครสมาชิกด้วย Email (รองรับ Email ไทย)</li>
                            <li>ไปที่ API Keys และสร้าง API Key ใหม่</li>
                            <li><strong className="text-orange-600">สำคัญ!</strong> ต้อง <a href="https://platform.moonshot.ai/console/pay" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">เติมเงิน</a> ก่อนใช้งาน</li>
                        </ol>
                        <div className="mt-3 p-2 bg-indigo-50 rounded text-xs text-indigo-700">
                            🌙 <strong>Context ยาว!</strong> รองรับ 256K context - เติมเงินเริ่มต้น $1
                        </div>
                    </div>

                    {/* OpenRouter */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🔗</span>
                            <h4 className="font-semibold text-purple-700">OpenRouter (300+ Models)</h4>
                        </div>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                            <li>ไปที่ <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">OpenRouter.ai</a></li>
                            <li>ลงชื่อเข้าใช้ด้วย Google Account หรือ Email</li>
                            <li>ไปที่ <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">API Keys</a> และสร้าง API Key ใหม่</li>
                            <li>เลือกโมเดลที่มี 🆓 หมายถึงใช้ฟรี หรือเติมเงินสำหรับโมเดลพรีเมียม</li>
                        </ol>
                        <div className="mt-3 p-2 bg-purple-50 rounded text-xs text-purple-700">
                            🆓 <strong>มีโมเดลฟรี!</strong> Gemini, DeepSeek, Qwen, Llama และอื่นๆ - ใช้ฟรีได้เลย
                        </div>
                    </div>
                </div>
            </Card>

            {/* Step 2: Select Rubric */}
            <Card title="ขั้นตอนที่ 2: เลือกประเภทการประเมิน" icon="📋">
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm mb-4">
                        ระบบรองรับการประเมิน 2 ประเภท โดยใช้เกณฑ์การประเมินที่แตกต่างกัน:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-r from-[#E3F2FD] to-white rounded-lg border-l-4 border-[#1976D2]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">📝</span>
                                <h4 className="font-semibold text-[#1976D2]">โครงร่างวิทยานิพนธ์ (Proposal)</h4>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• ครอบคลุม <strong>บทที่ 1-3</strong></li>
                                <li>• เกณฑ์ประเมิน <strong>14 หัวข้อ</strong></li>
                                <li>• น้ำหนักสูงสุดที่ บทที่ 3 (40 คะแนน)</li>
                                <li>• ผลลัพธ์: อนุมัติ / อนุมัติมีเงื่อนไข / ไม่อนุมัติ</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-[#F3E5F5] to-white rounded-lg border-l-4 border-[#7B1FA2]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">📚</span>
                                <h4 className="font-semibold text-[#7B1FA2]">วิทยานิพนธ์ฉบับเต็ม (Full Thesis)</h4>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• ครอบคลุม <strong>5 บท</strong> ครบถ้วน</li>
                                <li>• เกณฑ์ประเมิน <strong>24 หัวข้อ</strong></li>
                                <li>• ประเมินมาตรฐานวิชาการและจริยธรรม</li>
                                <li>• ผลลัพธ์: ดีมาก / ดี / พอใช้ / ไม่ผ่าน</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Step 3: Upload */}
            <Card title="ขั้นตอนที่ 3: อัปโหลดเอกสาร" icon="📄">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">อัปโหลดไฟล์ PDF</h4>
                            <p className="text-gray-600 text-sm">
                                คลิกพื้นที่อัปโหลดหรือลากไฟล์ PDF ของเอกสารที่ต้องการประเมินมาวาง
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">ตรวจสอบการอ่านเอกสาร</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะแสดงข้อมูลสรุปของเอกสารที่อัปโหลด ให้ตรวจสอบความถูกต้อง
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <p className="text-sm text-orange-700">
                        <strong>💡 คำแนะนำ:</strong> ใช้ไฟล์ PDF ที่มีข้อความสามารถ copy ได้ (ไม่ใช่ภาพสแกน) จะให้ผลการประเมินที่แม่นยำกว่า
                    </p>
                </div>
            </Card>

            {/* Step 4: Start Evaluation */}
            <Card title="ขั้นตอนที่ 4: เริ่มการประเมิน" icon="🚀">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">กดปุ่ม &quot;เริ่มการประเมิน&quot;</h4>
                            <p className="text-gray-600 text-sm">
                                เมื่อตั้งค่า เลือกประเภท และอัปโหลดเอกสารเรียบร้อย ให้กดปุ่มเริ่มการประเมิน
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">รอผลการประเมิน</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะใช้ AI ผู้เชี่ยวชาญ 3 ท่านประเมินเอกสาร (ใช้เวลาประมาณ 1-2 นาที)
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Step 5: View Results */}
            <Card title="ขั้นตอนที่ 5: ดูผลการประเมินและบันทึกรายงาน" icon="📊">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">ดูผลการประเมิน</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะแสดงคะแนนรวม, ผลการประเมินจากผู้เชี่ยวชาญแต่ละท่าน, จุดแข็ง-จุดอ่อน และคำแนะนำ
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">บันทึกรายงาน</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม &quot;บันทึกรายงาน&quot; เพื่อดาวน์โหลดผลการประเมินเป็นไฟล์ HTML
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h4 className="font-semibold mb-1">เริ่มการประเมินใหม่</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม &quot;เริ่มการประเมินใหม่&quot; เพื่อประเมินเอกสารอื่น
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Evaluation Criteria - Proposal */}
            <Card title="เกณฑ์การประเมินโครงร่างวิทยานิพนธ์ (14 หัวข้อ)" icon="📝">
                <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-[#1976D2]">
                        <h4 className="font-semibold text-[#1976D2] mb-2">บทที่ 1: บทนำ (25 คะแนน)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• ที่มาและความสำคัญของปัญหา (10 คะแนน)</li>
                            <li>• คำถามการวิจัยและวัตถุประสงค์ (5 คะแนน)</li>
                            <li>• กรอบแนวคิดการวิจัย (5 คะแนน)</li>
                            <li>• ขอบเขตและนิยามศัพท์ (5 คะแนน)</li>
                        </ul>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-[#388E3C]">
                        <h4 className="font-semibold text-[#388E3C] mb-2">บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง (25 คะแนน)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• ความครอบคลุมและทันสมัย (10 คะแนน)</li>
                            <li>• การสังเคราะห์และการวิเคราะห์ (10 คะแนน)</li>
                            <li>• คุณภาพแหล่งข้อมูล (5 คะแนน)</li>
                        </ul>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-[#7B1FA2]">
                        <h4 className="font-semibold text-[#7B1FA2] mb-2">บทที่ 3: ระเบียบวิธีวิจัย (40 คะแนน)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• แบบแผนการวิจัย (10 คะแนน)</li>
                            <li>• ประชากรและกลุ่มตัวอย่าง (10 คะแนน)</li>
                            <li>• เครื่องมือวิจัยและการตรวจสอบคุณภาพ (10 คะแนน)</li>
                            <li>• การเก็บรวบรวมและการวิเคราะห์ข้อมูล (5 คะแนน)</li>
                            <li>• แผนการดำเนินงาน (5 คะแนน)</li>
                        </ul>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                        <h4 className="font-semibold text-gray-700 mb-2">มาตรฐานวิชาการและการนำเสนอ (10 คะแนน)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• การเขียนและการอ้างอิง (5 คะแนน)</li>
                            <li>• ความพร้อมและการนำเสนอ (5 คะแนน)</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">ผลการพิจารณา:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#4CAF50] rounded"></span>
                            <span>80-100 = อนุมัติ</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#FF9800] rounded"></span>
                            <span>60-79 = อนุมัติมีเงื่อนไข</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#F44336] rounded"></span>
                            <span>&lt;60 = ไม่อนุมัติ</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Evaluation Criteria - Full Thesis */}
            <Card title="เกณฑ์การประเมินวิทยานิพนธ์ฉบับเต็ม (24 หัวข้อ)" icon="📚">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <span className="font-semibold">บทที่ 1: บทนำและกรอบปัญหา</span>
                            <span className="text-gray-500 text-sm ml-2">(15 คะแนน)</span>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <span className="font-semibold">บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง</span>
                            <span className="text-gray-500 text-sm ml-2">(15 คะแนน)</span>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <span className="font-semibold">บทที่ 3: ระเบียบวิธีวิจัย</span>
                            <span className="text-gray-500 text-sm ml-2">(20 คะแนน)</span>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <span className="font-semibold">บทที่ 4: ผลการวิจัย</span>
                            <span className="text-gray-500 text-sm ml-2">(20 คะแนน)</span>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <span className="font-semibold">บทที่ 5: อภิปรายผลและข้อเสนอแนะ</span>
                            <span className="text-gray-500 text-sm ml-2">(20 คะแนน)</span>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <span className="font-semibold">มาตรฐานวิชาการและจริยธรรม</span>
                            <span className="text-gray-500 text-sm ml-2">(10 คะแนน)</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">ผลการพิจารณา:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#4CAF50] rounded"></span>
                            <span>80-100 = ดีมาก</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#8BC34A] rounded"></span>
                            <span>70-79 = ดี</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#FF9800] rounded"></span>
                            <span>60-69 = พอใช้</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#F44336] rounded"></span>
                            <span>&lt;60 = ไม่ผ่าน</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
